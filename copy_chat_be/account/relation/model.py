from account.model import Account

from django.db import models

class Relation(models):
    friends = models.ManyToManyField(Account)
    blacklist= models.ManyToManyField(Account)
