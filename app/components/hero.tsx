'use client';

import { motion, useTransform, useScroll } from 'framer-motion';
import { useCallback } from 'react';

export default function Hero() {
  // Scroll-based fade for text
  const { scrollY } = useScroll();
  const scrollOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scrollYPos = useTransform(scrollY, [0, 300], [0, -20]);

  const smoothScrollTo = useCallback((targetY: number, duration = 1000) => {
    const startY = window.scrollY;
    const distance = targetY - startY;
    let startTime: number | null = null;

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const step = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const ease = easeOutCubic(progress);

      window.scrollTo(0, startY + distance * ease);

      if (timeElapsed < duration) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, []);

  const handleScrollToSection = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, sectionId: string) => {
      e.preventDefault();
      const section = document.querySelector(sectionId);
      if (section) {
        const targetY = section.getBoundingClientRect().top + window.scrollY;
        smoothScrollTo(targetY, 1200); // adjust duration for smoother deceleration
      }
    },
    [smoothScrollTo]
  );

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
          <nav className="flex gap-6 text-sm font-medium items-center">
            <a
              href="#our-story"
              onClick={(e) => handleScrollToSection(e, '#our-story')}
              className="hidden sm:flex transition hover:text-black/50"
            >
              Our Story
            </a>
            <a
              href="#info"
              onClick={(e) => handleScrollToSection(e, '#info')}
              className="transition hover:text-black/50"
            >
              Information
            </a>
            <a
              href="#itinerary"
              onClick={(e) => handleScrollToSection(e, '#itinerary')}
              className="hidden sm:flex transition hover:text-black/50"
            >
              Itinerary
            </a>
            <a
              href="#rsvp"
              onClick={(e) => handleScrollToSection(e, '#rsvp')}
              className="transition border border-black/12 px-3 py-1 font-semibold rounded-md hover:bg-white/20 hover:text-black/70"
            >
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
          className="w-8 h-8 flex items-center justify-center cursor-pointer"
          aria-label="Scroll down"
        >
          <svg
            className="w-8 h-8 text-white animate-bounce hover:text-black/40 transition"
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
