import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles, Globe, Lock, Send, ChevronDown } from "lucide-react";
import { usePrompt } from "../hooks/usePrompt";
// Import your LoadingScreen component
import Loading from "../components/Loading"; 

const CreatePrompt = () => {
  const { createPrompt } = usePrompt();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Other",
    type: "public",
  });

  // 1. Add loading state
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // 2. Trigger loading screen
    
    try {
      await createPrompt(form);
      // We don't set loading to false here so the transition 
      // to the dashboard feels smooth
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      setLoading(false); // 3. Stop loading only if there is an error
    }
  };

  return (
    <section className="relative min-h-screen bg-white overflow-hidden font-light">
      {/* 4. Render Loading Overlay */}
      {loading && <Loading />}

      {/* THE GRID EFFECT */}
      <div
        className="absolute inset-0 
        bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),
            linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)]
        bg-[size:40px_40px] opacity-[0.25]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/40 via-white to-white" />

      <div className="relative pt-32 pb-20 max-w-2xl mx-auto px-6">
        
        {/* BACK BUTTON */}
        <button 
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 text-gray-800 hover:text-blue-600 transition-all mb-10 group"
        >
          <ArrowLeft size={18} strokeWidth={1.5} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium tracking-wide">Back to Workspace</span>
        </button>

        {/* HEADER */}
        <div className="mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50/50 border border-blue-100 text-blue-600 text-[10px] font-medium uppercase tracking-[0.2em] mb-6"
          >
            <Sparkles size={14} strokeWidth={1.5} /> New Creation
          </motion.div>
          <h1 className="text-5xl font-light text-gray-900 tracking-tight leading-tight">
            Craft your <span className="text-blue-600">Prompt</span>
          </h1>
          <p className="text-gray-500 mt-3 text-lg font-light">Engineering the foundation for your next AI interaction.</p>
        </div>

        {/* FORM CARD */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/70 backdrop-blur-xl rounded-[2.5rem] border border-gray-300 shadow-2xl shadow-gray-200/50 overflow-hidden"
        >
          <form onSubmit={handleSubmit} className="p-10 space-y-8">
            
            {/* TITLE INPUT */}
            <div className="space-y-3">
              <label className="text-[11px] font-medium text-gray-600 uppercase tracking-widest ml-1">Prompt Title</label>
              <input
                name="title"
                placeholder="e.g., Senior React Architect Persona"
                value={form.title}
                onChange={handleChange}
                required
                className="w-full px-6 py-4 bg-gray-50/50 border border-gray-300 rounded-[1.5rem] focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-500/5 outline-none transition-all text-xl font-light text-gray-800 placeholder:text-gray-400"
              />
            </div>

            {/* DESCRIPTION/BODY */}
            <div className="space-y-3">
              <label className="text-[11px] font-medium text-gray-600 uppercase tracking-widest ml-1">The Instruction</label>
              <textarea
                name="description"
                placeholder="Write your prompt logic here..."
                value={form.description}
                onChange={handleChange}
                required
                rows={8}
                className="w-full px-6 py-5 bg-gray-50/50 border border-gray-300 rounded-[1.5rem] focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-500/5 outline-none transition-all resize-none font-mono text-sm font-light leading-relaxed text-gray-700 placeholder:text-gray-400"
              />
            </div>

            {/* SETTINGS ROW */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-[11px] font-medium text-gray-600 uppercase tracking-widest ml-1">Category</label>
                <div className="relative">
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full px-6 py-4 bg-gray-50/50 border border-gray-300 rounded-[1.5rem] focus:bg-white focus:border-blue-400 outline-none transition-all appearance-none cursor-pointer font-light text-gray-700"
                  >
                    {["Marketing", "Coding", "Social Media", "Education", "Design", "Personal", "Other"].map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-300" size={16} />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[11px] font-medium text-gray-600 uppercase tracking-widest ml-1">Visibility</label>
                <div className="relative">
                  <select
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    className="w-full px-6 py-4 bg-gray-50/50 border border-gray-300 rounded-[1.5rem] focus:bg-white focus:border-blue-400 outline-none transition-all appearance-none cursor-pointer font-light text-gray-700"
                  >
                    <option value="public">Public - visible to everyone</option>
                    <option value="private">Private - only you</option>
                  </select>
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-300 flex items-center gap-2">
                    {form.type === "public" ? <Globe size={16} strokeWidth={1.5} /> : <Lock size={16} strokeWidth={1.5} />}
                    <ChevronDown size={16} />
                  </div>
                </div>
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={loading} // Disable button during loading
                className="w-full py-5 bg-gray-900 hover:bg-blue-600 text-white font-medium rounded-[1.5rem] shadow-xl shadow-gray-200 hover:shadow-blue-500/20 flex items-center justify-center gap-3 transition-all active:scale-[0.99] disabled:opacity-50"
              >
                <Send size={18} strokeWidth={1.5} />
                <span className="tracking-wide">Publish Prompt</span>
              </button>
            </div>
          </form>
        </motion.div>

        {/* TIPS SECTION */}
        <p className="text-center text-gray-400 text-xs font-light mt-10 tracking-wide">
          Pro-tip: Use <span className="font-mono bg-gray-50 px-2 py-0.5 rounded border border-gray-100 text-gray-500">[variables]</span> to make your prompts more dynamic.
        </p>
      </div>
    </section>
  );
};

export default CreatePrompt;