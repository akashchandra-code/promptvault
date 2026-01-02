import { motion } from "framer-motion";

const testimonials = [
  {
    id: 1,
    name: "Jane Doe",
    role: "Frontend Developer",
    quote:
      "PromptVault has transformed the way I store and organize my AI prompts. It’s intuitive and fast!",
    avatar: "https://i.pravatar.cc/100?img=1",
  },
  {
    id: 2,
    name: "John Smith",
    role: "AI Enthusiast",
    quote:
      "I love how easy it is to refine prompts and discover what actually works. Highly recommended!",
    avatar: "https://i.pravatar.cc/100?img=2",
  },
  {
    id: 3,
    name: "Emily Johnson",
    role: "Content Creator",
    quote:
      "A must-have tool for anyone working with AI prompts. The dashboard is clean and very responsive.",
    avatar: "https://i.pravatar.cc/100?img=3",
  },
  {
    id: 4,
    name: "Michael Lee",
    role: "Developer",
    quote:
      "Secure, fast, and beautifully designed. PromptVault is the perfect companion for developers and creators.",
    avatar: "https://i.pravatar.cc/100?img=4",
  },
];

const Testimonials = () => {
  return (
    <section className="w-full bg-[#fafafa] pt-20 font-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 tracking-tight">
            What people say about{" "}
            <span className="text-blue-600 font-normal">
              PromptVault
            </span>
          </h2>
          <p className="mt-4 text-gray-500 text-base md:text-lg font-light">
            Trusted by developers, creators, and AI builders.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-20">
          {testimonials.map((t) => (
            <motion.div
              key={t.id}
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm shadow-gray-100/50"
            >
              {/* Avatar */}
              <img
                src={t.avatar}
                alt={t.name}
                className="w-14 h-14 rounded-full mb-4 grayscale-[0.2] contrast-[1.1]"
              />

              {/* Quote */}
              <p className="text-gray-600 text-sm font-light leading-relaxed mb-5 italic">
                “{t.quote}”
              </p>

              {/* Name */}
              <h3 className="text-gray-900 font-normal text-sm">
                {t.name}
              </h3>

              {/* Role */}
              <span className="text-blue-600 text-xs font-light tracking-wide">
                {t.role}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;