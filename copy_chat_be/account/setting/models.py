from django.db import models
from account.models import Account

class Setting(models.Model):
    account = models.ForeignKey(Account,on_delete=models.CASCADE,related_name="setting")
    is_searchable = models.BooleanField(default=True)
    show_state = models.BooleanField(default=True)
    accecpt_dm = models.BooleanField(default=True)
    accecpt_invitation = models.BooleanField(default=True)
