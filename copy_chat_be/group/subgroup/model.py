from django.db import models
from account.model import Account
from group.model import Group

class SubGroup(models):
    group = models.ForeignKey(Group)
    belongs = models.ForeignKey(SubGroup,null=True,blank=True)
    name = models.CharField(max_length=20, unique=True)
    head = models.ForeignKey(Account) # the head of group
    description = models.CharField()
    members = models.ManyToManyField(
        Account
    )
