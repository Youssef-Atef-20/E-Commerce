import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white">
      <div>
        <p className="text-4xl font-bold bg-gradient-to-r from-yellow-400 via-red-500 to-orange-500 bg-clip-text text-transparent drop-shadow-[0_2px_1px_rgba(220,100,0,0.7)] hover:drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] transition-all duration-300">
          <Link to="/" className="">Hot Deals</Link>
        </p>
      </div>

      <ul className="md:flex space-x-8 text-gray-700 font-medium">
        <li><Link to="/" className="hover:text-black">Home</Link></li>
        <li><Link to="/contact" className="hover:text-black">Contact</Link></li>
        <li><Link to="/about" className="hover:text-black">About</Link></li>
        <li><Link to="/signup" className="hover:text-black">Sign Up</Link></li>
        <li><Link to="/login" className="hover:text-black">Login</Link></li>
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
