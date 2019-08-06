from django.db import models

# Create your models here.

class CarInfo(models.Model):
    carname = models.CharField(max_length=10, unique=True)
    container = models.CharField(max_length=20, null=True, unique=False, default='')
    destination = models.CharField(max_length=20, null=True, unique=False, default='')
    route = models.CharField(max_length=300, null=True, unique=False, default='')
    speed = models.CharField(max_length=10, null=True, unique=False, default='')
    battery = models.CharField(max_length=10, null=True, unique=False, default='')
    communication = models.CharField(max_length=10, null=True, unique=False, default='')
    drivingmode = models.CharField(max_length=5, null=True, unique=False, default='')
    now_x = models.CharField(max_length=2, default='')
    now_y = models.CharField(max_length=2, default='')
    target_x = models.CharField(max_length=2, default='')
    target_y = models.CharField(max_length=2, default='')
    def __str__(self):
        return self.carnumber

