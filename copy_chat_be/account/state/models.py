from django.db import models
from account.models import Account

class State(models.Model):
    ONLINE = 'ONL'
    OFFLINE = 'OFF'
    STEP_OUT = 'STO'
    CALL = 'CAL'

    TYPE = [
            (ONLINE,'online'),
            (STEP_OUT,'step out'),
            (CALL,'call in progress'),
            (OFFLINE,'offline'),
            ]

    account = models.ForeignKey(Account,on_delete=models.CASCADE,related_name="state")
    type = models.CharField(max_length=3,choices=TYPE,default=OFFLINE)

class CustomState(models.Model):
    account = models.ForeignKey(Account,on_delete=models.CASCADE,related_name="custom_state")
    icon = models.CharField(max_length=10)
    description = models.CharField(max_length=100)
    until = models.DateTimeField()

    # TODO: implement save icon
