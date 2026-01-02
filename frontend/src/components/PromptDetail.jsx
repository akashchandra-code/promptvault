import { useEffect, useState } from "react";
import { X, Copy, Check, Terminal, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { usePrompt } from "../hooks/usePrompt";

const PromptDetail = ({ promptId, onClose }) => {
  const { getPromptById } = usePrompt();
  const [prompt, setPrompt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

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
    if (!promptId) return;
    const fetchPrompt = async () => {
      try {
        setLoading(true);
        const data = await getPromptById(promptId);
        setPrompt(data);
      } catch (error) {
        console.error("Failed to fetch prompt");
      } finally {
        setLoading(false);
      }
    };
    fetchPrompt();
  }, [promptId]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt.description);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed");
    }
  };

  if (!promptId) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-gray-900/40 backdrop-blur-md"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative z-10 w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col border border-gray-100"
      >
        {/* HEADER */}
        <div className="relative px-10 pt-10 pb-4">
          <button
            onClick={onClose}
            className="absolute top-8 right-8 p-2 rounded-full hover:bg-gray-50 text-gray-400 transition-all"
          >
            <X size={20} strokeWidth={1.5} />
          </button>

          {loading ? (
            <div className="h-8 w-48 bg-gray-50 animate-pulse rounded-lg" />
          ) : (
            <>
              <div className="flex items-center gap-2 mb-4">
                <div className="px-3 py-1 bg-gray-50 text-gray-500 rounded-full text-[10px] font-medium uppercase tracking-[0.15em] flex items-center gap-1.5 border border-gray-100">
                  <Globe size={12} strokeWidth={1.5} /> Community Prompt
                </div>
              </div>
              <h2 className="text-3xl font-light text-gray-900 tracking-tight leading-tight pr-10">
                {prompt?.title}
              </h2>
            </>
          )}
        </div>

        {/* CONTENT */}
        <div className="px-10 pb-10 overflow-y-auto max-h-[65vh]">
          {loading ? (
            <div className="space-y-4 mt-6">
              <div className="h-3 w-full bg-gray-50 animate-pulse rounded" />
              <div className="h-3 w-2/3 bg-gray-50 animate-pulse rounded" />
            </div>
          ) : (
            <>
              <div className="flex flex-wrap gap-2.5 mb-10 mt-2">
                {prompt?.tags?.map((tag, i) => {
                  const style = getTagStyle(tag);
                  return (
                    <span
                      key={i}
                      className={`text-[11px] font-medium px-3.5 py-1.5 rounded-xl border ${style.bg} ${style.text} ${style.border} tracking-wide`}
                    >
                      {tag}
                    </span>
                  );
                })}
              </div>

              <div className="relative">
                <div className="flex items-center gap-2 mb-3 ml-1">
                  <Terminal size={14} className="text-gray-400" strokeWidth={1.5} />
                  <span className="text-[10px] font-medium text-gray-400 uppercase tracking-widest">Instruction Set</span>
                </div>
                <div className="w-full bg-[#fcfcfd] border border-gray-100 rounded-[1.5rem] p-8 font-mono text-sm text-gray-600 font-light leading-relaxed whitespace-pre-line">
                  {prompt?.description}
                </div>
              </div>
            </>
          )}
        </div>

        {/* FOOTER */}
        <div className="px-10 py-8 bg-gray-50/50 border-t border-gray-50 flex items-center justify-between">
          <span className="text-xs font-light text-gray-400 tracking-wide">
            Ready to use in your LLM
          </span>
          <button
            onClick={handleCopy}
            className={`
              flex items-center gap-2.5 px-8 py-3.5 rounded-2xl font-medium text-sm transition-all
              ${copied 
                ? "bg-emerald-500 text-white" 
                : "bg-gray-900 text-white hover:bg-blue-600 shadow-lg shadow-gray-200"}
            `}
          >
            {copied ? <Check size={16} strokeWidth={2} /> : <Copy size={16} strokeWidth={1.5} />}
            {copied ? "Copied" : "Copy to Clipboard"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default PromptDetail;