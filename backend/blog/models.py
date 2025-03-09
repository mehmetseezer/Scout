from django.db import models
from author.models import Author

class Tag(models.Model):
    name = models.CharField(max_length=255)
    url = models.URLField()

    def __str__(self):
        return self.name

class Blog(models.Model):
    author = models.ForeignKey(Author, on_delete=models.CASCADE, related_name='blogs')
    title = models.CharField(max_length=200)
    description = models.CharField(null=True, blank=True, max_length=200)
    content = models.TextField()
    url = models.URLField()
    tags = models.ManyToManyField(Tag)
    banner = models.URLField(null=True, blank=True)
    date = models.DateTimeField(null=True, blank=True)
    read_time = models.IntegerField(null=True, blank=True)
    def __str__(self):
        return self.title
