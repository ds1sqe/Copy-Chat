from django.db import models

from account.model import Account

def user_directory_path(instance, filename):
    # file will be uploaded to MEDIA_ROOT/profile/image/user_<id>/<filename>
    return f'profile/image/user_{instance.account.id}/{filename}'

class Profile(models):
    accout = models.ForeignKey(Account,on_delete=models.CASCADE)
    profile_image = models.ImageField(upload_to=user_directory_path)
    comment = models.CharField(null=True,blank=True)
