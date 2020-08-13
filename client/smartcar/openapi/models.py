from django.db import models

class IMG(models.Model):
    picture = models.URLField(max_length=100, null=True)