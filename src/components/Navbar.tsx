import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-slate-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          zoooooooooooooooo
        </Link>

        <ul className="flex gap-4">
          <li>
            <Link to="/" className="hover:underline">
              bli
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:underline">
              blio
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
