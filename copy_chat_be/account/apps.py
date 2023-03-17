from django.apps import AppConfig


class AccountConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'account'

class ProfileConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'account.profile'

class RelationConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'account.relation'

class StateConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'account.state'
