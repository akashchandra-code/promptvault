import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const Loading = () => {
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-white/80 backdrop-blur-md font-light">
      {/* THE GRID BACKGROUND (Consistent with your theme) */}
      <div
        className="absolute inset-0 
        bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] 
        bg-[size:40px_40px] opacity-[0.2]"
      />

      <div className="relative flex flex-col items-center">
        {/* ANIMATED ORBIT */}
        <div className="relative w-24 h-24 mb-8">
          {/* Inner Static Pulse */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 rounded-full bg-blue-100/50"
          />

          {/* Rotating Outer Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border-2 border-transparent border-t-blue-600 border-r-blue-600/20"
          />

          {/* Center Icon */}
          <div className="absolute inset-0 flex items-center justify-center text-blue-600">
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles size={32} strokeWidth={1.5} fill="rgba(37, 99, 235, 0.1)" />
            </motion.div>
          </div>
        </div>

        {/* LOADING TEXT */}
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xl tracking-tighter text-gray-900"
          >
            Prompt<span className="font-normal text-blue-600">Vault</span>
          </motion.h2>
          
          <div className="flex items-center gap-1 mt-2">
            <motion.p
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-medium"
            >
              Engineering Intelligence
            </motion.p>
          </div>
        </div>

        {/* PROGRESS BAR (Optional subtle line) */}
        <div className="mt-8 w-40 h-[1px] bg-gray-100 overflow-hidden relative">
          <motion.div
            animate={{ x: [-160, 160] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-transparent via-blue-500 to-transparent"
          />
        </div>
      </div>
    </div>
  );
};

export default Loading;