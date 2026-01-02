import { useEffect, useState } from "react";
import { Search, Sparkles, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePrompt } from "../hooks/usePrompt";
import PromptDetail from "../components/PromptDetail";

const Explore = () => {
  const { prompts, getAllPrompts, loading } = usePrompt();
  const [search, setSearch] = useState("");
  const [selectedPromptId, setSelectedPromptId] = useState(null);

  // 🔹 Refined Tag Styles: Using font-medium and softer background opacities
  const getTagStyle = (tag) => {
    const colors = [
      { bg: "bg-emerald-50/50", text: "text-emerald-600", border: "border-emerald-100" },
      { bg: "bg-blue-50/50", text: "text-blue-600", border: "border-blue-100" },
      { bg: "bg-violet-50/50", text: "text-violet-600", border: "border-violet-100" },
      { bg: "bg-amber-50/50", text: "text-amber-600", border: "border-amber-100" },
      { bg: "bg-rose-50/50", text: "text-rose-600", border: "border-rose-100" },
    ];
    const index = tag.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[index % colors.length];
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      getAllPrompts({ search });
    }, 400);
    return () => clearTimeout(delay);
  }, [search]);

  return (
    <section className="relative min-h-screen bg-white overflow-hidden font-light">
      {/* BACKGROUND ELEMENTS */}
      <div
        className="absolute inset-0 
        bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),
            linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)]
        bg-[size:40px_40px] opacity-[0.25]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/40 via-white to-white" />

      <div className="relative max-w-7xl mx-auto px-6 pt-32 pb-20">
        
        {/* HEADER SECTION */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 
            text-[11px] font-medium tracking-[0.1em] text-blue-600 bg-blue-50 border border-blue-100 rounded-full uppercase"
          >
            <Sparkles size={14} strokeWidth={1.5} /> Community Library
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-light tracking-tight text-gray-900 mb-6"
          >
            Explore <span className="text-blue-600">Public Prompts</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-lg md:text-xl font-light max-w-2xl mx-auto"
          >
            Discover and reuse high-quality prompts to supercharge your AI workflow.
          </motion.p>
        </div>

        {/* SEARCH BAR */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-20 max-w-2xl mx-auto relative group"
        >
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors w-5 h-5" strokeWidth={1.5} />
          <input
            type="text"
            placeholder="Search prompt inspirations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full pl-16 pr-6 py-5 rounded-[2rem]
              border border-gray-200 bg-white/60 backdrop-blur-md
              shadow-xl shadow-gray-200/20 focus:shadow-blue-500/5
              focus:ring-0 focus:border-blue-400
              outline-none transition-all text-gray-600 font-light text-lg
            "
          />
        </motion.div>

        {/* CONTENT GRID */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="w-6 h-6 border-2 border-blue-600/10 border-t-blue-600 rounded-full animate-spin mb-4" />
            <p className="text-gray-400 font-light tracking-wide">Syncing Library...</p>
          </div>
        ) : prompts.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="text-gray-400 font-light text-center py-24 bg-gray-50/30 rounded-[3rem] border border-dashed border-gray-200"
          >
            No matches found for your search.
          </motion.div>
        ) : (
          <motion.div
            layout
            className={`
              grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10
              ${selectedPromptId ? "blur-md pointer-events-none opacity-40" : ""}
              transition-all duration-700
            `}
          >
            <AnimatePresence mode="popLayout">
              {prompts.map((prompt, index) => (
                <motion.div
                  layout
                  key={prompt._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setSelectedPromptId(prompt._id)}
                  className="
                    group cursor-pointer relative
                    rounded-[2.5rem] border border-gray-200
                    bg-white/50 backdrop-blur-sm p-8 shadow-sm
                    hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-500/5
                    hover:-translate-y-1.5 transition-all duration-500
                  "
                >
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-4">
                       <h3 className="text-2xl font-light text-gray-900 group-hover:text-blue-600 transition-colors leading-tight">
                        {prompt.title}
                      </h3>
                      <ArrowUpRight size={20} className="text-gray-300 group-hover:text-blue-400 transition-colors" strokeWidth={1} />
                    </div>
                    
                    <div className="flex flex-wrap gap-2.5">
                      {prompt.tags.map((tag, i) => {
                        const style = getTagStyle(tag);
                        return (
                          <span
                            key={i}
                            className={`
                              text-[10px] uppercase tracking-[0.1em] font-medium
                              px-3.5 py-1.5 rounded-xl border
                              ${style.bg} ${style.text} ${style.border}
                              transition-all
                            `}
                          >
                            {tag}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  {/* Visual Footer */}
                  <div className="mt-8 pt-6 border-t border-gray-50 flex items-center justify-between">
                    <span className="text-[10px] font-medium text-gray-800 uppercase tracking-widest">Public Asset</span>
                    <span className="text-[10px] font-medium text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      View Details
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* MODAL */}
        <AnimatePresence>
          {selectedPromptId && (
            <PromptDetail
              promptId={selectedPromptId}
              onClose={() => setSelectedPromptId(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Explore;