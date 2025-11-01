'use client';

import { useCallback } from 'react';
import { motion, useTransform, useScroll } from 'framer-motion';

import { HeroProps } from '../types';
import { useTranslation } from '@/hooks/useTranslation';

export default function Hero({ selectedLang }: HeroProps) {
  const { t } = useTranslation({ locale: selectedLang.code });

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

  const mainNameFontSize =
    selectedLang.code === 'ja'
      ? 'clamp(1rem, 10vw, 8rem)' // smaller for Japanese
      : 'clamp(4.5rem, 15vw, 11.5rem)'; // original size
  const headerTranslateY = selectedLang.code === 'ja' ? 'translate-y-[-1.2em]' : 'lg:translate-y-5';
  const dateTimeLocationSize = selectedLang.code === 'ja' ? 'text-sm md:text-lg' : 'text-lg';

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

      {/* Hero Text */}
      <motion.div
        initial={{ opacity: 0, y: -30 }} // fade in from top on load
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.3, ease: 'easeOut' }}
        style={{ opacity: scrollOpacity, y: scrollYPos }} // scroll effect
        className="relative z-10 container mx-auto px-6 sm:px-8"
      >
        <p
          className={`text-base sm:text-lg text-white max-w-xl mx-auto md:tracking-[.2em] ${headerTranslateY}`}
        >
          {t('the-wedding-of')}
        </p>
        <h2
          className="text-white"
          style={{ fontFamily: 'Brother, serif', fontSize: mainNameFontSize }}
        >
          {t('mio-and-brian')}
        </h2>
        <p className={`not-prose text-white mx-auto md:tracking-[.2em] ${dateTimeLocationSize}`}>
          {t('wedding-date')} | {t('city-location')}
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
