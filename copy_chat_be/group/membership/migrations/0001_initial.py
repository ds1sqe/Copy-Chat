# Generated by Django 4.1.7 on 2023-04-02 06:44

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("group", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="GroupMembership",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=20)),
                ("permission", models.IntegerField(default=0)),
                (
                    "group",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="membership",
                        to="group.group",
                    ),
                ),
                ("owners", models.ManyToManyField(to=settings.AUTH_USER_MODEL)),
            ],
            options={
                "unique_together": {("group", "name")},
            },
        ),
    ]
