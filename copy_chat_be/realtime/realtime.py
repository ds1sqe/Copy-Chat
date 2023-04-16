import socketio
from realtime.handlers.message import MessageHandlers
from realtime.handlers.meta.auth import AuthHandlers
from realtime.handlers.meta.state import StateHandlers
from realtime.handlers.rtc import RtcHandlers
from root import settings

mgr = socketio.RedisManager(
    url="redis://" + settings.REDIS["host"] + ":" + settings.REDIS["port"]
)
sio = socketio.Server(
    client_manager=mgr,
    async_mode="eventlet",
    cors_allowed_origins=settings.CORS_ORIGIN_WHITELIST,
)

auth = AuthHandlers(sio)
state = StateHandlers(sio)
message_h = MessageHandlers(sio)
rtc = RtcHandlers(sio)


@sio.event
def connect(sid, environ, auth):
    print(f"sio:connect>sid {repr(sid)} connected")
    sio.save_session(sid, {"authorized": False})


@sio.event
def message(sid, environ, auth):
    print("sio:message>", repr(sid), repr(environ), repr(auth))


sio.on("meta.auth.init", auth.meta_auth_init)
sio.on("meta.auth.enlist", auth.meta_auth_enlist)
sio.on("meta.state.enter", state.meta_state_enter)

sio.on("message.create", message_h.message_create)

sio.on("rtc.join", rtc.rtc_join)
sio.on("rtc.sdp.offer", rtc.rtc_sdp_offer)
sio.on("rtc.sdp.answer", rtc.rtc_sdp_answer)
sio.on("rtc.ice.candidate", rtc.rtc_ice_candidate)


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
        print("> err :", repr(e))
