# Generated by Django 2.2.3 on 2019-08-14 07:46

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='MapInfo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('port_name', models.CharField(max_length=10, null=True)),
                ('map', models.CharField(max_length=10, null=True)),
            ],
        ),
    ]
