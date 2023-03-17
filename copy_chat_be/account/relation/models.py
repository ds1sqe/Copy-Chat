from account.models import Account

from django.db import models

class Relation(models.Model):
    account = models.ForeignKey(Account,on_delete=models.CASCADE, related_name="relations")
    friends = models.ManyToManyField(Account,related_name="friends")
    blacklist= models.ManyToManyField(Account,related_name="blacklist")
