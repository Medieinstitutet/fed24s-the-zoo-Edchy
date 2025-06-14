import { useRouteError, Link } from "react-router-dom";

const ErrorBoundary = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="text-center py-10">
      <h1 className="text-2xl font-bold mb-4">Oops! Something went wrong</h1>
      <p className="mb-4">Sorry, an unexpected error has occurred.</p>
      <p className="text-gray-500 mb-6">
        {error instanceof Error ? error.message : "Unknown error"}
      </p>
      <Link to="/" className="bg-blue-500 text-white px-4 py-2 rounded-md">
        Go back to home page
      </Link>
    </div>
  );
};

export default ErrorBoundary;
