import { useAppSelector } from "../store/hooks"
import { selectIsAuth } from "../store/user/userSlice";

export const useAuth = (): boolean => {
  const isAuth = useAppSelector(selectIsAuth)

  return isAuth;
}