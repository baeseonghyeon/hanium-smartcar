# Generated by Django 2.2.3 on 2019-10-16 09:51

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='IMG',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('picture', models.URLField(max_length=2, null=True)),
            ],
        ),
    ]
