# Generated by Django 2.2.3 on 2019-08-14 07:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='carinfo',
            name='car_code',
            field=models.CharField(default='1', max_length=100),
        ),
        migrations.AlterField(
            model_name='carinfo',
            name='car_route',
            field=models.CharField(default='1', max_length=300),
        ),
    ]