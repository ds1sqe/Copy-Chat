from socketio import Server


class RtcHandlers:
    sio: Server

    def __init__(self, sio: Server):
        self.sio = sio

    def rtc_join(self, sid, data):
        print(f"sio:rtc.join>sid:{repr(sid)} \n> received data: {repr(data)}")

        # check he's in
        ss = self.sio.get_session(sid)
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
                self.sio.emit(
                    "rtc.join",
                    room=f"rtc.{cid}",
                    data={"sender_id": ss["account"].id},
                    skip_sid=sid,
                )
                print(f">session info", ss)
                self.sio.save_session(sid, ss)
            else:
                self.sio.send(f"error: invalid data ", to=sid)

        except KeyError:
            print(f"> error: invalid data")
            self.sio.send(f"error: invalid data ", to=sid)

    def rtc_sdp_offer(self, sid, data):
        print(f"sio:rtc.sdp.offer>sid:{repr(sid)} \n> received data: {repr(data)}")
        ss = self.sio.get_session(sid)
        payload = ({"sender_id": ss["account"].id, "detail": data["detail"]},)
        self.sio.emit(
            "rtc.sdp.offer", room=ss.get("rtc_room"), data=payload, skip_sid=sid
        )

    def rtc_sdp_answer(self, sid, data):
        print(f"sio:rtc.sdp.answer>sid:{repr(sid)} \n> received data: {repr(data)}")
        ss = self.sio.get_session(sid)
        payload = ({"sender_id": ss["account"].id, "detail": data["detail"]},)
        self.sio.emit("rtc.sdp.answer", room=ss["rtc_room"], data=payload, skip_sid=sid)

    def rtc_ice_candidate(self, sid, data):
        print(f"sio:rtc.sdp.answer>sid:{repr(sid)} \n> received data: {repr(data)}")
        ss = self.sio.get_session(sid)
        self.sio.emit("rtc.ice.candidate", room=ss["rtc_room"], data=data, skip_sid=sid)
