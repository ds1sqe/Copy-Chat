import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { Store } from "../../types/store";

export default function ProtectedRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const logined = useSelector((s: Store.AppState) => s.auth.logined);
  const location = useLocation();
  if (!logined) return <Navigate to={`/login/`} state={{ from: location }} />;
  return children;
}
