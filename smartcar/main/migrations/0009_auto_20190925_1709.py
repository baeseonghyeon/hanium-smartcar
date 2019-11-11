# Generated by Django 2.2.3 on 2019-09-25 08:09

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0008_auto_20190924_2030'),
    ]

    operations = [
        migrations.AlterField(
            model_name='carinfo',
            name='container_id',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='main.ContainerInfo'),
        ),
        migrations.AlterField(
            model_name='carinfo',
            name='pi_id',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='main.PiInfo'),
        ),
    ]
