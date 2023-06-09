# Generated by Django 4.1.7 on 2023-04-07 02:14

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        ("group", "0005_alter_channel_unique_together_channel_is_unique_and_more"),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name="channel",
            unique_together=set(),
        ),
        migrations.AlterField(
            model_name="channel",
            name="group",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="channels",
                to="group.group",
            ),
        ),
        migrations.AlterField(
            model_name="channel",
            name="subgroup",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="channels",
                to="group.subgroup",
            ),
        ),
        migrations.AlterUniqueTogether(
            name="channel",
            unique_together={("group", "subgroup", "name")},
        ),
    ]
