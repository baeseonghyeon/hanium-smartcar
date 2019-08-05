from django.db import models

# Create your models here.

class CarInfo(models.Model):
    carnumber = models.CharField(max_length=10)
    container = models.CharField(max_length=20)
    destination = models.CharField(max_length=20)
    route = models.CharField(max_length=300)
    speed = models.CharField(max_length=10)
    battery = models.CharField(max_length=10)
    communication = models.CharField(max_length=10)
    drivingmode = models.CharField(max_length=5)
    now_x = models.CharField(max_length=2, default='0')
    now_y = models.CharField(max_length=2, default='0')
    target_x = models.CharField(max_length=2, default='0')
    target_y = models.CharField(max_length=2, default='0')
    def __str__(self):
        return self.carnumber

