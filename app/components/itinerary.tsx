'use client';

import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';

const itinerary = [
  {
    time: '3:00 PM',
    title: 'welcome',
    description: 'Join us for an intimate ceremony surrounded by nature and love.',
  },
  {
    time: '4:00 PM',
    title: 'ceremony',
    description: 'Enjoy drinks and hors d’oeuvres while we take wedding photos.',
  },
  {
    time: '5:30 PM',
    title: 'cocktails',
    description: 'Let’s celebrate with dinner, speeches, and dancing!',
  },
  {
    time: '6:00 PM',
    title: 'reception',
    description: 'Help us close the night with a sparkler sendoff!',
  },
];

export default function Itinerary({ selectedLang }: { selectedLang: { code: string } }) {
  const { t } = useTranslation({ locale: selectedLang.code });

  return (
    <section id="itinerary" className="w-full py-16 px-6 sm:px-8 md:px-12 text-gray-800">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          style={{ fontFamily: 'Brother, serif', fontSize: 'clamp(4rem, 6vw, 5.5rem)' }}
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
          Here’s a look at the special moments planned for our big day.
        </motion.p>
      </div>

      <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
        {itinerary.map((event, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            viewport={{ once: true }}
            className="bg-pastel-green-25 rounded-xl shadow-sm p-6 border border-gray-100 text-center"
          >
            <h3 className="text-gray-600 tracking-[.001em] text-xl font-medium mb-1">
              {t(event.title)}
            </h3>
            <p className="text-sm text-gray-500 mb-2">
              <span className="font-medium">{event.time}</span>
            </p>
            <p className="text-gray-700 leading-relaxed text-left">{event.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
