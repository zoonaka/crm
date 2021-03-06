from django.db import models
from django.contrib.auth.models import User

class Article(models.Model):
    json = models.JSONField()
    owner = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    related_articles = models.ManyToManyField("Article")

    def __str__(self):
        return '{} {}'.format(type(self.json), self.json)
