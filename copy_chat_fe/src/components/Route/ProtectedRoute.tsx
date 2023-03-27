import { useSelector } from "react-redux";
import { Navigate, Route, RouteProps } from "react-router-dom";

export default function ProtectedRoute(props: RouteProps) {
  const user = useSelector((s: Store.AppState) => s.auth.user);
  if (!user) return <Navigate to={`/login/`} />;
  return <Route {...props} />;
}
