from account.models import Account
from rest_framework_simplejwt.tokens import TokenError
from socketio import Server
from tools.auth import AuthHelper


class StateHandlers:
    sio: Server

    def __init__(self, sio: Server):
        self.sio = sio

    def meta_state_enter(self, sid, data):
        print(f"sio:meta.state.enter>sid:{repr(sid)} \n> received data: {repr(data)}")
        ss = self.sio.get_session(sid)
        try:
            gid, cid = data["gid"], data["cid"]
            if cid in ss["entered_to"][gid]:
                ss["current_in"] = (gid, cid)
                self.sio.save_session(sid, ss)

        except KeyError:
            print(f"> error: invalid data")
            self.sio.send(f"error: invalid data ", to=sid)
