from django.contrib.auth.models import Permission, AbstractUser
from django.db import models

from account.relation.model import Relation

class Account(AbstractUser):
    phone_number = models.CharField(max_length=20, null=True, blank=True)
    """
    Account will refferenced by 
        relation
        profile
        roll
        status
    """
