import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserPlus, User, AtSign, Mail, Lock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "../hooks/useAuth";
import Loading from "../components/Loading";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true); // Trigger the LoadingScreen

    try {
      await register(formData);
      // We keep loading true while navigating for a seamless transition
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
      setLoading(false); // Only stop loading if there is an error
    }
  };

  return (
    <div className="pt-[4rem] flex overflow-hidden bg-white font-light min-h-screen">
      
      {/* FULL SCREEN LOADING OVERLAY */}
      {loading && <Loading/>}

      {/* LEFT BRAND SECTION */}
      <div className="hidden lg:flex w-1/2 items-center justify-center bg-white relative border-r border-gray-100">
        <div
          className="absolute inset-0 
          bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),
              linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)]
          bg-[size:40px_40px] opacity-[0.25]"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/60 via-white to-transparent" />

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center px-6"
        >
          <div className="w-20 h-20 bg-blue-600 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-blue-200">
             <UserPlus className="w-10 h-10 text-white" strokeWidth={1.5} />
          </div>
          <h1 className="text-5xl font-light tracking-tighter text-gray-900 leading-tight">
            Join <span className="text-blue-600 font-medium">PromptVault</span>
          </h1>
          <p className="mt-4 text-gray-500 text-lg max-w-xs mx-auto font-light leading-relaxed">
            Create once. Reuse forever. Build your personal library of AI logic.
          </p>
        </motion.div>
      </div>

      {/* RIGHT REGISTER CARD */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-8 relative bg-[#FCFCFD] overflow-y-auto">
        <div className="lg:hidden absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.15]" />
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md relative z-10 py-12"
        >
          <div className="text-center mb-10">
            <h2 className="text-4xl font-light text-gray-900 tracking-tight mb-3">
              Create account
            </h2>
            <p className="text-gray-600 font-light text-lg">
              It only takes a minute to get started.
            </p>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6 text-sm text-rose-700 bg-rose-50 border border-rose-200 px-4 py-3 rounded-2xl text-center font-medium"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-[0.2em] ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={18} strokeWidth={1.5} />
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Akash Chandra"
                  className="w-full pl-14 pr-6 py-3.5 rounded-[1.5rem] border border-gray-200 bg-white shadow-sm focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-500/5 outline-none transition-all font-normal text-gray-900 placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Username */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-[0.2em] ml-1">Username</label>
              <div className="relative">
                <AtSign className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={18} strokeWidth={1.5} />
                <input
                  type="text"
                  name="username"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="akash_chandra"
                  className="w-full pl-14 pr-6 py-3.5 rounded-[1.5rem] border border-gray-200 bg-white shadow-sm focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-500/5 outline-none transition-all font-normal text-gray-900 placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-[0.2em] ml-1">Email address</label>
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={18} strokeWidth={1.5} />
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className="w-full pl-14 pr-6 py-3.5 rounded-[1.5rem] border border-gray-200 bg-white shadow-sm focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-500/5 outline-none transition-all font-normal text-gray-900 placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-[0.2em] ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={18} strokeWidth={1.5} />
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••••••"
                  className="w-full pl-14 pr-6 py-3.5 rounded-[1.5rem] border border-gray-200 bg-white shadow-sm focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-500/5 outline-none transition-all font-normal text-gray-900 placeholder:text-gray-400"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 mt-4 rounded-[1.5rem] bg-gray-900 text-white font-medium hover:bg-blue-600 shadow-xl shadow-gray-200 hover:shadow-blue-500/20 transition-all duration-300 flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              <span className="tracking-wide">Sign Up</span>
              <ArrowRight size={18} strokeWidth={1.5} />
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-8 font-light tracking-wide">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-semibold hover:underline decoration-2 underline-offset-4"
            >
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;