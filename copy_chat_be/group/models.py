from django.db import models
from account.models import Account


class Group(models.Model):
    name = models.CharField(max_length=20,unique=True)
    description = models.CharField(max_length=120)
    members = models.ManyToManyField(Account)

class SubGroup(models.Model):
    group = models.ForeignKey(Group,on_delete=models.CASCADE)
    parent = models.ForeignKey("self", on_delete=models.CASCADE, null=True, blank=True)
    name = models.CharField(max_length=20)
    description = models.CharField(max_length=120)
    members = models.ManyToManyField(Account)

    class Meta:
        unique_together = [["group", "name"]]
