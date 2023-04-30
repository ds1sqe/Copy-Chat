from account.models import Account
from asgiref.sync import sync_to_async
from group.models import Group
from rest_framework_simplejwt.tokens import TokenError
from socketio import Server
from tools.auth import AuthHelper


class AuthHandlers:
    sio: Server

    def __init__(self, sio: Server):
        self.sio = sio

    @sync_to_async
    def __find_user(self, token: str):
        return AuthHelper.find_user_by_access_token(token)

    @sync_to_async
    def __enlist(self, sid, account: Account):
        __groups = {}
        for group in account.joined_groups.all():
            self.sio.enter_room(sid, f"gid.{group.id}")
            __channels = []
            for channel in group.channels.all():
                self.sio.enter_room(sid, f"cid.{channel.id}")
                __channels.append(channel.id)
            __groups[group.id] = __channels
        return __groups

    async def meta_auth_init(self, sid, data):
        print(f"sio:meta.auth.init>sid:{repr(sid)} \n> received data: {repr(data)}")
        try:
            account, _ = await self.__find_user(data.get("token"))
            print("> authorized with ", repr(account))
            await self.sio.save_session(sid, {"authorized": True, "account": account})
            print("> save session with ", repr(await self.sio.get_session(sid)))
            await self.sio.emit(
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

    async def meta_auth_enlist(self, sid):
        print(f"sio:meta.auth.enlist>sid:{repr(sid)}")
        ss = await self.sio.get_session(sid)
        if not ss["authorized"]:
            print(f"> failed: not authorized")
        else:
            account: Account = ss["account"]
            __groups = await self.__enlist(sid, account)
            ss["entered_to"] = __groups
            await self.sio.save_session(sid, ss)
