from django.db import models
from account.models import Account

from group.models import Group,SubGroup


class GroupRoll(models.Model):
    group = models.ForeignKey(Group, on_delete=models.CASCADE)
    name = models.CharField(max_length=20)

    # permissions
    invite_member = models.BooleanField(default=True)
    kick_member = models.BooleanField(default=True)
    create_subgroup = models.BooleanField(default=True)
    manage_permission = models.BooleanField(default=True)

    members = models.ManyToManyField(Account)

    class Meta:
        unique_together = [["group", "name"]]

class SubGroupRoll(models.Model):
    subgroup = models.ForeignKey(SubGroup, on_delete=models.CASCADE)
    name = models.CharField(max_length=20)

    invite_member = models.BooleanField(default=True)
    kick_member = models.BooleanField(default=True)
    create_subgroup = models.BooleanField(default=True)
    manage_permission = models.BooleanField(default=True)

    members = models.ManyToManyField(Account)

    class Meta:
        unique_together = [["subgroup", "name"]]
