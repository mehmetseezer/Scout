from seleniumbase import Driver
from selenium.webdriver.chrome.options import Options
import requests
from random import choice
from bs4 import BeautifulSoup as bs
from random import choice
import redis
import socket
import random

redis_client = redis.from_url("redis://redis:6379/0", decode_responses=True)

def create_driver():
    """Tarayıcı driver'ını başlatmak için fonksiyon"""
    options = Options()
    options.add_argument('--headless')
    options.add_argument('--no-sandbox')
    return Driver(uc=True)

def get_random_proxy():
    proxies = redis_client.lrange('proxy_list', 0, -1)
    if not proxies:
        return socket.gethostbyname(socket.gethostname())
    return choice(proxies)
if __name__ == "__main__":
    print(get_random_proxy())