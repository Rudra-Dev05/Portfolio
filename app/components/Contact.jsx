'use client'
import React, { useState, useCallback, memo } from 'react'
import { motion } from "framer-motion"
import { useTheme } from '../context/ThemeContext'
import { HiMail, HiUser, HiPaperAirplane } from 'react-icons/hi'

const Contact = memo(() => {
  const { isDarkMode } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState("");

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setResult("Sending message... ✨");
    
    const formDataToSend = new FormData(event.target);
    formDataToSend.append("access_key", "d790754d-566d-4558-97b3-f6ee8d60ecbe");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataToSend
      });

      const data = await response.json();
      if (data.success) {
        setResult("Message sent successfully! 🚀");
        event.target.reset();
      } else {
        setResult("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setResult("Failed to send message.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const inputClasses = `w-full px-5 py-4 rounded-xl outline-none text-base
    ${isDarkMode 
      ? 'bg-[#1a1a1a] text-white border-white/10 placeholder-gray-500' 
      : 'bg-gray-50 text-gray-900 border-gray-200 placeholder-gray-400'}
    border-2 focus:border-violet-500 transition-all duration-300`;

  return (
    <section className={`min-h-screen py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden
      ${isDarkMode ? 'bg-black' : 'bg-white'}`} id="contact">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className={`absolute inset-0 bg-gradient-to-br 
          ${isDarkMode 
            ? 'from-violet-900/10 via-transparent to-transparent'
            : 'from-violet-100/50 via-fuchsia-50/50 to-transparent'}`} 
        />
      </div>

      <div className="max-w-3xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl md:text-5xl font-bold mb-6
            ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Let's Connect
          </h2>
          <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Have an idea? Let's bring it to life together.
          </p>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Name Input */}
              <div className="relative">
                <label className={`block mb-2 text-sm font-medium 
                  ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Your Name
                </label>
                <div className="relative">
                  <span className={`absolute left-4 top-1/2 -translate-y-1/2 
                    ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                    <HiUser className="w-5 h-5" />
                  </span>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="John Doe"
                    className={`${inputClasses} pl-12`}
                  />
                </div>
              </div>

              {/* Email Input */}
              <div className="relative">
                <label className={`block mb-2 text-sm font-medium 
                  ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Your Email
                </label>
                <div className="relative">
                  <span className={`absolute left-4 top-1/2 -translate-y-1/2 
                    ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                    <HiMail className="w-5 h-5" />
                  </span>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="john@example.com"
                    className={`${inputClasses} pl-12`}
                  />
                </div>
              </div>
            </div>

            {/* Message Input */}
            <div>
              <label className={`block mb-2 text-sm font-medium 
                ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Your Message
              </label>
              <textarea
                rows="6"
                name="message"
                required
                placeholder="Tell me about your project..."
                className={inputClasses}
              />
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full px-8 py-4 rounded-xl font-medium
                ${isDarkMode 
                  ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:from-violet-700 hover:to-purple-700'
                  : 'bg-gradient-to-r from-violet-500 to-purple-500 text-white hover:from-violet-600 hover:to-purple-600'}
                transition-all duration-300 disabled:opacity-50
                disabled:cursor-not-allowed flex items-center justify-center gap-2`}
            >
              {isLoading ? (
                <span className="animate-spin">↻</span>
              ) : (
                <>
                  Send Message
                  <HiPaperAirplane className="w-5 h-5 rotate-90" />
                </>
              )}
            </motion.button>

            {/* Result Message */}
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-xl text-center text-sm font-medium 
                  ${result.includes("successfully")
                    ? isDarkMode 
                      ? "bg-green-500/10 text-green-400"
                      : "bg-green-50 text-green-600"
                    : isDarkMode
                      ? "bg-red-500/10 text-red-400"
                      : "bg-red-50 text-red-600"
                  }`}
              >
                {result}
              </motion.div>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
});

Contact.displayName = 'Contact';
export default Contact;
