'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';

export default function WeddingInfo({ selectedLang }: { selectedLang: { code: string } }) {
  const { t } = useTranslation({ locale: selectedLang.code });

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Detect mobile view
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // run on mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Animations (only apply horizontal movement if not mobile)
  const leftX = useTransform(scrollYProgress, [0.7, 1], ['0%', isMobile ? '0%' : '-60%']);
  const rightX = useTransform(scrollYProgress, [0.7, 1], ['0%', isMobile ? '0%' : '60%']);
  const fadeOut = useTransform(scrollYProgress, [0.85, 1], [1, 0]);

  const headerFont =
    selectedLang.code === 'vi'
      ? { fontSize: 'clamp(3rem, 4vw, 4rem)', fontStyle: 'italic', fontWeight: '500' }
      : { fontFamily: 'Brother, serif', fontSize: 'clamp(4rem, 6vw, 5.5rem)' };

  return (
    <section
      ref={ref}
      id="info"
      className="relative w-full sm:px-8 md:px-12 text-gray-800 pt-16 md:pt-20 pb-2 md:pb-6 lg:pb-10 px-6 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-12 leading-[1em]"
          style={headerFont}
        >
          {t('wedding-day-information')}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left Column — Image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            style={{ x: leftX, opacity: fadeOut }}
            className="relative w-full h-80 md:h-full rounded-2xl overflow-hidden shadow-md group"
          >
            <div className="absolute inset-0 transform transition-transform duration-700 ease-out group-hover:scale-105">
              <Image
                src="/venue.png"
                alt="Mio and Brian's wedding venue"
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>

          {/* Right Column — Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            style={{ x: rightX, opacity: fadeOut }}
            className="bg-pastel-green-25 rounded-2xl shadow-sm p-6"
          >
            <h3 className="text-xl font-semibold mb-3 text-black">{t('ceremony')}</h3>
            <p className="text-gray-700 mb-2">
              <strong>{t('date')}:</strong> {t('wedding-date')}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>{t('time')}:</strong> 4:00 PM
            </p>
            <p className="text-gray-700 mb-2">
              <strong>{t('location')}:</strong> 802 Mateo St, Los Angeles, CA 90021
            </p>
            <p className="text-gray-600 mt-4">{t('ceremony-details')}</p>

            <hr className="my-5 h-0.5 border-t-0 bg-neutral-100 dark:bg-black/5" />

            <h3 className="text-xl font-semibold mb-3 text-black">{t('reception')}</h3>
            <p className="text-gray-700 mb-2">
              <strong>{t('time')}:</strong> 6:00 PM – 11:00 PM
            </p>
            <p className="text-gray-700 mb-2">
              <strong>{t('location')}:</strong> 802 Mateo St, Los Angeles, CA 90021
            </p>
            <p className="text-gray-600 mt-4">{t('reception-details')}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
