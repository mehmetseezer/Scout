from django.urls import path, include
from rest_framework.routers import DefaultRouter
from blog.views import BlogViewSet
from author.views import AuthorViewSet
from custom_auth.urls import urlpatterns as auth_urls

router = DefaultRouter()
router.register(r'authors', AuthorViewSet, basename="authors")
router.register(r'blogs', BlogViewSet, basename="blogs")

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/auth/', include(auth_urls)),
]