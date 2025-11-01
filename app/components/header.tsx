'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useTranslation } from '@/hooks/useTranslation';
import { HeaderProps } from '../types';

export default function Header({ selectedLang, setSelectedLang, languages }: HeaderProps) {
  const { t } = useTranslation({ locale: selectedLang.code });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // --- Scroll-based motion values ---
  const { scrollY } = useScroll();
  const background = useTransform(
    scrollY,
    [0, 100],
    ['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.9)']
  );
  const height = useTransform(scrollY, [0, 100], [60, 47]);
  const blur = useTransform(scrollY, [0, 100], ['blur(8px)', 'blur(16px)']);

  // --- Dropdown handling ---
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // --- Smooth scroll ---
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
        smoothScrollTo(targetY, 1200);
      }
    },
    [smoothScrollTo]
  );

  return (
    <motion.header
      style={{
        background,
        height,
        backdropFilter: blur,
      }}
      className="fixed top-0 left-0 w-full z-20 transition-colors"
    >
      <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between text-gray-800">
        {/* Language Dropdown */}
        <div className="relative" ref={dropdownRef}>
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

        {/* Navigation */}
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
    </motion.header>
  );
}
