from django.db import models
from account.models import Account
#from group.models import Group

class State(models.Model):
    account = models.ForeignKey(Account,on_delete=models.CASCADE,related_name="state")
    #group = models.ForeignKey(Group, on_delete=models.CASCADE)
    icon = models.CharField(max_length=10)
    description = models.CharField(max_length=100)
    until = models.DateTimeField()

    # TODO: implement save icon
