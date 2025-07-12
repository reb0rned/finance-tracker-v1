import { type FC } from "react";
import { useNavigate } from "react-router";

export const ErrorPage: FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-4 text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-2xl font-semibold mb-2">Page Not Found</p>
      <p className="text-gray-400 mb-6 max-w-md">
        Sorry, the page you're looking for doesn't exist or has been moved.
        Please check the URL or return to the homepage.
      </p>
      <button
        onClick={() => navigate("/")}
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 transition-colors rounded-lg text-white font-medium"
      >
        Go Back Home
      </button>
    </div>
  );
};
