from account.models import Account
from rest_framework_simplejwt.tokens import TokenError
from socketio import Server
from tools.auth import AuthHelper


class AuthHandlers:
    sio: Server

    def __init__(self, sio: Server):
        self.sio = sio

    def meta_auth_init(self, sid, data):
        print(f"sio:meta.auth.init>sid:{repr(sid)} \n> received data: {repr(data)}")
        try:
            account, _ = AuthHelper.find_user_by_access_token(data.get("token"))
            print("> authorized with ", repr(account))
            self.sio.save_session(sid, {"authorized": True, "account": account})
            print("> save session with ", repr(self.sio.get_session(sid)))
            self.sio.emit(
                "meta.auth.success",
                to=sid,
                data={"msg": f"authorized with sid:{sid} account id:{account.id}"},
            )

        except TokenError as e:
            print("sio:meta.auth>authorization error with sid", sid)
            self.sio.send(e, to=sid)
        except Account.DoesNotExist as e:
            print("sio:meta.auth>authorization error with sid", sid)
            self.sio.send(e, to=sid)

    def meta_auth_enlist(self, sid):
        print(f"sio:meta.auth.enlist>sid:{repr(sid)}")
        ss = self.sio.get_session(sid)
        if not ss["authorized"]:
            print(f"> failed: not authorized")
        else:
            account: Account = ss["account"]
            __groups = {}
            for group in account.joined_groups.all():
                self.sio.enter_room(sid, f"gid.{group.id}")
                __channels = []
                for channel in group.channels.all():
                    self.sio.enter_room(sid, f"cid.{channel.id}")
                    __channels.append(channel.id)
                __groups[group.id] = __channels
            ss["entered_to"] = __groups
            self.sio.save_session(sid, ss)
