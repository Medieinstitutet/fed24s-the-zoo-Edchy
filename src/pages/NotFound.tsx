import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="text-center py-10">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <h2 className="text-2xl mb-4">Page Not Found</h2>
      <p className="mb-6">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="bg-blue-500 text-white px-4 py-2 rounded-md">
        Go back to home page
      </Link>
    </div>
  );
};

export default NotFound;
