from celery import shared_task
import requests
import redis

redis_client = redis.from_url("redis://redis:6379/0", decode_responses=True)

@shared_task(bind=True, queue="admin_queue")
def update_proxies(self):
    response = requests.get(
        "https://proxy.webshare.io/api/v2/proxy/list/?mode=direct&page=1&page_size=10",
        headers = {"Authorization": "Token wdml3ts895z6c3qna2sqrql7u52v5miei0g0ies9"}
    )
    redis_client.lpush(
        'proxy_list',
        *[
            f"http://{proxy['username']}:{proxy['password']}@{proxy['proxy_address']}:{proxy['port']}"
            for proxy in response.json().get("results", [])
        ]
    )


if __name__ == "__main__":
    update_proxies()