from django.db import models
from group.models import Group, SubGroup
from account.models import Account
from tools.hasher import Hasher

class Invitation(models.Model):
    group = models.ForeignKey(Group,on_delete=models.CASCADE)
    subgroup = models.ForeignKey(SubGroup,on_delete=models.CASCADE,null=True,blank=True)

    inviter = models.ForeignKey(Account, on_delete=models.CASCADE, null=False, blank=False,related_name="inviter")

    target = models.ForeignKey(Account, on_delete=models.CASCADE, null=True, blank=True,related_name="target")

    since = models.DateTimeField(auto_now_add=True)
    due = models.DateTimeField(null= True, blank= True)

    code = models.CharField(max_length=30,default=Hasher.hash)
