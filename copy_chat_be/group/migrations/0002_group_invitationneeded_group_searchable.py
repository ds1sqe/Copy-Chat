# Generated by Django 4.1.7 on 2023-04-02 08:03

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("group", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="group",
            name="invitationNeeded",
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name="group",
            name="searchable",
            field=models.BooleanField(default=True),
        ),
    ]