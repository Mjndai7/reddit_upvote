# Generated by Django 4.2.1 on 2023-07-10 14:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('botustech', '0009_redditurls_delete_accountsrequestusers_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='redditurls',
            name='action',
            field=models.EmailField(max_length=255),
        ),
    ]
