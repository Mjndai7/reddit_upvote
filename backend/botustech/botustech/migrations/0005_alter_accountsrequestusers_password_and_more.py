# Generated by Django 4.2.1 on 2023-07-10 07:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('botustech', '0004_createuser_delete_contactususers_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='accountsrequestusers',
            name='password',
            field=models.CharField(default='pbkdf2_sha256$600000$vc6OxelMwsA6bRgNZ6HesZ$zfxa7yQzcGPlAA0kal8xUkJMJy1MoS4fVU6yh80TlWg=', max_length=128),
        ),
        migrations.AlterField(
            model_name='botrequestusers',
            name='password',
            field=models.CharField(default='pbkdf2_sha256$600000$eKzeUalI4vhMjmBrQwG2Jn$Jxt5tT0I9co9IfS4MTjvxAmL/ern7IQBvFy03f1RdUM=', max_length=128),
        ),
        migrations.AlterField(
            model_name='createuser',
            name='email',
            field=models.EmailField(max_length=255, unique=True),
        ),
        migrations.AlterField(
            model_name='createuser',
            name='password',
            field=models.CharField(max_length=128),
        ),
        migrations.AlterField(
            model_name='quotationusers',
            name='password',
            field=models.CharField(default='pbkdf2_sha256$600000$2eNT9Ysqn8LLKjz2OXm79P$FTgUEtpbHZ1mV0tz6Cq0aEHTQb4tBAubEo4alBnO2rg=', max_length=128),
        ),
        migrations.AlterField(
            model_name='waitlistusers',
            name='password',
            field=models.CharField(default='pbkdf2_sha256$600000$zyFWX6Q2LMRss1dRGYNrij$ON8Z26bz4IQJrYauIBta+5welwNs6TqpovDJLwoo4S4=', max_length=128),
        ),
    ]
