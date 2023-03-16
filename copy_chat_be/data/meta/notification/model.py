from django.db import models

from account.model import Account
from group.model import Group

class Notification(models):
    creater = models.ForeignKey(Account)
    group = models.ForeignKey(Group)
    due_to = models.DateField()
