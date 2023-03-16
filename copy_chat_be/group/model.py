from django.db import models
from account.model import Account

class Group(models):
    name = models.CharField(max_length=20, unique=True)
    head = models.ForeignKey(Account) # the head of group
    # hash =models.CharField(default=Hasher.hash, max_length=10, unique=True)
    description = models.CharField()
    members = models.ManyToManyField(Account)

class SubGroup(models):
    #group = models.ForeignKey...
    belongs = models.ForeignKey(SubGroup)
    name = models.CharField(max_length=20, unique=True)
    head = models.ForeignKey(Account) # the head of group
    description = models.CharField()
    members = models.ManyToManyField(Account)
