from django.db import models

from account.models import Account
from group.models import Group, SubGroup
from data.message.models import Message

class Counter(models.Model):
    group = models.ForeignKey(Group,on_delete=models.CASCADE)
    subgroup = models.ForeignKey(SubGroup,on_delete=models.CASCADE,null=True,blank=True)

    account = models.ForeignKey(Account, on_delete=models.CASCADE, null=True, blank=False)

    is_reading = models.BooleanField(default=False)
    last_read= models.ForeignKey(Message, on_delete=models.CASCADE, null=True, blank=True)

    class Meta:
        verbose_name = "Counter"
        verbose_name_plural = "Counter"
        ordering = ["-last_read__id"]
        unique_together = [["group","subgroup", "account"]]
