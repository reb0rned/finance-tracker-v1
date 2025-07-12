import { type FC } from "react";
import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const isLoggedIn = useAuth();

  return isLoggedIn ? (
    <>{children}</>
  ) : (
    <div className="flex flex-col items-center justify-center mt-40 bg-slate-900 text-white">
      <h2 className="text-2xl font-semibold mb-4">Access Denied</h2>
      <p className="mb-6 text-gray-400">
        You must be logged in to view this page.
      </p>
      <Link
        to={"/auth"}
        replace
        className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Go to Login
      </Link>
    </div>
  );
};
