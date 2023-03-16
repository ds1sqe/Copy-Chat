from django.db import models
from account.model import Account
from group.model import Group

class State(models):
    account = models.ForeignKey(Account,on_delete=models.CASCADE)
    group = models.ForeignKey(Group, on_delete=models.CASCADE)
    icon = models.CharField(max_length=100)
    description = models.CharField()
    until = models.DateTimeField()

    # TODO: implement save icon
