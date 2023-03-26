import { useSelector } from "react-redux";
import Landing from "./pages/Landing/Landing";

export default function App() {
  const user = useSelector((s: Store.AppState) => s.auth.user);

  return (
    <div className="App">
      {!user ? (
        <>
          <Landing />
        </>
      ) : (
        <>
          {/* <Main */}
          {/*   user={user} */}
          {/*   setUser={setUser} */}
          {/*   getToken={getToken} */}
          {/*   setToken={setToken} */}
          {/* /> */}
        </>
      )}
    </div>
  );
}
