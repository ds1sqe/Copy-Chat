from django.apps import AppConfig


class FileConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'data.file'

class MessageConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'data.message'

class EventConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'data.meta.event'

class InvitationConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'data.meta.invitation'

class CounterConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'data.meta.readcounter'
