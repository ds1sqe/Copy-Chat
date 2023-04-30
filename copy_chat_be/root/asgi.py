"""
ASGI config for Copy-Chat's BackEnd project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.1/howto/deployment/asgi/
"""

import os

import socketio
from django.core.asgi import get_asgi_application
from realtime.realtime import sio as realtime_apps

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "root.settings")
main_apps = get_asgi_application()
application = socketio.ASGIApp(realtime_apps, main_apps)
