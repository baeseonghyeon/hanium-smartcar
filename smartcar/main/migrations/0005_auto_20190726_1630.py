# Generated by Django 2.2.3 on 2019-07-26 07:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0004_auto_20190724_2311'),
    ]

    operations = [
        migrations.AlterField(
            model_name='carinfo',
            name='now_x',
            field=models.CharField(default='0', max_length=2),
        ),
        migrations.AlterField(
            model_name='carinfo',
            name='now_y',
            field=models.CharField(default='0', max_length=2),
        ),
        migrations.AlterField(
            model_name='carinfo',
            name='target_x',
            field=models.CharField(default='0', max_length=2),
        ),
        migrations.AlterField(
            model_name='carinfo',
            name='target_y',
            field=models.CharField(default='0', max_length=2),
        ),
    ]
