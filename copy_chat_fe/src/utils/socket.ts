import { io } from "socket.io-client";
import { getHeaders } from "./token";

const socket = io(String(process.env.REACT_APP_WS_DOMAIN), {
  auth: getHeaders(),
});

export default socket;