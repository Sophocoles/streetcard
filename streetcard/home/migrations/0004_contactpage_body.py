# Generated by Django 4.1.5 on 2023-04-04 01:44

from django.db import migrations
import wagtail.fields


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0003_contactpage'),
    ]

    operations = [
        migrations.AddField(
            model_name='contactpage',
            name='body',
            field=wagtail.fields.RichTextField(blank=True),
        ),
    ]
