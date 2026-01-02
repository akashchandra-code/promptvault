import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Save, Globe, Lock, Info, Trash2, ChevronDown } from "lucide-react";
import { usePrompt } from "../hooks/usePrompt";

const categories = [
  "Marketing", "Social Media", "Coding", "Email", "Education", 
  "Design", "Personal", "Business", "Medical", "Other",
];

const EditPrompt = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getPromptById, updatePrompt, deletePrompt } = usePrompt();

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Other",
    type: "public",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPrompt = async () => {
      try {
        const data = await getPromptById(id);
        setForm({
          title: data.title || "",
          description: data.description || "",
          category: data.category || "Other",
          type: data.type || "public",
        });
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    loadPrompt();
  }, [id]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updatePrompt(id, form);
    navigate("/dashboard");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-6 h-6 border-2 border-blue-100 border-t-blue-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <section className="relative min-h-screen bg-white overflow-hidden font-light">
      {/* Background Synergy */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.25]" />
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/40 via-white to-white" />

      <div className="relative pt-32 pb-20 max-w-2xl mx-auto px-6">
        
        {/* TOP BAR */}
        <div className="flex justify-between items-center mb-8">
          <button 
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 text-gray-400 hover:text-blue-600 transition-all group"
          >
            <ArrowLeft size={18} strokeWidth={1.5} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium tracking-wide">Cancel Changes</span>
          </button>
        </div>

        {/* HEADER */}
        <div className="mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50/50 border border-amber-100 text-amber-600 text-[10px] font-medium uppercase tracking-[0.2em] mb-6"
          >
            <Info size={14} strokeWidth={1.5} /> Editing Mode
          </motion.div>
          <h1 className="text-5xl font-light text-gray-900 tracking-tight leading-tight">
            Refine <span className="text-blue-600">Prompt</span>
          </h1>
        </div>

        {/* FORM CARD */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/70 backdrop-blur-xl rounded-[2.5rem] border border-gray-200 shadow-2xl shadow-gray-200/50 overflow-hidden"
        >
          <form onSubmit={handleSubmit} className="p-10 space-y-8">
            
            {/* TITLE */}
            <div className="space-y-3">
              <label className="text-[11px] font-medium text-gray-400 uppercase tracking-widest ml-1">Title</label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                className="w-full px-6 py-4 bg-gray-50/50 border border-gray-200 rounded-[1.5rem] focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-500/5 outline-none transition-all text-xl font-light text-gray-800"
              />
            </div>

            {/* DESCRIPTION */}
            <div className="space-y-3">
              <label className="text-[11px] font-medium text-gray-400 uppercase tracking-widest ml-1">Content</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                required
                rows={8}
                className="w-full px-6 py-5 bg-gray-50/50 border border-gray-200 rounded-[1.5rem] focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-500/5 outline-none transition-all resize-none font-mono text-sm font-light leading-relaxed text-gray-700"
              />
            </div>

            {/* CONFIG ROW */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-[11px] font-medium text-gray-400 uppercase tracking-widest ml-1">Category</label>
                <div className="relative">
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full px-6 py-4 bg-gray-50/50 border border-gray-200 rounded-[1.5rem] focus:bg-white focus:border-blue-400 outline-none transition-all cursor-pointer appearance-none font-light text-gray-700"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-300" size={16} />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[11px] font-medium text-gray-400 uppercase tracking-widest ml-1">Visibility</label>
                <div className="relative">
                  <select
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    className="w-full px-6 py-4 bg-gray-50/50 border border-gray-200 rounded-[1.5rem] focus:bg-white focus:border-blue-400 outline-none transition-all cursor-pointer appearance-none font-light text-gray-700"
                  >
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                  </select>
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-300 flex items-center gap-2">
                    {form.type === "public" ? <Globe size={16} strokeWidth={1.5} /> : <Lock size={16} strokeWidth={1.5} />}
                    <ChevronDown size={16} />
                  </div>
                </div>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="pt-6 flex flex-col md:flex-row gap-4">
              <button
                type="submit"
                className="flex-grow py-5 bg-gray-900 hover:bg-blue-600 text-white font-medium rounded-[1.5rem] shadow-xl shadow-gray-200 hover:shadow-blue-500/20 flex items-center justify-center gap-3 transition-all active:scale-[0.99]"
              >
                <Save size={18} strokeWidth={1.5} />
                <span className="tracking-wide">Save Changes</span>
              </button>
              
              <button
                type="button"
                onClick={async () => {
                  if(window.confirm("Are you sure you want to delete this prompt?")) {
                    await deletePrompt(id);
                    navigate("/dashboard");
                  }
                }}
                className="px-8 py-5 bg-rose-50/50 text-rose-600 hover:bg-rose-100 border border-rose-100 font-medium rounded-[1.5rem] flex items-center justify-center gap-2 transition-all active:scale-[0.95]"
              >
                <Trash2 size={18} strokeWidth={1.5} />
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default EditPrompt;