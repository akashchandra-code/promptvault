import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Sparkles } from "lucide-react";

const CTASection = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate(user ? "/dashboard" : "/login");
  };

  return (
    <section className="w-full pt-25 pb-20 bg-white text-center relative overflow-hidden font-light">
      {/* Decorative Sparkles */}
      <motion.div
        className="absolute top-10 left-10 text-blue-100/50"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
      >
        <Sparkles className="w-24 h-24" strokeWidth={1} />
      </motion.div>

      <motion.div
        className="absolute bottom-10 right-10 text-indigo-100/50"
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 80, ease: "linear" }}
      >
        <Sparkles className="w-32 h-32" strokeWidth={1} />
      </motion.div>

      <div className="relative max-w-4xl mx-auto px-4">
        {/* Heading */}
        <motion.h2
          className="text-4xl md:text-5xl lg:text-6xl font-light mb-6 leading-tight text-gray-900 tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Take Your{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 font-normal">
            Prompts
          </span>{" "}
          to the Next Level
        </motion.h2>

        {/* Subtext */}
        <motion.p
          className="text-lg md:text-xl mb-12 text-gray-500 max-w-3xl mx-auto font-light leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Organize, refine, and unlock the full potential of your AI prompts with
          PromptVault — trusted by creators and developers worldwide.
        </motion.p>

        {/* CTA Button */}
        <motion.button
          onClick={handleGetStarted}
          className="px-12 py-4 rounded-xl font-normal text-lg 
          bg-gradient-to-r from-blue-600 to-indigo-600 
          text-white shadow-lg hover:shadow-xl hover:scale-105 
          transition-all duration-300 tracking-wide"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Get Started
        </motion.button>

        {/* Info Cards */}
        <div className="mt-12 flex flex-wrap justify-center gap-6">
          <div className="bg-blue-50/50 text-blue-700 px-6 py-3 rounded-lg text-sm md:text-base font-light border border-blue-100">
            🔒 <span className="ml-1">Secure & Encrypted</span>
          </div>
          <div className="bg-indigo-50/50 text-indigo-700 px-6 py-3 rounded-lg text-sm md:text-base font-light border border-indigo-100">
            ⚡ <span className="ml-1">Lightning Fast Access</span>
          </div>
          <div className="bg-blue-50/50 text-blue-700 px-6 py-3 rounded-lg text-sm md:text-base font-light border border-blue-100">
            🌐 <span className="ml-1">Access Anywhere</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;