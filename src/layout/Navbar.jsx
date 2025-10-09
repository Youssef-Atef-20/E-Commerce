import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white">
      <div>
        <Link to="/" className="text-2xl font-bold">
          Exclusive
        </Link>
      </div>

      <ul className="hidden md:flex space-x-8 text-gray-700 font-medium">
        <li><Link to="/" className="hover:text-black">Home</Link></li>
        <li><Link to="/contact" className="hover:text-black">Contact</Link></li>
        <li><Link to="/about" className="hover:text-black">About</Link></li>
        <li><Link to="/signup" className="hover:text-black">Sign Up</Link></li>
      </ul>

      <div className="flex items-center space-x-4">
        <form className="hidden md:flex items-center bg-gray-100 rounded-md px-3 py-1">
          <input
            type="text"
            placeholder="What are you looking for?"
            className="bg-gray-100 focus:outline-none text-sm w-48"
          />
          <button type="submit" className="text-gray-600">🔍</button>
        </form>

        <Link to="/wishlist" className="text-gray-700 hover:text-black">❤️</Link>
        <Link to="/cart" className="text-gray-700 hover:text-black">🛒</Link>
      </div>
    </nav>
  );
};

export default Navbar;
