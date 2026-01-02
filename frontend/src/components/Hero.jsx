import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Hero = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate(user ? "/dashboard" : "/login");
  };

  return (
    <section className="relative overflow-hidden bg-white font-light">
      
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 
        bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] 
        bg-[size:40px_40px] opacity-[0.25]"
      />

      {/* Soft gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/60 via-white to-white" />

      <div className="relative max-w-4xl mx-auto px-4 py-32 text-center">
        
        {/* Small badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 
          text-sm font-light tracking-wide text-blue-600 bg-blue-100 rounded-full"
        >
          ✨ Organize AI Prompts Smarter
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-gray-900"
        >
          Your best prompts deserve a{" "}
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-normal">
            better home
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 text-lg md:text-xl text-gray-500 max-w-2xl mx-auto font-light leading-relaxed"
        >
          Save, refine, and reuse AI prompts that actually work.
          Built for developers, creators, and builders.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-10 flex justify-center"
        >
          <button
            onClick={handleGetStarted}
            className="px-9 py-3.5 rounded-lg 
            bg-blue-600 text-white text-lg font-light tracking-wide
            hover:bg-blue-700 transition shadow-sm"
          >
            Get Started
          </button>
        </motion.div>

        {/* Secondary text */}
        <p className="mt-4 text-sm text-gray-400 font-light">
          Free to use • No credit card required
        </p>
      </div>
    </section>
  );
};

export default Hero;