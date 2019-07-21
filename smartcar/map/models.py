from django.db import models

class MapInfo(models.Model):
    map = models.CharField(max_length=10000)