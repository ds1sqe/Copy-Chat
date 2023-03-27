import { BrowserRouter, Route, Routes } from "react-router-dom";
//import ProtectedRoute from "./components/Route/ProtectedRoute";

import Landing from "./pages/Landing/Landing";
import ForgetPassword from "./pages/Landing/SubMenu/ForgetPassword";
import Login from "./pages/Landing/SubMenu/Login";
import Logout from "./pages/Landing/SubMenu/Logout";
import Register from "./pages/Landing/SubMenu/Register";

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Landing} />
          <Route path="/login/" Component={Login} />
          <Route path="/logout/" Component={Logout} />
          <Route path="/register/" Component={Register} />
          <Route path="/forgot-password/" Component={ForgetPassword} />

          {/* <ProtectedRoute path="" /> */}
          {/* <ProtectedRoute path="" /> */}
          {/* <ProtectedRoute path="" /> */}
          {/* <ProtectedRoute path="" /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}
