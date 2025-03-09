import logging
import time
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
from author.models import Author
from blog.models import Blog
from api.services import create_driver
import redis
logger = logging.getLogger(__name__)

redis_client = redis.from_url("redis://redis:6379/0", decode_responses=True)

def scrape_profile_data(username: str):
    """Scrape profile data from Medium."""
    driver = create_driver()
    profile_url = f"https://medium.com/@{username}"
    driver.get(profile_url)
    logger.info(f"Opened profile page: {profile_url}")

    try:
        # Extract profile name
        name_element = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CLASS_NAME, "pw-author-name"))
        )
        name = name_element.find_element(By.TAG_NAME, "span").text.strip()
        logger.info(f"Extracted name: {name}")

        # Extract profile image URL
        image_url_element = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, f"//img[@alt='{name}']"))
        )
        profile_image_url = image_url_element.get_attribute("src")
        logger.info(f"Extracted profile image URL: {profile_image_url}")

        # Extract follower count
        follower_count_element = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CLASS_NAME, "pw-follower-count"))
        )
        followers = follower_count_element.find_element(By.TAG_NAME, "a").get_attribute('innerHTML').split()[0]
        logger.info(f"Extracted followers count: {followers}")

        # Save or update Author model
        author, created = Author.objects.get_or_create(
            username=username,
            defaults={"name": name, "profile_image_url": profile_image_url, "followers": followers},
        )
        if created:
            logger.info(f"Created new Author record for {username}")
        else:
            logger.info(f"Updated existing Author record for {username}")

        return author

    except Exception as e:
        logger.error(f"Error occurred while scraping profile for {username}: {e}")
        raise e
    finally:
        driver.quit()
        logger.info(f"Closed driver for {username}")

def scrape_blog_links_for_author(username: str, author_id: int):
    """Scrape blog links for a given author."""
    logger.info(f"Scraping blog links for {username}")
    driver = create_driver()
    profile_url = f"https://medium.com/@{username}"
    driver.get(profile_url)
    logger.info(f"Opened profile page: {profile_url}")

    try:
        scraped_links = set()
        last_height = driver.execute_script("return document.body.scrollHeight")

        while True:
            page_source = driver.page_source
            soup = BeautifulSoup(page_source, "html.parser")
            divs_with_links = soup.find_all("div", {"role": "link", "data-href": True})

            new_links = set(div.get("data-href") for div in divs_with_links if div.get("data-href"))
            new_links -= scraped_links

            if new_links:
                logger.info(f"Found {len(new_links)} new blog links for {username}")
                for link in new_links:
                    scrape_single_blog.delay(link, author_id)
                    logger.info(f"Triggered scrape_single_blog task for {link}")

                scraped_links.update(new_links)

            driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
            time.sleep(2)

            new_height = driver.execute_script("return document.body.scrollHeight")
            if new_height == last_height:
                break
            last_height = new_height

        logger.info("Completed scrolling and blog scraping.")

    except Exception as e:
        logger.error(f"Error occurred while scraping blog links for {username}: {e}")
        raise e
    finally:
        driver.quit()
        logger.info(f"Closed driver for {username}")

def update_all_profiles():
    """Update all profiles in the database."""
    logger.info("Starting to update all profiles")
    last_author_id = 0
    for i in range(100):
        try:
            last_author_id = int(redis.get("last_processed_author_id") or 0)
            current_author = Author.objects.filter(id__gt=last_author_id).order_by('id').first()
            if not current_author:
                logger.info("No more authors to process.")
                break
            
            current_author_username = current_author.username
            scrape_profile_data(current_author_username)
            
            redis.set("last_processed_author_id", current_author.id)
            logger.info(f"Successfully processed author: {current_author_username}")
            
        except Exception as e:
            logger.error(f"Error processing author ID {last_author_id}: {e}")
            raise e

    logger.info("Finished updating all profiles")

def get_blogs_for_author(author_id):
    try:
        author = Author.objects.get(id=author_id)
        blogs = Blog.objects.filter(author=author)
        return blogs
    except Author.DoesNotExist:
        logger.error(f"Author with ID {author_id} not found.")
        return None
    except Exception as e:
        logger.error(f"Error retrieving blogs for author {author_id}: {e}")
        return None

def get_queue():
    try:
        queued_authors = redis_client.get('authors_queue')
        if queued_authors is None:
            logger.warning('No authors in the queue.')
        return queued_authors
    except Exception as e:
        logger.error(f'An error occurred while getting authors queue: {e}')
        return None