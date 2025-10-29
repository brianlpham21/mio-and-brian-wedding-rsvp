'use client';

import { motion, useViewportScroll, useTransform } from 'framer-motion';

export default function Hero() {
  // Scroll-based fade for text
  const { scrollY } = useViewportScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const y = useTransform(scrollY, [0, 300], [0, -20]);

  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center text-center overflow-hidden">
      {/* Background video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/field.mp4"
        style={{
          objectPosition: '60% center', // focus right side for mobile
        }}
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Header */}
      <header className="absolute top-0 left-0 w-full z-20 bg-white/20 backdrop-blur-md border-b border-white/30">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between text-gray-800">
          <h1 className="text-lg font-semibold tracking-wide">Mio & Brian</h1>
          <nav className="hidden sm:flex gap-6 text-sm font-medium">
            <a href="#our-story" className="hover:text-pink-500 transition">
              Our Story
            </a>
            <a href="#info" className="hover:text-pink-500 transition">
              Info
            </a>
            <a href="#itinerary" className="hover:text-pink-500 transition">
              Itinerary
            </a>
            <a href="#rsvp" className="hover:text-pink-500 transition">
              RSVP
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Text */}
      <motion.div style={{ opacity, y }} className="relative z-10 container mx-auto px-6 sm:px-8">
        <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-white mb-4">
          Mio & Brian&apos;s Wedding
        </h2>
        <p className="text-base sm:text-lg text-white max-w-xl mx-auto leading-relaxed">
          We are so excited to celebrate our special day with you! Please RSVP below to let us know
          if you can join us.
        </p>
      </motion.div>

      {/* Bouncing arrow */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <svg
          className="w-8 h-8 text-pink-400 animate-bounce"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
