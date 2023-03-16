from account.model import Account
from group.model import Group

from django.db import models

class Roll(models):
    group = models.ForeignKey(Group, on_delete=models.CASCADE)
