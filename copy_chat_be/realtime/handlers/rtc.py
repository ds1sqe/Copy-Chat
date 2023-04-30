from socketio import Server


class RtcHandlers:
    sio: Server

    def __init__(self, sio: Server):
        self.sio = sio

    async def rtc_join(self, sid, data):
        print(f"sio:rtc.join>sid:{repr(sid)} \n> received data: {repr(data)}")

        # check he's in
        ss = await self.sio.get_session(sid)
        try:
            (
                gid,
                cid,
            ) = (
                data["gid"],
                data["cid"],
            )
            if (gid, cid) == ss["current_in"]:
                self.sio.enter_room(sid, room=f"rtc.{cid}")
                ss["rtc_room"] = f"rtc.{cid}"
                await self.sio.emit(
                    "rtc.join",
                    room=f"rtc.{cid}",
                    data={"sender_id": ss["account"].id, "sid": sid},
                    skip_sid=sid,
                )
                print(f">session info", ss)
                await self.sio.save_session(sid, ss)
            else:
                await self.sio.send(f"error: invalid data ", to=sid)

        except KeyError:
            print(f"> error: invalid data")
            await self.sio.send(f"error: invalid data ", to=sid)

    async def rtc_sdp_packet(self, sid, data):
        print(f"sio:rtc.sdp.packet>sid:{repr(sid)} \n> received data: {repr(data)}")
        ss = await self.sio.get_session(sid)
        payload = (
            {
                "sender_id": ss["account"].id,
                "sender_sid": sid,
                "target_sid": data["target_sid"],
                "target_id": data["target_id"],
                "packet": data["packet"],
            },
        )
        await self.sio.emit(
            "rtc.sdp.packet",
            room=ss.get("rtc_room"),
            data=payload,
            to=data["target_sid"],
            skip_sid=sid,
        )
