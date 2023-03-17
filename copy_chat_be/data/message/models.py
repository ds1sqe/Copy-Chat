from django.db import models
from account.models import Account
from data.meta.event.models import Event

from group.models import Group, SubGroup
from data.file.models import File


class Message(models.Model):
    group = models.ForeignKey(Group,on_delete=models.CASCADE)
    subgroup = models.ForeignKey(SubGroup,on_delete=models.CASCADE,null=True,blank=True)
    account = models.ForeignKey(Account, on_delete=models.SET_NULL, null=True, blank=True)

    event = models.ForeignKey(Event, on_delete=models.CASCADE,null=True,blank=True)
    text = models.TextField(null=True, blank=True)
    file = models.ForeignKey(File, on_delete=models.SET_NULL, null=True, blank=True)
    datetime = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Message'
        verbose_name_plural = 'Messages'
        ordering = ['-id']

    # def __str__(self):
