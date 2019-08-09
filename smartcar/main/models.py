from django.db import models

# Create your models here.

class PiInfo(models.Model):
	pi_id = models.CharField(max_length=10, primary_key=True)
	battery = models.CharField(max_length=10, null=True)
	communication = models.CharField(max_length=10, null=True)
	car_type = models.CharField(max_length=10, null=True)
	picture = models.URLField(max_length=200, null=True)


class ContainerInfo(models.Model):
    container_id = models.CharField(max_length=10, primary_key=True)
    destination = models.CharField(max_length=10, null=True)
    container_company = models.CharField(max_length=10, null=True)
    container_product = models.CharField(max_length=10, null=True)
    container_shipment_day = models.CharField(max_length=10, null=True)


class CarInfo(models.Model):
    pi_id = models.ForeignKey(PiInfo, on_delete=models.CASCADE, null=True)
    container_id = models.ForeignKey(ContainerInfo, on_delete=models.CASCADE, null=True)
    car_name = models.CharField(max_length=20, null=True)
    car_route = models.CharField(max_length=10000, default='1')
    car_speed = models.CharField(max_length=1000, null=True, default='')
    car_arrive_time = models.CharField(max_length=1000, null=True, default='')
    car_destination_distance = models.CharField(max_length=1000, null=True, default='')
    car_now_situation = models.CharField(max_length=1000, null=True, default='')
    now_x = models.CharField(max_length=2, default='1')
    now_y = models.CharField(max_length=2, default='1')
    target_x = models.CharField(max_length=2, default='')
    target_y = models.CharField(max_length=2, default='')






