import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Menu, X } from "lucide-react"; // Added for cleaner light icons

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    setMenuOpen(false);
    navigate("/login");
  };

  const navLinkClass = ({ isActive }) =>
    `transition-colors duration-300 font-light tracking-wide ${
      isActive ? "text-blue-600 font-normal" : "text-gray-500"
    } hover:text-blue-600`;

  return (
    <nav
      className="
        fixed top-0 w-full z-50 px-[0.8rem] lg:px-[3rem] py-4 md:py-5
        backdrop-blur-xl bg-white/70
        border-b border-gray-100
      "
    >
      <div className="flex items-center justify-between md:px-13 px-4 py-1">
        
        {/* Logo */}
        <NavLink
          to="/"
          className="text-2xl font-light tracking-tighter text-gray-900"
        >
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-normal">
            Prompt
          </span>
          Vault
        </NavLink>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10 text-[13px] uppercase tracking-[0.15em]">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/dashboard" className={navLinkClass}>
            Dashboard
          </NavLink>
          <NavLink to="/explore" className={navLinkClass}>
            Explore
          </NavLink>

          {user ? (
            <button
              onClick={handleLogout}
              className="
                ml-4 px-5 py-2 rounded-full
                text-[12px] font-normal uppercase tracking-widest
                text-rose-500 border border-rose-100
                hover:bg-rose-50 transition-all duration-300
              "
            >
              Logout
            </button>
          ) : (
            <NavLink
              to="/login"
              className="
                ml-4 px-6 py-2.5 rounded-full
                text-[12px] font-normal uppercase tracking-widest
                bg-gray-900 text-white
                hover:bg-blue-600 transition-all duration-300 shadow-lg shadow-gray-200
              "
            >
              Sign In
            </NavLink>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-0 right-0 h-screen w-full
          bg-white/98 backdrop-blur-2xl
          transform transition-transform duration-500 ease-in-out
          ${menuOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-50">
          <h2 className="text-xl font-light tracking-tighter">
            <span className="text-blue-600 font-normal">Prompt</span>Vault
          </h2>
          <button
            className="p-2"
            onClick={() => setMenuOpen(false)}
          >
            <X size={26} strokeWidth={1.5} />
          </button>
        </div>

        <div className="flex flex-col gap-8 px-10 py-12 text-lg font-light tracking-loose text-gray-800">
          <NavLink to="/" onClick={() => setMenuOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/dashboard" onClick={() => setMenuOpen(false)}>
            Dashboard
          </NavLink>
          <NavLink to="/explore" onClick={() => setMenuOpen(false)}>
            Explore
          </NavLink>

          <div className="pt-8 border-t border-gray-50">
            {user ? (
              <button
                onClick={handleLogout}
                className="
                  w-full py-4 rounded-xl
                  text-rose-600 border border-rose-100 font-normal
                "
              >
                Logout
              </button>
            ) : (
              <NavLink
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="
                  block w-full py-4 rounded-xl text-center
                  bg-gray-900 text-white font-normal
                "
              >
                Sign In
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;