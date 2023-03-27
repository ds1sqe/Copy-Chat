import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { logoutUser } from "../../../dispatcher/auth";

export default function Logout() {
  const dispatch = useDispatch();
  logoutUser(dispatch);
  console.log("logout..");

  return <Navigate to="/" />;
}
