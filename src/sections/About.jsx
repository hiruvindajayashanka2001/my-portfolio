import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const About = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] },
    }),
  };

  const fadeLeft = {
    hidden: { opacity: 0, x: -60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const fadeRight = {
    hidden: { opacity: 0, x: 60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-black py-24 px-6 md:px-16"
    >
      {/* Purple dot grid — matches hero */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle, #000000 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Glow blobs */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-purple-900 opacity-20 blur-3xl z-0 pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-[400px] h-[400px] rounded-full bg-purple-800 opacity-10 blur-3xl z-0 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* ── MAIN TWO-COLUMN LAYOUT ── */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* ── LEFT: Photo + blobs ── */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="relative flex-shrink-0 w-96 h-[420px] md:w-[480px] md:h-[520px]"
          >
            {/* Large blob behind photo */}
            <motion.div
              animate={{ scale: [1, 1.04, 1], rotate: [0, 3, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -left-6 w-72 h-72 md:w-96 md:h-96 rounded-full z-0"
              style={{
                background: "radial-gradient(circle at 40% 40%, #a855f7, #7e22ce)",
                filter: "blur(2px)",
              }}
            />

            {/* Small blob top-right */}
            <motion.div
              animate={{ scale: [1, 1.08, 1], y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -top-4 right-0 w-16 h-16 rounded-full z-10"
              style={{ background: "#a855f7", opacity: 0.7 }}
            />

            {/* Small blob bottom-left */}
            <motion.div
              animate={{ scale: [1, 1.1, 1], y: [0, 8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute bottom-4 -left-4 w-10 h-10 rounded-full z-10"
              style={{ background: "#7e22ce", opacity: 0.8 }}
            />

            {/* Dark square accent — matches hero dark block */}
            <div className="absolute bottom-6 left-6 w-14 h-14 rounded-lg bg-white/5 border border-white/10 z-10" />

            {/* Photo */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-72 md:w-96 z-20 flex items-end justify-center">
              <div className="w-full"
                style={{
                  WebkitMaskImage: "linear-gradient(to top, transparent 0%, black 30%)",
                  maskImage: "linear-gradient( to top, transparent 0%, black 30%",
                }}
              >
                <img
                  src="/images/my-image.png"
                  alt="Hiruvinda"
                  className="w-full object-contain drop-shadow-2xl"
                  style={{ filter: "drop-shadow(0 20px 40px rgba(168,85,247,0.4))" }}
                />
              </div>
            </div>
          </motion.div>

          {/* ── RIGHT: Text content ── */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex flex-col gap-6 max-w-xl"
          >
            {/* Nav-style label — mirrors the reference */}
            <motion.div custom={0} variants={fadeUp} initial="hidden" animate={isInView ? "visible" : "hidden"}>
              <span className="text-xs uppercase tracking-[0.3em] text-purple-400 font-semibold">
                About Me
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="text-4xl md:text-5xl font-bold text-white leading-tight"
            >
              So, Who am I{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">
                ?
              </span>
              <br />
              <span className="text-2xl md:text-3xl font-semibold text-gray-300">
                Software Engineer
              </span>
            </motion.h2>

            {/* Description */}
            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="text-gray-400 text-base leading-relaxed"
            >
              A passionate developer based in Sri Lanka with a love for building
              full-stack web and mobile applications. I turn complex problems into
              clean, scalable, and user-friendly solutions — from concept to
              deployment.
            </motion.p>

            <motion.p
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="text-gray-500 text-sm leading-relaxed"
            >
              Currently pursuing BSc Software Engineering, working on real-world
              projects involving React Native, Node.js, MongoDB, and UI/UX design.
            </motion.p>

            {/* CTA Button — mirrors "SEE MY WORK" hero button */}
            <motion.div
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2"
            >
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="px-7 py-3.5 rounded-xl border border-white/20 bg-white/5 text-white font-semibold uppercase tracking-widest text-xs hover:border-purple-500/60 hover:bg-purple-500/10 transition-all backdrop-blur-sm"
              >
                Get In Touch
              </motion.a>

              {/* Contact email — matches reference design */}
              <span className="text-gray-500 text-sm">
                contact@hiruvinda.dev
              </span>
            </motion.div>

            {/* Social icons row — matches reference */}
            <motion.div
              custom={5}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="flex items-center gap-3 pt-1"
            >
              {[
                {
                  label: "GitHub",
                  href: "https://github.com/",
                  icon: (
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  ),
                },
                {
                  label: "LinkedIn",
                  href: "https://linkedin.com/",
                  icon: (
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  ),
                },
                {
                  label: "Twitter",
                  href: "https://twitter.com/",
                  icon: (
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  ),
                },
              ].map(({ label, href, icon }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 rounded-full border border-white/15 bg-white/5 flex items-center justify-center hover:border-purple-500/50 hover:bg-purple-500/10 transition-all"
                  aria-label={label}
                >
                  <svg className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                    {icon}
                  </svg>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;