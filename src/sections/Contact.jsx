import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import emailjs from "@emailjs/browser";
import GlobeCanvas from '../components/GlobeCanvas';

const Contact = () => {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] },
    }),
  };

  const inputClass =
    "w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-500/60 focus:bg-purple-500/5 transition-all resize-none";

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-black py-24 px-6 md:px-16 flex items-center"
    >
      {/* Purple dot grid */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle, #6b21a8 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Glow blobs */}
      <div className="absolute -top-40 right-0 w-[400px] h-[400px] rounded-full bg-purple-900 opacity-20 blur-3xl z-0 pointer-events-none select-none" />
      <div className="absolute -bottom-40 -left-20 w-[350px] h-[350px] rounded-full bg-purple-800 opacity-10 blur-3xl z-0 pointer-events-none select-none" />

      <div className="relative z-20 max-w-7xl mx-auto w-full">

        {/* Label */}
        <motion.span
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-xs uppercase tracking-[0.3em] text-purple-400 font-semibold"
        >
          Let's Talk
        </motion.span>

        {/* Heading */}
        <motion.h2
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-4xl md:text-6xl font-bold text-white mt-3 mb-4 leading-tight"
        >
          Contact{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">
            Me
          </span>
        </motion.h2>

        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-gray-400 text-base mb-12 max-w-lg"
        >
          Have a project in mind or just want to say hi? Drop me a message and
          I'll get back to you as soon as possible.
        </motion.p>

        {/* Two column — Globe left, Form right */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">

          {/* LEFT — Globe */}
          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="lg:col-span-2 w-full h-[380px] md:h-[500px] relative"          >
            <GlobeCanvas />

            <div className="absolute bottom-6 left-0 right-0 flex justify-center pointer-events-none">
              <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2">
                <span className="w-2 h-2 rounded-full bg-fuchsia-400 animate-pulse" />
                <span className="text-xs text-gray-300 font-medium">
                  Sri Lanka 🇱🇰 — Available Worldwide
                </span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT — Form */}
          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="lg:col-span-3 relative z-30"
          >
            <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4">

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="from_name"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
                <input
                  type="email"
                  name="from_email"
                  placeholder="Your Email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>

              <textarea
                name="message"
                placeholder="Your Message..."
                value={form.message}
                onChange={handleChange}
                required
                rows={7}
                className={inputClass}
              />

              <motion.button
                type="submit"
                disabled={status === "sending"}
                whileHover={{ scale: status === "sending" ? 1 : 1.02 }}
                whileTap={{ scale: status === "sending" ? 1 : 0.97 }}
                className="w-full py-4 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold uppercase tracking-widest text-sm transition-all flex items-center justify-center gap-2"
              >
                {status === "sending" ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Sending...
                  </>
                ) : (
                  "Send Message →"
                )}
              </motion.button>

              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-green-400 text-sm bg-green-400/10 border border-green-400/20 rounded-xl px-4 py-3"
                >
                  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Message sent! I'll get back to you soon.
                </motion.div>
              )}

              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3"
                >
                  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Something went wrong. Please try again.
                </motion.div>
              )}

            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;