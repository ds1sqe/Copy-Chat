from django.db import models
from account.models import Account

def upload_file(instance, filename):
    return f'media/file/user_{instance.uploaded_by.id}/{filename}'


class File(models.Model):
    account = models.ForeignKey(Account, on_delete=models.CASCADE)
    file = models.FileField(upload_to=upload_file)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
