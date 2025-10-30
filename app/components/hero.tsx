'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useTransform, useScroll } from 'framer-motion';

import { HeroProps } from '../types';
import { useTranslation } from '@/hooks/useTranslation';

export default function Hero({ selectedLang, setSelectedLang, languages }: HeroProps) {
  const { t } = useTranslation({ locale: selectedLang.code });

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

      {/* Header */}
      <header className="absolute top-0 left-0 w-full z-20 bg-white/20 backdrop-blur-md border-b border-white/30">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between text-gray-800">
          {/* Language Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 border border-gray-300 rounded-md px-2 py-1 hover:bg-white/30 transition cursor-pointer"
            >
              <Image src={selectedLang.flag} alt={selectedLang.name} width={24} height={16} />
            </button>
            {dropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-35 bg-gray-100 rounded-md shadow-lg border border-gray-200 overflow-hidden z-50">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setSelectedLang(lang);
                      setDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-200 transition text-sm cursor-pointer"
                  >
                    <Image src={lang.flag} alt={lang.name} width={24} height={16} />
                    {lang.name}
                  </button>
                ))}
              </div>
            )}
          </div>
          <nav className="flex gap-6 text-sm font-medium items-center">
            <a
              href="#our-story"
              onClick={(e) => handleScrollToSection(e, '#our-story')}
              className="hidden sm:flex transition hover:text-black/50"
            >
              {t('our-story')}
            </a>
            <a
              href="#info"
              onClick={(e) => handleScrollToSection(e, '#info')}
              className="transition hover:text-black/50"
            >
              {t('information')}
            </a>
            <a
              href="#itinerary"
              onClick={(e) => handleScrollToSection(e, '#itinerary')}
              className="hidden sm:flex transition hover:text-black/50"
            >
              {t('itinerary')}
            </a>
            <a
              href="#rsvp"
              onClick={(e) => handleScrollToSection(e, '#rsvp')}
              className="transition border border-black/12 px-3 py-1 font-semibold rounded-md hover:bg-white/20 hover:text-black/70"
            >
              {t('rsvp').toUpperCase()}
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
