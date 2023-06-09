from account.models import Account
from django.db import models
from group.models import Group


class Permission:
    """
     1             1      => invite member
     2            10      => kick member

     4           100      => grant membership (give or take membership)
     8          1000      => change membership (permission, name)

     16        10000      => delete group
     32       100000      => modify group

     64      1000000      => create subgroup
    128     10000000      => delete subgroup

    256    100000000      => create channel
    512   1000000000      => delete channel


    1023 => all
    """

    def __init__(self, permission):
        self.invite_member = (1 & permission) > 0
        self.kick_member = (2 & permission) > 0

        self.grant_membership = (4 & permission) > 0
        self.change_mambership = (8 & permission) > 0

        self.delete_group = (16 & permission) > 0
        self.modify_group = (32 & permission) > 0

        self.create_subgroup = (64 & permission) > 0
        self.delete_subgroup = (128 & permission) > 0

        self.create_channel = (256 & permission) > 0
        self.delete_channel = (512 & permission) > 0

    def all():
        return 1023

    def invite_only():
        return 1


class GroupMembership(models.Model):
    group = models.ForeignKey(
        Group, on_delete=models.CASCADE, related_name="memberships"
    )
    name = models.CharField(max_length=20)

    owners = models.ManyToManyField(Account)

    is_default = models.BooleanField(default=False)
    permission = models.IntegerField(default=0)

    class Meta:
        unique_together = [["group", "name"], ["group", "is_default"]]
