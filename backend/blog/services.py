from datetime import datetime, timedelta
from django.utils import timezone
import re
from blog.models import Blog

def parse_date(date_str: str) -> datetime:
    """
    Tarih bilgisini işler:
    - Göreceli tarih (örneğin, "21 hours ago", "25 minutes ago")
    - Mutlak tarih (örneğin, "Feb 5, 2025")
    """
    # Göreceli tarih kontrolü
    if "ago" in date_str:
        return parse_relative_date(date_str)
    else:
        # Mutlak tarih kontrolü
        try:
            # "Feb 5, 2025" formatını işle
            date_obj = datetime.strptime(date_str, "%b %d, %Y")
            # Zaman dilimi bilgisi ekle
            return timezone.make_aware(date_obj)
        except ValueError:
            raise ValueError(f"Unsupported date format: {date_str}")

def parse_relative_date(date_str: str) -> datetime:
    """
    "21 hours ago", "9 hours ago", "25 minutes ago" gibi göreceli tarih ifadelerini
    gerçek tarihe dönüştürür.
    """
    now = timezone.now()  # Zaman dilimi bilgisi eklenmiş şimdiki zaman
    if "hour" in date_str:
        hours_ago = int(re.search(r'\d+', date_str).group())
        return now - timedelta(hours=hours_ago)
    elif "minute" in date_str:
        minutes_ago = int(re.search(r'\d+', date_str).group())
        return now - timedelta(minutes=minutes_ago)
    elif "day" in date_str:
        days_ago = int(re.search(r'\d+', date_str).group())
        return now - timedelta(days=days_ago)
    else:
        raise ValueError(f"Unsupported relative date format: {date_str}")
    
def signature(blog_id: int) -> bool:
    try:
        blog = Blog.objects.get(id=blog_id)

        signature_html = """
        <div class="flex items-center gap-2 mt-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-red-500">
                <path fill-rule="evenodd" d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm-1 14.59L6.41 12 8 10.41l3 3 5-5L18.59 10z" clip-rule="evenodd"/>
            </svg>
            <span class="text-red-500 font-semibold text-lg">Scout</span>
        </div>
        """

        if signature_html not in blog.content:
            blog.content += f"\n\n{signature_html}"
            blog.save()
            return True

    except Blog.DoesNotExist:
        return False
