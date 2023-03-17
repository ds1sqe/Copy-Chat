from django.db import models
from account.models import Account

class Event(models.Model):
    """
    Store event data to announce group members
    """
    STARTCALL      = 'STT'
    ENDCALL        = 'END'
    INVITE         = 'INV'
    KICK           = 'KIC'
    CHANGE_ROLL    = 'CNG'
    JOIN_GROUP     = 'JOG'
    EXIT_GROUP     = 'EXG'

    EVENTS =[
        (STARTCALL,       'start of call'),
        (ENDCALL,         'call ended'),
        (INVITE,          'invited'),
        (KICK,            'kicked'),
        (CHANGE_ROLL,     'change roll'),
        (EXIT_GROUP,      'exit group'),
        (JOIN_GROUP,      'joined group'),
    ]

    event=models.CharField(max_length=3,choices=EVENTS)
    target = models.ForeignKey(Account, on_delete=models.CASCADE, null=True, blank=True)
