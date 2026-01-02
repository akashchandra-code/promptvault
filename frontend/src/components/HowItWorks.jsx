import { Upload, Brain, Target, LayoutDashboard } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Upload Your Prompts",
    desc: "Save your best AI prompts securely in one organized vault.",
    icon: Upload,
  },
  {
    id: 2,
    title: "AI-Powered Structuring",
    desc: "Our system analyzes, tags, and structures prompts for reuse.",
    icon: Brain,
  },
  {
    id: 3,
    title: "Discover & Improve",
    desc: "Refine prompts with insights and explore what actually works.",
    icon: Target,
  },
  {
    id: 4,
    title: "Access Anytime",
    desc: "Use your prompt vault directly from your dashboard when needed.",
    icon: LayoutDashboard,
  },
];

const HowItWorks = () => {
  return (
    <section className="w-full bg-white font-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-gray-900">
            How{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-normal">
              PromptVault
            </span>{" "}
            works
          </h2>
          <p className="mt-4 text-gray-500 text-base md:text-lg font-light">
            A simple workflow designed for creators, developers, and builders.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.id}
                className="
                  relative group bg-[#f9fafc]
                  rounded-xl border border-gray-100
                  hover:-translate-y-1 transition-all duration-300
                "
              >
                {/* Accent line */}
                <div className="absolute top-0 left-0 w-full h-[2px] rounded-t-xl bg-gradient-to-r from-blue-600 to-indigo-600" />

                {/* Card Content */}
                <div className="p-8">
                  
                  {/* Icon */}
                  <div
                    className="
                      w-14 h-14 flex items-center justify-center rounded-full 
                      bg-blue-100 text-blue-600 mb-6
                    "
                  >
                    <Icon className="w-7 h-7" strokeWidth={1.5} />
                  </div>

                  {/* Step Number */}
                  <span className="text-sm font-medium tracking-wider text-blue-600">
                    Step {step.id}
                  </span>

                  {/* Title */}
                  <h3 className="mt-2 text-lg font-normal tracking-tight text-gray-900">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-3 text-gray-500 text-sm font-light leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;