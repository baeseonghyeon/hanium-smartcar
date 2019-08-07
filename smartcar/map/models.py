from django.db import models

class MapInfo(models.Model):
    port_name = models.CharField(max_length=10, null=True)
    map = models.CharField(max_length=10000)