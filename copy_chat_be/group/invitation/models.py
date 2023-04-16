from account.models import Account
from django.db import models
from group.models import Group
from tools.hasher import Hasher


class Invitation(models.Model):
    group = models.ForeignKey(Group, on_delete=models.CASCADE)

    inviter = models.ForeignKey(
        Account,
        on_delete=models.CASCADE,
        null=False,
        blank=False,
        related_name="created_invitation",
    )

    target = models.ForeignKey(
        Account,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="received_invitation",
    )

    since = models.DateTimeField(auto_now_add=True)
    due = models.DateTimeField(null=True, blank=True)

    code = models.CharField(max_length=30, default=Hasher.hash)
