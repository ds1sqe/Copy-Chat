import socketio
from realtime.handlers.auth import AuthHandlers
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

auth_handler = AuthHandlers(sio)


@sio.event
def connect(sid, environ, auth):
    print(f"sio:connect>sid {repr(sid)} connected")
    sio.save_session(sid, {"authorized": False})


@sio.event
def message(sid, environ, auth):
    print("sio:message>", repr(sid), repr(environ), repr(auth))


sio.on("meta.auth.init", auth_handler.meta_auth_init)
sio.on("meta.auth.enlist", auth_handler.meta_auth_enlist)


@sio.event
def disconnect(sid, environ, auth):
    print("sio:disconnect>", repr(sid), repr(environ), repr(auth))


@sio.on("*")
def fallback(event, sid, data):
    print(
        f"sio:fallback>sid:{repr(sid)} \n> event:{event}\n> received data: {repr(data)}"
    )
    sio.send({"msg": f"{event} is not valid event"}, to=sid)
    try:
        print("> session info :", repr(sio.get_session(sid)))
        print("> rooms :", repr(sio.rooms(sid)))
    except KeyError as e:
        print("> err          :", repr(e))
