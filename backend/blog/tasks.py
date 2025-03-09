from celery import shared_task, group
from blog.models import Blog, Tag
from author.models import Author
from django.conf import settings
import requests
from bs4 import BeautifulSoup
from celery.exceptions import MaxRetriesExceededError
import logging
from django.db import transaction
from requests.exceptions import RequestException
from blog.services import parse_date
from api.services import get_random_proxy
from fake_useragent import UserAgent 
import time
import redis

logger = logging.getLogger(__name__)

# Redis bağlantısı oluştur
redis_client = redis.from_url("redis://redis:6379/0", decode_responses=True)

class ScrapingError(Exception):
    """Scraping işlemi sırasında oluşan hatalar için özel sınıf."""
    pass

class ElementNotFoundError(ScrapingError):
    """HTML elementi bulunamadığında fırlatılacak hata."""
    pass

@shared_task(bind=True, max_retries=settings.MAX_RETRIES, queue="blog_processing_queue")
def scrape_single_blog(self, link: str, author_id: int):
    logger.info(f"Scraping single blog: {link}")
    
    author = Author.objects.get(id=author_id)

    try:
        # Blog URL'si üzerinden kontrol et
        blog, created = Blog.objects.get_or_create(url=link, defaults={'author': author})
        if not created:
            logger.info(f"Blog already exists: {link}")
            return  # Blog zaten varsa işlemi sonlandır

        ua = UserAgent()
        headers = {"User-Agent": ua.random}
        proxy = get_random_proxy()
        proxies = {"http": proxy, "https": proxy} 
        time.sleep(0.1)
        response = requests.get(link, headers=headers, timeout=10, proxies=proxies)
        response.raise_for_status()
        soup = BeautifulSoup(response.content, 'html.parser')

        title_element = soup.find('h1', class_='pw-post-title')
        if not title_element:
            raise ElementNotFoundError("Title element not found")
        title = title_element.text[:200]

        description_element = soup.select_one('.pw-subtitle-paragraph, .pw-post-body-paragraph')
        if not description_element:
            raise ElementNotFoundError("Description element not found")
        description = description_element.text[:200]

        read_time = None
        read_time_element = soup.find(attrs={"data-testid": "storyReadTime"})
        if read_time_element:
            try:
                read_time = int(read_time_element.text.split()[0])
            except (ValueError, IndexError):
                logger.warning(f"Could not convert read time to integer: {read_time_element.text}")

        date_element = soup.find(attrs={"data-testid": "storyPublishDate"})
        date = parse_date(date_element.text.strip()) if date_element else None

        banner_url = None
        banner_element = soup.find(class_='paragraph-image')
        if banner_element:
            source_tag = banner_element.find('source')
            if source_tag:
                srcset = source_tag.get('srcset', '')
                banner_url = srcset.split(',')[0].strip().split(' ')[0]

        allowed_tags = {'h1', 'h2', 'h3', 'p', 'span', 'li', 'a', 'code', 'strong', 'em', 'italic'}
        content_elements = soup.find_all(lambda tag: (
            (tag.name in allowed_tags and tag.has_attr('id') and len(tag['id']) == 4) or
            (tag.has_attr('class') and 'paragraph-image' in tag['class'])
        ))
        content = "\n".join([str(element) for element in content_elements])

        tag_elements = soup.find_all('a', href=lambda href: href and '/tag/' in href)
        tags = []
        for tag in tag_elements:
            tag_url = tag['href']
            tag_name = tag.text.strip()

            tag_obj, created = Tag.objects.get_or_create(name=tag_name, defaults={'url': tag_url})
            tags.append(tag_obj)

        with transaction.atomic():
            # Blog bilgilerini güncelle
            blog.title = title
            blog.description = description
            blog.content = content
            blog.read_time = read_time
            blog.date = date
            blog.banner = banner_url
            blog.save()
            blog.tags.set(tags)

        logger.info(f"Successfully processed blog: {link}")

    except RequestException as e:
        logger.error(f"Request failed for blog {link}: {e}")
        try:
            self.retry(countdown=2 ** self.request.retries)
        except MaxRetriesExceededError:
            logger.error(f"Max retries exceeded for blog {link}")
    except ElementNotFoundError as e:
        logger.error(f"Element not found for blog {link}: {e}")
    except Exception as e:
        logger.error(f"Unexpected error occurred while scraping blog {link}: {e}")
        try:
            self.retry(countdown=2 ** self.request.retries)
        except MaxRetriesExceededError:
            logger.error(f"Max retries exceeded for blog {link}")