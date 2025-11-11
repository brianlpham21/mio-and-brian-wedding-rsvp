'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CountdownProps {
  selectedLang: { code: string; name: string; flag: string };
}

export default function Countdown({ selectedLang }: CountdownProps) {
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
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
  ];

  const bottomUnits = [
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <section
      className="relative w-screen py-20 flex flex-col items-center justify-center text-center text-gray-900"
      style={{
        backgroundImage: "url('/dinner.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* overlay */}
      <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px]" />

      <div className="relative z-10 flex flex-col items-center">
        <h2
          className="mb-8 text-gray-900 drop-shadow-sm leading-[1em]"
          style={{ fontFamily: 'Brother, serif', fontSize: 'clamp(4.25rem, 8vw, 6rem)' }}
        >
          Counting Down to &quot;I Do&quot;
        </h2>

        {/* Countdown container */}
        <div className="flex flex-col md:flex-row md:gap-6 font-mono justify-center items-center w-full max-w-3xl px-6 md:px-0">
          {/* Top row (Days + Hours) */}
          <div className="grid grid-cols-2 gap-3 w-full md:flex md:w-auto md:gap-6 justify-center items-center">
            {topUnits.map((unit) => (
              <div
                key={unit.label}
                className="bg-white/90 rounded-xl py-3 px-6 shadow-md flex flex-col items-center justify-center w-full"
              >
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={unit.value}
                    initial={{ rotateX: 90, opacity: 0 }}
                    animate={{ rotateX: 0, opacity: 1 }}
                    exit={{ rotateX: -90, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="text-5xl md:text-6xl font-bold text-gray-900"
                  >
                    {unit.value.toString().padStart(2, '0')}
                  </motion.div>
                </AnimatePresence>
                <div className="text-sm md:text-lg text-gray-700 mt-1">{unit.label}</div>
              </div>
            ))}
          </div>

          {/* Bottom row (Minutes + Seconds) */}
          <div className="grid grid-cols-2 gap-3 w-full md:flex md:w-auto md:gap-6 justify-center items-center mt-3 md:mt-0">
            {bottomUnits.map((unit) => (
              <div
                key={unit.label}
                className="bg-white/90 rounded-xl py-3 px-6 shadow-md flex flex-col items-center justify-center w-full"
              >
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={unit.value}
                    initial={{ rotateX: 90, opacity: 0 }}
                    animate={{ rotateX: 0, opacity: 1 }}
                    exit={{ rotateX: -90, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="text-5xl md:text-6xl font-bold text-gray-900"
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
