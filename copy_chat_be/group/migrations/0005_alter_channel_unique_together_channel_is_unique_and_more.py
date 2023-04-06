# Generated by Django 4.1.7 on 2023-04-04 04:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('group', '0004_channel'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='channel',
            unique_together=set(),
        ),
        migrations.AddField(
            model_name='channel',
            name='is_unique',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='channel',
            name='type',
            field=models.CharField(choices=[('TXT', 'text channel'), ('CAL', 'call channel'), ('UNQ', 'meta channel')], default='TXT', max_length=3),
        ),
        migrations.AlterUniqueTogether(
            name='channel',
            unique_together={('group', 'subgroup', 'name', 'is_unique'), ('group', 'is_unique')},
        ),
        migrations.RemoveField(
            model_name='channel',
            name='isTextChannel',
        ),
    ]