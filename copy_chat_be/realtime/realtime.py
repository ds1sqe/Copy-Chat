import redis
import socketio

sio = socketio.Server(async_mode="eventlet")

sio.on("connect")


sio.on("disconnect")
