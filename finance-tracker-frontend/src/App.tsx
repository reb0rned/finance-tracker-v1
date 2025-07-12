import { RouterProvider } from "react-router";
import { router } from "./Router/router";
import { getTokenFromStorage } from "./helpers/localstorage.helper";
import { useAppDispatch } from "./store/hooks";
import { login, logout } from "./store/user/userSlice";
import { AuthService } from "./services/auth.service";
import { useEffect } from "react";

function App() {
  const dispatch = useAppDispatch();

  const checkAuth = async () => {
    try {
      const token = getTokenFromStorage();

      if (token) {
        const data = await AuthService.getMe();

        if (data) {
          dispatch(login(data));
        } else {
          dispatch(logout());
        }
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
