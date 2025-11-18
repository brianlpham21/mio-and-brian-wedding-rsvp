'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import WeddingInfoImages from './weddingInfoImages';

export default function WeddingInfo({ selectedLang }: { selectedLang: { code: string } }) {
  const { t } = useTranslation({ locale: selectedLang.code });

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Animations (only apply horizontal movement if not mobile)
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
          <WeddingInfoImages />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            style={{ opacity: fadeOut }}
            className="bg-peach-50 rounded-2xl shadow-sm p-6 border-1 border-pink"
          >
            <h3 className="text-xl font-semibold mb-3 text-black">{t('ceremony')}</h3>
            <p className="text-gray-700 mb-2">
              <strong>{t('date')}:</strong> {t('wedding-date')}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>{t('time')}:</strong> 5:00 PM
            </p>
            <p className="text-gray-700 mb-2">
              <strong>{t('location')}:</strong> 802 Mateo St, Los Angeles, CA 90021
            </p>
            <p
              className="text-gray-600 mt-4"
              dangerouslySetInnerHTML={{ __html: t('ceremony-details') }}
            />

            <hr className="my-6 border-t border-pink-75" />

            <h3 className="text-xl font-semibold mb-3 text-black">{t('reception')}</h3>
            <p className="text-gray-700 mb-2">
              <strong>{t('time')}:</strong> 6:30 PM – 10:00 PM
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
