import { motion } from "framer-motion";

const PrivacyPolicy = () => {
  return (
    <section className="relative min-h-screen bg-white font-light overflow-hidden">
      
      {/* Grid background */}
      <div
        className="absolute inset-0 
        bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),
            linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)]
        bg-[size:40px_40px] opacity-[0.25]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/40 via-white to-white" />

      <div className="relative max-w-4xl mx-auto pt-32 pb-20 px-6">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <h1 className="text-5xl font-light tracking-tight text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-500 text-lg">
            Your privacy matters. Here’s how we handle your data.
          </p>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="space-y-12 text-gray-600 leading-relaxed"
        >
          <div>
            <h2 className="text-2xl text-gray-900 font-light mb-3">
              1. Information We Collect
            </h2>
            <p>
              PromptVault collects basic information such as your name, email
              address, and usage data to provide and improve our services.
              We do not collect sensitive personal data unless explicitly
              provided by you.
            </p>
          </div>

          <div>
            <h2 className="text-2xl text-gray-900 font-light mb-3">
              2. How We Use Your Information
            </h2>
            <p>
              We use your information to authenticate users, manage accounts,
              improve platform performance, and enhance user experience.
              Your data is never sold to third parties.
            </p>
          </div>

          <div>
            <h2 className="text-2xl text-gray-900 font-light mb-3">
              3. Cookies & Tracking
            </h2>
            <p>
              PromptVault may use cookies and similar technologies to maintain
              sessions and understand how users interact with the platform.
              You can disable cookies in your browser settings.
            </p>
          </div>

          <div>
            <h2 className="text-2xl text-gray-900 font-light mb-3">
              4. Data Security
            </h2>
            <p>
              We implement industry-standard security measures to protect your
              data. However, no method of transmission over the internet is
              completely secure.
            </p>
          </div>

          <div>
            <h2 className="text-2xl text-gray-900 font-light mb-3">
              5. Third-Party Services
            </h2>
            <p>
              PromptVault may integrate third-party services for analytics or
              authentication. These services have their own privacy policies
              governing the use of your information.
            </p>
          </div>

          <div>
            <h2 className="text-2xl text-gray-900 font-light mb-3">
              6. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes
              will be reflected on this page with an updated revision date.
            </p>
          </div>

          <div>
            <h2 className="text-2xl text-gray-900 font-light mb-3">
              7. Contact Us
            </h2>
            <p>
              If you have any questions about this Privacy Policy, please
              contact us at{" "}
              <a
                href="mailto:akashchandra6280@gmail.com"
                className="text-blue-600 hover:underline"
              >
                akashchandra6280@gmail.com
              </a>.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
