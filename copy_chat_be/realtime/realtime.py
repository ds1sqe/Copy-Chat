import socketio
from root import settings

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
    print(repr(sid), repr(environ), repr(auth))


@sio.event
def message(sid, environ, auth):
    print(repr(sid), repr(environ), repr(auth))


@sio.event
def disconnect(sid, environ, auth):
    print(repr(sid), repr(environ), repr(auth))


@sio.on("*")
def fallback(sid, environ, data):
    print(repr(sid), repr(environ), repr(data))
