'use client';

import { motion, useViewportScroll, useTransform } from 'framer-motion';

export default function Hero() {
  // Scroll-based fade for text
  const { scrollY } = useViewportScroll();
  const scrollOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scrollYPos = useTransform(scrollY, [0, 300], [0, -20]);

  function smoothScrollTo(targetY: number, duration = 1000) {
    const startY = window.scrollY;
    const distance = targetY - startY;
    let startTime: number | null = null;

    function easeOutCubic(t: number) {
      return 1 - Math.pow(1 - t, 3);
    }

    function step(currentTime: number) {
      if (!startTime) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const ease = easeOutCubic(progress);

      window.scrollTo(0, startY + distance * ease);

      if (timeElapsed < duration) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center text-center overflow-hidden">
      {/* Background video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/field.mp4"
        style={{ objectPosition: '60% center' }}
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Header */}
      <header className="absolute top-0 left-0 w-full z-20 bg-white/20 backdrop-blur-md border-b border-white/30">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between text-gray-800">
          {/* <h1 className="invisible sm:visible text-md font-medium tracking-wide">Mio & Brian</h1> */}
          <div></div>
          <nav className="flex gap-6 text-sm font-medium">
            <a href="#our-story" className="hidden sm:flex hover:text-pastel-green-250 transition">
              Our Story
            </a>
            <a href="#info" className="hover:text-pastel-green-250 transition">
              Info
            </a>
            <a href="#itinerary" className="hidden sm:flex hover:text-pastel-green-250 transition">
              Itinerary
            </a>
            <a href="#rsvp" className="hover:text-pastel-green-250 transition">
              RSVP
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Text */}
      <motion.div
        initial={{ opacity: 0, y: -30 }} // fade in from top on load
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.3, ease: 'easeOut' }}
        style={{ opacity: scrollOpacity, y: scrollYPos }} // scroll effect
        className="relative z-10 container mx-auto px-6 sm:px-8"
      >
        <p className="text-base sm:text-lg text-white max-w-xl mx-auto md:tracking-[.2em] lg:translate-y-5">
          THE WEDDING OF
        </p>
        <h2
          className="text-white"
          style={{ fontFamily: 'Brother, serif', fontSize: 'clamp(4.5rem, 15vw, 11.5rem)' }}
        >
          Mio & Brian
        </h2>
        <p className="text-base sm:text-lg text-white max-w-xl mx-auto md:tracking-[.2em]">
          MARCH 20, 2026 | LOS ANGELES, CA
        </p>
      </motion.div>

      {/* Bouncing arrow */}
      <div className="absolute bottom-15 left-1/2 -translate-x-1/2 z-10">
        <button
          onClick={() => smoothScrollTo(window.innerHeight, 1000)} // scroll 1 viewport height in 1s
          className="w-8 h-8 text-pink-400 flex items-center justify-center cursor-pointer"
          aria-label="Scroll down"
        >
          <svg
            className="w-8 h-8 text-white animate-bounce"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
    </section>
  );
}
