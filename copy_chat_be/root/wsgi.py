"""
WSGI config for copy_chat_be project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.1/howto/deployment/wsgi/
"""

import os

import socketio
from django.core.wsgi import get_wsgi_application
from realtime.realtime import sio

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "root.settings")

default_apps = get_wsgi_application()

application = socketio.WSGIApp(sio, default_apps)
