# Generated by Django 2.2.3 on 2019-08-14 07:46

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ContainerInfo',
            fields=[
                ('container_id', models.CharField(max_length=10, primary_key=True, serialize=False)),
                ('destination', models.CharField(max_length=10, null=True)),
                ('container_company', models.CharField(max_length=10, null=True)),
                ('container_product', models.CharField(max_length=10, null=True)),
                ('container_shipment_day', models.CharField(max_length=10, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='PiInfo',
            fields=[
                ('pi_id', models.CharField(max_length=10, primary_key=True, serialize=False)),
                ('battery', models.CharField(max_length=10, null=True)),
                ('communication', models.CharField(max_length=10, null=True)),
                ('car_type', models.CharField(max_length=10, null=True)),
                ('picture', models.URLField(max_length=2, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='CarInfo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('car_name', models.CharField(max_length=20, null=True)),
                ('car_route', models.CharField(default='1', max_length=100)),
                ('car_speed', models.CharField(default='0', max_length=10, null=True)),
                ('car_arrive_time', models.CharField(default='0', max_length=10, null=True)),
                ('car_destination_distance', models.CharField(default='0', max_length=10, null=True)),
                ('car_now_situation', models.CharField(default='0', max_length=10, null=True)),
                ('now_x', models.CharField(default='1', max_length=2)),
                ('now_y', models.CharField(default='1', max_length=2)),
                ('target_x', models.CharField(default='0', max_length=2)),
                ('target_y', models.CharField(default='0', max_length=2)),
                ('position', models.CharField(default='3', max_length=2)),
                ('container_id', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='main.ContainerInfo')),
                ('pi_id', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='main.PiInfo')),
            ],
        ),
    ]
