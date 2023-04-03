from django.db import models
from account.models import Account


class Group(models.Model):
    name = models.CharField(max_length=20,unique=True)
    members = models.ManyToManyField(Account, related_name="joined_groups",blank=True)

    description = models.CharField(max_length=120,null=True,blank=True)

    searchable = models.BooleanField(default=True)
    invitationNeeded = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.name}'


class SubGroup(models.Model):
    group = models.ForeignKey(Group,on_delete=models.CASCADE,related_name="subgroups")

    name = models.CharField(max_length=20)

    description = models.CharField(max_length=120)

    def __str__(self):
        return f'{self.name}'

    class Meta:
        unique_together = [["group", "name"]]

class Channel(models.Model):
    group = models.ForeignKey(Group, on_delete=models.CASCADE,related_name="channel")
    subgroup = models.ForeignKey(SubGroup, on_delete=models.CASCADE,related_name="channel"
                                 ,null=True,blank=True)
    name = models.CharField(max_length=20)
    isTextChannel = models.BooleanField(default=True)

    class Meta:
        unique_together = [["group","subgroup","name"]]
