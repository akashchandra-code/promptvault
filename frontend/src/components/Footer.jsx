import { Linkedin, Instagram } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 font-light">
      <div className="max-w-7xl mx-auto md:px-0 px-[1.9rem] lg:px-[3rem] py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-20">

          {/* Brand */}
          <div>
            <h2 className="text-2xl font-light tracking-tighter text-gray-900">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-normal">
                Prompt
              </span>
              Vault
            </h2>
            <p className="mt-4 text-gray-500 text-sm leading-relaxed">
              Store, organize, and enhance your AI prompts in one powerful vault.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-gray-900 font-normal text-sm uppercase tracking-[0.15em] mb-6">
              Links
            </h3>
            <ul className="space-y-3 text-gray-600 text-sm">
              <li>
                <Link to="/" className="hover:text-blue-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-blue-600 transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/explore" className="hover:text-blue-600 transition-colors">
                  Explore
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-blue-600 transition-colors">
                  Sign In
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-gray-900 font-normal text-sm uppercase tracking-[0.15em] mb-6">
              Resources
            </h3>
            <ul className="space-y-3 text-gray-600 text-sm">
              <li>
                <Link
                  to="/privacy-policy"
                  className="hover:text-blue-600 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <a
                  href="mailto:akashchandra6280@gmail.com"
                  className="hover:text-blue-600 transition-colors"
                >
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-gray-900 font-normal text-sm uppercase tracking-[0.15em] mb-6">
              Connect
            </h3>
            <div className="flex gap-4">
              <a
                href="https://www.linkedin.com/in/akash-chandra-106a33341/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-gray-50 text-gray-700 hover:bg-blue-600 hover:text-white transition-all duration-300"
              >
                <Linkedin size={18} strokeWidth={1.5} />
              </a>
              <a
                href="https://www.instagram.com/akash._.io/?next=%2F"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-gray-50 text-gray-700 hover:bg-pink-500 hover:text-white transition-all duration-300"
              >
                <Instagram size={18} strokeWidth={1.5} />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4 text-[13px] text-gray-400">
          <p>© {new Date().getFullYear()} PromptVault. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
