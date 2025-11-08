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

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <div className="flex flex-col items-center w-full bg-gray-200 py-12">
      <h2 className="text-xl md:text-4xl font-semibold mb-5 text-gray-800">
        Counting Down to ‘I Do’
      </h2>

      {/* Countdown Units */}
      <div className="flex gap-2 justify-center items-center text-center font-mono">
        {timeUnits.map((unit) => (
          <div key={unit.label} className="bg-white rounded-lg py-2 px-4">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={unit.value}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
                className="text-4xl md:text-5xl font-bold text-gray-900"
              >
                {unit.value.toString().padStart(2, '0')}
              </motion.div>
            </AnimatePresence>
            <div className="text-sm md:text-base text-gray-600">{unit.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
