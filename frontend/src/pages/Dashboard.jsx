import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Pencil, Trash2, Clock, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePrompt} from "../hooks/usePrompt";
import { useAuth } from "../hooks/useAuth";

const Dashboard = () => {
  const { myPrompts, getMyPrompts, deletePrompt, loading } = usePrompt();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  if (!user) {
    navigate("/login");
  }
  useEffect(() => {
    getMyPrompts();
  }, []);

  // Soft color palette for tags to match the light aesthetic
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

  return (
    <section className="relative min-h-screen bg-white overflow-hidden font-light">
      
      {/* THE GRID EFFECT (Exact Hero Match) */}
      <div
        className="absolute inset-0 
        bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),
            linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)]
        bg-[size:40px_40px] opacity-[0.25]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/40 via-white to-white" />

      <div className="relative max-w-6xl mx-auto pt-32 pb-20 px-6">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="space-y-2">
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-light tracking-tight text-gray-900"
            >
              Workspace
            </motion.h1>
            <p className="text-gray-500 text-lg font-light">
              Manage and refine your personal library of AI engineering tools.
            </p>
          </div>

          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/dashboard/create")}
            className="flex items-center gap-2 px-8 py-4 rounded-[1.5rem] bg-gray-900 text-white font-medium text-sm shadow-xl shadow-gray-200 hover:bg-blue-600 transition-all duration-300"
          >
            <Plus size={18} strokeWidth={1.5} />
            New Prompt
          </motion.button>
        </div>

        {/* CONTENT GRID */}
        {loading ? (
          <div className="flex flex-col items-center py-32">
            <div className="w-6 h-6 border-2 border-blue-600/10 border-t-blue-600 rounded-full animate-spin mb-4" />
            <p className="text-gray-400 text-sm tracking-widest uppercase font-medium">Syncing Workspace</p>
          </div>
        ) : myPrompts.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24 bg-white/40 backdrop-blur-sm rounded-[3rem] border border-dashed border-gray-200"
          >
            <p className="text-gray-400 font-light text-lg">Your workspace is currently empty.</p>
            <button 
              onClick={() => navigate("/dashboard/create")}
              className="mt-4 text-blue-600 font-medium hover:underline decoration-2 underline-offset-4"
            >
              Create your first prompt
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <AnimatePresence>
              {myPrompts.map((prompt, index) => (
                <motion.div
                  key={prompt._id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group bg-white/60 backdrop-blur-sm rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-gray-200/50 hover:border-blue-200 transition-all duration-500 overflow-hidden flex flex-col"
                >
                  <div className="p-8 flex-grow">
                    <div className="flex justify-between items-center mb-6">
                      <span className="flex items-center gap-1.5 text-[10px] font-medium text-gray-400 uppercase tracking-[0.2em]">
                        <Clock size={12} strokeWidth={1.5} /> Recent
                      </span>
                      <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                    </div>

                    <h3 className="text-2xl font-light text-gray-900 mb-5 leading-snug group-hover:text-blue-600 transition-colors">
                      {prompt.title}
                    </h3>

                    <div className="flex flex-wrap gap-2">
                      {prompt.tags?.map((tag, i) => {
                        const style = getTagStyle(tag);
                        return (
                          <span
                            key={i}
                            className={`text-[10px] font-medium uppercase tracking-wider px-3 py-1.5 rounded-xl border ${style.bg} ${style.text} ${style.border}`}
                          >
                            {tag}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  {/* ACTION BAR */}
                  <div className="px-8 py-5 bg-gray-50/30 border-t border-gray-50 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => navigate(`/dashboard/edit/${prompt._id}`)}
                        className="p-2.5 text-gray-400 hover:text-blue-600 hover:bg-white rounded-xl transition-all shadow-sm"
                        title="Edit Prompt"
                      >
                        <Pencil size={16} strokeWidth={1.5} />
                      </button>
                      <button
                        onClick={() => deletePrompt(prompt._id)}
                        className="p-2.5 text-gray-400 hover:text-rose-600 hover:bg-white rounded-xl transition-all shadow-sm"
                        title="Delete"
                      >
                        <Trash2 size={16} strokeWidth={1.5} />
                      </button>
                    </div>

                    <button
                      onClick={() => navigate(`/dashboard/edit/${prompt._id}`)}
                      className="flex items-center gap-1 text-[11px] font-medium uppercase tracking-widest text-blue-600 opacity-0 group-hover:opacity-100 transition-all"
                    >
                      Open <ChevronRight size={14} strokeWidth={2} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
};

export default Dashboard;