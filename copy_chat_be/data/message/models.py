from account.models import Account
from data.file.models import File
from data.meta.event.models import Event
from django.db import models
from group.models import Channel, Group


class Message(models.Model):
    group = models.ForeignKey(Group, on_delete=models.CASCADE)
    channel = models.ForeignKey(
        Channel,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="messages",
    )
    account = models.ForeignKey(
        Account, on_delete=models.SET_NULL, null=True, blank=True
    )

    event = models.ForeignKey(Event, on_delete=models.CASCADE, null=True, blank=True)
    text = models.TextField(null=True, blank=True)
    file = models.ForeignKey(File, on_delete=models.SET_NULL, null=True, blank=True)
    datetime = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Message"
        verbose_name_plural = "Messages"
        ordering = ["-id"]
