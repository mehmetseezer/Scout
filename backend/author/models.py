from django.db import models
class Author(models.Model):
    username = models.CharField(max_length=255, unique=True)
    name = models.CharField(max_length=255, blank=True, null=True)
    profile_image_url = models.URLField(blank=True, null=True)
    followers = models.CharField(blank=True, null=True)

    def __str__(self):
        return self.name or self.username