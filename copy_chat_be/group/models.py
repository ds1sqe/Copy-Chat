from account.models import Account
from django.db import models


class Group(models.Model):
    name = models.CharField(max_length=20, unique=True)
    members = models.ManyToManyField(Account, related_name="joined_groups", blank=True)

    description = models.CharField(max_length=120, null=True, blank=True)

    searchable = models.BooleanField(default=True)
    invitationNeeded = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.name}"


class SubGroup(models.Model):
    group = models.ForeignKey(Group, on_delete=models.CASCADE, related_name="subgroups")

    name = models.CharField(max_length=20)

    description = models.CharField(max_length=120)

    def __str__(self):
        return f"{self.name}"

    class Meta:
        unique_together = [["group", "name"]]


class Channel(models.Model):
    group = models.ForeignKey(Group, on_delete=models.CASCADE, related_name="channels")
    subgroup = models.ForeignKey(
        SubGroup,
        on_delete=models.CASCADE,
        related_name="channels",
        null=True,
        blank=True,
    )
    name = models.CharField(max_length=20)
    is_unique = models.BooleanField(default=False)

    TEXT = "TXT"  # text channel
    CALL = "CAL"  # voice, video call channel
    UNIQUE = "UNQ"  # channel for log meta event like member join or
    # creation of channel | subgroup and
    # broadcast to all member

    TYPE = [
        (TEXT, "text channel"),
        (CALL, "call channel"),
        (UNIQUE, "meta channel"),
    ]

    type = models.CharField(max_length=3, choices=TYPE, default=TEXT)

    class Meta:
        unique_together = [
            ["group", "subgroup", "name", "is_unique"],
            ["group", "is_unique"],
        ]
