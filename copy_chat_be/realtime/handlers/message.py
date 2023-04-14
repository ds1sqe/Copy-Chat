from data.message.models import Message
from data.message.serializers import MessageSerializer
from socketio import Server


class MessageHandlers:
    sio: Server

    def __init__(self, sio: Server):
        self.sio = sio

    def message_create(self, sid, data):
        print(f"sio:message.create>sid:{repr(sid)} \n> received data: {repr(data)}")

        # check he's in
        ss = self.sio.get_session(sid)
        try:
            gid, cid, text = data["gid"], data["cid"], data["text"]
            if (gid, cid) == ss["current_in"]:
                if len(text):
                    m = Message.objects.create(
                        group_id=gid,
                        channel_id=cid,
                        account_id=ss["account"].id,
                        text=text,
                    )
                    self.sio.emit(
                        "message.new", room=f"cid.{cid}", data=MessageSerializer(m).data
                    )
                else:
                    self.sio.send(f"error: invalid data ", to=sid)
            else:
                self.sio.send(f"error: invalid data ", to=sid)

        except KeyError:
            print(f"> error: invalid data")
            self.sio.send(f"error: invalid data ", to=sid)
