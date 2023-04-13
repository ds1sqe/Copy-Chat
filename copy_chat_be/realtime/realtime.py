import socketio
from rest_framework_simplejwt.tokens import TokenError
from root import settings
from tools.auth import AuthHelper

mgr = socketio.RedisManager(
    url="redis://" + settings.REDIS["host"] + ":" + settings.REDIS["port"]
)
sio = socketio.Server(
    client_manager=mgr,
    async_mode="eventlet",
    cors_allowed_origins=settings.CORS_ORIGIN_WHITELIST,
)


@sio.event
def connect(sid, environ, auth):
    print("sio:connect>", repr(sid), repr(environ), repr(auth))
    sio.save_session(sid, {"authorized": False})


def meta_auth(sid, data):
    print("sio:meta.auth>", repr(sid), repr(data))
    try:
        AuthHelper.find_user_by_access_token(data.get("token"))
    except TokenError as e:
        print("sio:meta.auth>token error with sid", sid)
        sio.send(e, to=sid)


sio.on("meta.auth", meta_auth)


@sio.event
def message(sid, environ, auth):
    print("sio:message>", repr(sid), repr(environ), repr(auth))


@sio.event
def disconnect(sid, environ, auth):
    print("sio:disconnect>", repr(sid), repr(environ), repr(auth))


@sio.on("*")
def fallback(sid, environ, data):
    print("sio:fallback  >", repr(sid), repr(environ), repr(data))
