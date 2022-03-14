import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="w-full mb-10 text-center p-7 bg-gradient-to-b from-purple-400 to-red-500">
      <nav>
        <Link to="/" className="text-6xl text-white hover:text-gray-200">
          Home
        </Link>
        <Link to="/about">About</Link>
      </nav>
    </header>
  );
}

export default Header;
