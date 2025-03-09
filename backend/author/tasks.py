from celery import shared_task
from author.models import Author
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
import logging
from author.services import get_blogs_for_author
from celery.exceptions import MaxRetriesExceededError
from api.services import create_driver
from blog.tasks import scrape_single_blog
from blog.services import signature
import time
import redis

# Hata loglamayı etkinleştirelim
logger = logging.getLogger(__name__)

# Maksimum yeniden deneme sayısı

redis_client = redis.from_url("redis://redis:6379/0", decode_responses=True)

@shared_task(bind=True, queue="admin_queue")
def test(self):
    return redis_client.get("last_processed_author_id")

@shared_task(bind=True, queue="admin_queue")
def add_new_authors(self, usernames: list):
    logger.info(f"Adding new authors: {len(usernames)}")

    # Redis listesine yazarları ekle
    for username in usernames:
        redis_client.lpush("author_queue", username)
        logger.info(f"Added author to Redis queue: {username}")

    # Eğer "last_processed_author_id" yoksa, ilk yazarın ID'sini kaydet
    if not redis_client.exists("last_processed_author_id"):
        first_author = redis_client.rpop("author_queue")
        if first_author:
            author, created = Author.objects.get_or_create(username=first_author)
            if created:
                redis_client.set("last_processed_author_id", author.id, ex=3600)
                logger.info(f"Initialized counter with author ID: {author.id}")
                update_authors.delay()

    logger.info("Last Processed Author ID: " + redis_client.get("last_processed_author_id"))

@shared_task(bind=True, queue="bulk_sync_worker")
def update_authors(self):
    logger.info("Starting periodic author update task")
    
    # Redis'ten yazar kuyruğunu kontrol et
    if not redis_client.exists("author_queue"):
        logger.info("No authors in the Redis queue, skipping task.")
        return
    
    for _ in range(100):
        username = redis_client.rpop("author_queue")
        if not username:
            logger.info("No more authors in the Redis queue.")
            break
        
        try:
            # Yazarı veritabanında oluştur veya güncelle
            author, created = Author.objects.get_or_create(username=username)
            logger.info(f"Processing author: {username} (Created: {created})")
            
            # Yazar bilgilerini güncelle
            scrape_profile.delay(author.username)
            
            # Blog linklerini çek
            scrape_blog_links.delay(author.username, author.id)
            
            # Counter'ı güncelle (son işlenen yazarın ID'sini kaydet)
            redis_client.set("last_processed_author_id", author.id, ex=3600)
            logger.info(f"Updated counter to author ID: {author.id}")
        except Exception as e:
            logger.error(f"Error processing author {username}: {e}")
            # Hata durumunda yazarı tekrar kuyruğa ekle
            redis_client.lpush("author_queue", username)
            logger.info(f"Re-queued author: {username}")
    
    logger.info("Finished processing authors from Redis queue.")


    logger.info(f"Scraping profile for {username}")
    driver = create_driver()

    try:
        profile_url = f"https://medium.com/@{username}"
        driver.get(profile_url)
        logger.info(f"Opened profile page: {profile_url}")
        # Profil verilerini çekme
        name_element = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CLASS_NAME, "pw-author-name"))
        )
        name = name_element.find_element(By.TAG_NAME, "span").text.strip()
        logger.info(f"Extracted name: {name}")

        image_url_element = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, f"//img[@alt='{name}']"))
        )
        profile_image_url = image_url_element.get_attribute("src")
        logger.info(f"Extracted profile image URL: {profile_image_url}")

        follower_count_element = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CLASS_NAME, "pw-follower-count"))
        )
        followers = follower_count_element.find_element(By.TAG_NAME, "a").get_attribute('innerHTML').split()[0]
        logger.info(f"Extracted followers count: {followers}")

        # Author modeline kaydet
        author, created = Author.objects.get_or_create(
            username=username,
            defaults={"name": name, "profile_image_url": profile_image_url, "followers": followers},
        )
        if created:
            logger.info(f"Created new Author record for {username}")
        else:
            logger.info(f"Updated existing Author record for {username}")

        # Blogları scrape et
        scrape_blog_links.delay(username, author.id)
        logger.info(f"Triggered scrape_blog_links task for {username}")

    except Exception as e:
        logger.error(f"Error occurred while scraping profile for {username}: {e}")
        try:
            self.retry(countdown=10) 
        except MaxRetriesExceededError:
            logger.error(f"Max retries exceeded for profile {username}")
    finally:
        driver.quit()
        logger.info(f"Closed driver for {username}")

@shared_task(bind=True, max_retries=3, queue="onboarding_queue")
def scrape_profile(self, username: str):
    logger.info(f"Scraping profile for {username}")
    driver = create_driver()

    try:
        profile_url = f"https://medium.com/@{username}"
        driver.get(profile_url)
        logger.info(f"Opened profile page: {profile_url}")
        
        # Profil bilgilerini çek
        name = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CLASS_NAME, "pw-author-name"))
        ).text.strip()
        
        profile_image_url = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, f"//img[@alt='{name}']"))
        ).get_attribute("src")
        
        followers = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CLASS_NAME, "pw-follower-count"))
        ).find_element(By.TAG_NAME, "a").get_attribute('innerHTML').split()[0]
        
        # Yazarı güncelle
        author = Author.objects.get(username=username)
        author.name = name
        author.profile_image_url = profile_image_url
        author.followers = followers
        author.save()
        logger.info(f"Updated author: {username}")
        
    except Exception as e:
        logger.error(f"Error scraping profile for {username}: {e}")
        try:
            self.retry(countdown=10)
        except MaxRetriesExceededError:
            logger.error(f"Max retries exceeded for profile {username}")
            # Yazar bulunamadı, sil
            Author.objects.filter(username=username).delete()
            logger.info(f"Deleted author: {username}")
    finally:
        driver.quit()
        logger.info(f"Closed driver for {username}")

@shared_task(bind=True, max_retries=3, queue="onboarding_queue")
def scrape_blog_links(self, username: str, author_id: int):
    logger.info(f"Scraping blog links for {username}")
    driver = create_driver()

    try:
        profile_url = f"https://medium.com/@{username}"
        driver.get(profile_url)
        logger.info(f"Opened profile page: {profile_url}")
        
        # Kaydırma işlemi
        last_height = driver.execute_script("return document.body.scrollHeight")
        scraped_links = set()
        
        while True:
            # Blog linklerini çek
            page_source = driver.page_source
            soup = BeautifulSoup(page_source, "html.parser")
            divs_with_links = soup.find_all("div", {"role": "link", "data-href": True})
            new_links = set(div.get("data-href") for div in divs_with_links if div.get("data-href"))
            new_links -= scraped_links
            
            if new_links:
                for link in new_links:
                    scrape_single_blog.delay(link, author_id)
                    logger.info(f"Triggered scrape_single_blog for {link}")
                scraped_links.update(new_links)
            
            # Sayfayı kaydır
            driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
            time.sleep(2)
            
            # Yeni yükseklik kontrolü
            new_height = driver.execute_script("return document.body.scrollHeight")
            if new_height == last_height:
                break
            last_height = new_height
        
        logger.info(f"Finished scraping blog links for {username}")
        
    except Exception as e:
        logger.error(f"Error scraping blog links for {username}: {e}")
        self.retry(countdown=10)
    finally:
        driver.quit()
        logger.info(f"Closed driver for {username}")

@shared_task(bind=True, queue="periodic:bulk_sync_worker")
def update_daily_authors(self):
    logger.info("Starting periodic author update task")

    LAST_PROCESSED_KEY = "periodic:last_processed_author_id"
    REDIS_EXPIRY = 3600

    last_id = redis_client.get(LAST_PROCESSED_KEY)

    if last_id is None:
        first_author = Author.objects.order_by("id").first()
        start_id = first_author.id if first_author else -1
    else:
        start_id = int(last_id)

    authors = Author.objects.filter(id__gt=start_id).order_by('id')

    if not authors.exists():
        logger.info("No more authors to process")
        return

    max_id = start_id
    processed_count = 0

    for author in authors:
        try:
            logger.info(f"Processing author: {author.username}")
            blogs = get_blogs_for_author(author.id)
            for blog in blogs:
                if signature(blog.id):
                    logger.info(f"{author.name}'s blog titled '{blog.title[:20]}' has been signed successfully.")
                else:
                    logger.info(f"{author.name}'s blog titled '{blog.title[:20]}' could not be signed.")
            processed_count += 1
            max_id = author.id

        except Exception as e:
            logger.error(f"Error processing author {author.username}: {e}")

    redis_client.set(LAST_PROCESSED_KEY, max_id, ex=REDIS_EXPIRY)
    logger.info(f"Updated last processed ID to {max_id} (expires in 1h)")
    logger.info(f"Finished processing {processed_count} authors")
