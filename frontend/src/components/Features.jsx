import { motion } from "framer-motion";
import { ShieldCheck, Zap, RefreshCcw, Users } from "lucide-react";

const features = [
  {
    id: 1,
    title: "Secure Storage",
    desc: "Your AI prompts are stored safely and encrypted for maximum security.",
    icon: ShieldCheck,
  },
  {
    id: 2,
    title: "Fast & Efficient",
    desc: "Access and manage your prompts instantly with lightning-fast performance.",
    icon: Zap,
  },
  {
    id: 3,
    title: "Easy Updates",
    desc: "Edit, improve, or refine your prompts anytime without hassle.",
    icon: RefreshCcw,
  },
  {
    id: 4,
    title: "Collaboration",
    desc: "Share prompts with your team or community seamlessly.",
    icon: Users,
  },
];

const Features = () => {
  return (
    <section className="w-full bg-white pt-20 font-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-gray-900">
            Features that make{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-normal">
              PromptVault
            </span>{" "}
            better
          </h2>
          <p className="mt-4 text-gray-500 text-base md:text-lg font-light">
            Everything you need to manage, optimize, and share your AI prompts efficiently.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.id}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25 }}
                className="
                  relative bg-[#f9fafc]
                  rounded-xl border border-gray-100
                  p-8 transition
                "
              >
                {/* Accent line */}
                <div className="absolute top-0 left-0 w-full h-[2px] rounded-t-xl bg-gradient-to-r from-blue-600 to-indigo-600" />

                {/* Icon */}
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mb-6">
                  <Icon className="w-7 h-7" strokeWidth={1.5} />
                </div>

                {/* Title */}
                <h3 className="text-lg font-normal tracking-tight text-gray-900 mb-2">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-500 text-sm font-light leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;