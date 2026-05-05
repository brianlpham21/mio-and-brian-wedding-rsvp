'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useTransform, useScroll } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';

interface CountdownProps {
  selectedLang: { code: string; name: string; flag: string };
}

export default function Countdown({ selectedLang }: CountdownProps) {
  const { t } = useTranslation({ locale: selectedLang.code });
  const [isMobile, setIsMobile] = useState(false);

  const sectionRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const vw = typeof window !== 'undefined' ? window.innerWidth : 1200;

  const moveRange = [-0.15 * vw, -0.23 * vw];
  const scrollYPos = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : moveRange);

  const targetDate = '2026-03-20T17:00:00';

  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  function getTimeLeft() {
    const now = new Date();
    const target = new Date(targetDate);
    const diff = Math.max(0, target.getTime() - now.getTime());

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return { days, hours, minutes, seconds };
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const topUnits = [
    { label: t('days'), value: timeLeft.days },
    { label: t('hours'), value: timeLeft.hours },
  ];

  const bottomUnits = [
    { label: t('minutes'), value: timeLeft.minutes },
    { label: t('seconds'), value: timeLeft.seconds },
  ];

  const headerFont =
    selectedLang.code === 'vi'
      ? { fontSize: 'clamp(3rem, 4vw, 4rem)', fontStyle: 'italic', fontWeight: '500' }
      : selectedLang.code === 'ja'
        ? { fontSize: 'clamp(2.25rem, 5vw, 4rem)' }
        : { fontFamily: 'Norway, serif', fontSize: 'clamp(4rem, 10vw, 6rem)' };

  return (
    <section
      className="relative w-screen py-14 md:py-20 flex flex-col items-center justify-center text-center text-gray-900 overflow-hidden"
      ref={sectionRef}
      style={{ opacity: 0.4 }}
    >
      <motion.img
        src="/countdown-photo.jpeg"
        alt="Dinner background"
        className={
          isMobile
            ? 'h-full object-cover absolute top-0 left-0'
            : 'w-full h-auto absolute top-0 left-0'
        }
        style={{
          y: scrollYPos,
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px] z-10" />

      {/* Foreground content */}
      <div className="relative z-10 flex flex-col items-center">
        <h2 className={`mb-8 text-gray-900 drop-shadow-sm leading-[1em]`} style={headerFont}>
          {t('countingDownToIDo')}
        </h2>

        {/* Countdown container */}
        <div className="flex flex-col md:flex-row md:gap-6 font-mono justify-center items-center w-full max-w-3xl px-15 md:px-0">
          {/* Top row */}
          <div className="grid grid-cols-2 gap-3 w-full md:flex md:w-auto md:gap-6 justify-center items-center">
            {topUnits.map((unit) => (
              <div
                key={unit.label}
                className="bg-white/70 rounded-xl py-3 px-6 shadow-md flex flex-col items-center justify-center w-full border-1 border-peach"
              >
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={unit.value}
                    initial={{ rotateX: 90, opacity: 0 }}
                    animate={{ rotateX: 0, opacity: 1 }}
                    exit={{ rotateX: -90, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="text-3xl md:text-6xl font-bold text-gray-900"
                  >
                    {unit.value.toString().padStart(2, '0')}
                  </motion.div>
                </AnimatePresence>
                <div className="text-sm md:text-lg text-gray-700 mt-1">{unit.label}</div>
              </div>
            ))}
          </div>

          {/* Bottom row */}
          <div className="grid grid-cols-2 gap-3 w-full md:flex md:w-auto md:gap-6 justify-center items-center mt-3 md:mt-0">
            {bottomUnits.map((unit) => (
              <div
                key={unit.label}
                className="bg-white/70 rounded-xl py-3 px-6 shadow-md flex flex-col items-center justify-center w-full border-1 border-peach"
              >
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={unit.value}
                    initial={{ rotateX: 90, opacity: 0 }}
                    animate={{ rotateX: 0, opacity: 1 }}
                    exit={{ rotateX: -90, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="text-3xl md:text-6xl font-bold text-gray-900"
                  >
                    {unit.value.toString().padStart(2, '0')}
                  </motion.div>
                </AnimatePresence>
                <div className="text-sm md:text-lg text-gray-700 mt-1">{unit.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
