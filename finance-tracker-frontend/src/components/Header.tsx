import { type FC } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { FaBtc, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../hooks/useAuth";
import { removeTokenFromStorage } from "../helpers/localstorage.helper";
import { useAppDispatch } from "../store/hooks";
import { logout } from "../store/user/userSlice";
import { toast } from "react-toastify";

export const Header: FC = () => {
  const isAuth = useAuth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isActiveLink = ({ isActive }: { isActive: boolean }) => {
    return isActive ? "text-white" : "text-white/50";
  };

  const logOutHandler = () => {
    removeTokenFromStorage();
    dispatch(logout());
    toast.success("Succesfully logged out!");
    navigate("/");
  };

  return (
    <header className="flex items-center p-4 shadow-sm bg-slate-800 backdrop-blur-sm">
      <Link to="/">
        <FaBtc size={20} />
      </Link>

      {isAuth && (
        <nav className="ml-auto mr-10">
          <ul className="flex items-center gap-5">
            <li>
              <NavLink to={"/"} className={isActiveLink}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to={"categories"} className={isActiveLink}>
                Categories
              </NavLink>
            </li>
            <li>
              <NavLink to={"transactions"} className={isActiveLink}>
                Transactions
              </NavLink>
            </li>
          </ul>
        </nav>
      )}

      {isAuth ? (
        <button className="btn btn-red" onClick={logOutHandler}>
          <span>Log out</span>
          <FaSignOutAlt />
        </button>
      ) : (
        <Link to={"/auth"} className="py-2 hover:text-white/50 ml-auto">
          <span>Log in | Sign up</span>
        </Link>
      )}
    </header>
  );
};
