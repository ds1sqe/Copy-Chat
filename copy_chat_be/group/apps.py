from django.apps import AppConfig


class GroupConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'group'

class GroupMembershipConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'group.membership'
