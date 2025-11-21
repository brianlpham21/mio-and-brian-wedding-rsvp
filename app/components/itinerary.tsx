'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';

const itinerary = [
  {
    time: '4:30 PM',
    title: 'welcome',
    image: '/welcome.svg',
  },
  {
    time: '5:00 PM',
    title: 'ceremony',
    image: '/ceremony.svg',
  },
  {
    time: '5:30 PM',
    title: 'cocktails',
    image: '/cocktails.svg',
  },
  {
    time: '6:30 PM',
    title: 'reception',
    image: '/heartarrow.svg',
  },
];

export default function Itinerary({ selectedLang }: { selectedLang: { code: string } }) {
  const { t } = useTranslation({ locale: selectedLang.code });

  const headerFont =
    selectedLang.code === 'vi'
      ? { fontSize: 'clamp(3rem, 4vw, 4rem)', fontStyle: 'italic', fontWeight: '500' }
      : { fontFamily: 'Norway, serif', fontSize: 'clamp(4rem, 6vw, 5.5rem)' };

  return (
    <section id="itinerary" className="w-full pt-12 pb-16 px-6 sm:px-8 md:px-12 text-gray-800">
      <div className="max-w-5xl mx-auto text-center mb-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          style={headerFont}
        >
          {t('itinerary')}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-lg text-gray-600 max-w-2xl mx-auto"
        >
          {t('itinerary-subheader')}
        </motion.p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 lg:gap-8 max-w-5xl mx-auto">
        {itinerary.map((event, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.12 }}
            viewport={{ once: true }}
            className="bg-peach-50 rounded-xl shadow-sm p-4 md:p-6 border border-pink-75 text-center flex flex-col items-center"
          >
            <div className="mb-2 md:mb-4 w-14 h-14 md:w-20 md:h-20 relative">
              {event.image ? (
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  sizes="64px"
                  className="object-contain opacity-70"
                />
              ) : (
                <div className="w-12 h-12 bg-gray-200 rounded-full" />
              )}
            </div>

            <h3 className="text-gray-800 text-base md:text-lg font-medium mb-1">
              {t(event.title)}
            </h3>
            <p className="text-xs md:text-sm text-gray-500 mb-1">
              <span className="font-medium">{event.time}</span>
            </p>
            <p className="text-xs md:text-sm text-gray-700 leading-snug text-left">
              {t(`${event.title}-itinerary-description`)}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
