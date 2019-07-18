from django.db import models

# Create your models here.

class MainInfo(models.Model):
    portinfo = models.CharField(max_length=10, unique=False)
    portmap = models.CharField(max_length=1000)

class CarInfo(models.Model):
    carnumber = models.ForeignKey(MainInfo, on_delete=models.CASCADE)
    container = models.CharField(max_length=20)
    destination = models.CharField(max_length=20)
    route = models.CharField(max_length=300)
    speed = models.CharField(max_length=10)
    battery = models.CharField(max_length=10)
    communication = models.CharField(max_length=10)
    drivingmode = models.CharField(max_length=5)