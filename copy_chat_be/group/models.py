from django.db import models
from account.models import Account


class Group(models.Model):
    name = models.CharField(max_length=20,unique=True)
    description = models.CharField(max_length=120,null=True,blank=True)
    members = models.ManyToManyField(Account, related_name="joined_groups",blank=True)

    def __str__(self):
        return f'{self.name}'


class SubGroup(models.Model):
    group = models.ForeignKey(Group,on_delete=models.CASCADE)
    parent = models.ForeignKey("self", on_delete=models.CASCADE, null=True, blank=True)
    name = models.CharField(max_length=20)
    description = models.CharField(max_length=120)
    members = models.ManyToManyField(Account, related_name="joined_subgroups")


    def __str__(self):
        return f'{self.name}'

    class Meta:
        unique_together = [["group", "name"]]
