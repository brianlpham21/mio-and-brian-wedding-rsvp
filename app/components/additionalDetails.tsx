'use client';

import { useTranslation } from '@/hooks/useTranslation';
import { motion } from 'framer-motion';

const details = [
  {
    title: 'Dress Code',
    description:
      'Formal attire is requested. Gentlemen, please wear suits or dress shirts and ties. Ladies, dresses or formal evening wear are perfect.',
  },
  {
    title: 'Parking & Transportation',
    description:
      'Complimentary parking is available at the venue. Rideshare is encouraged if you plan to enjoy drinks during the reception.',
  },
  {
    title: 'Accommodations',
    description:
      'We have reserved a room block at The Langham Hotel in Pasadena. Mention “Mio & Brian Wedding” when booking for the group rate.',
  },
  {
    title: 'Gifts',
    description:
      'Your presence means the world to us! For those who wish to give a gift, we are registered at Crate & Barrel and Zola.',
  },
];

export default function AdditionalDetails({ selectedLang }: { selectedLang: { code: string } }) {
  const { t } = useTranslation({ locale: selectedLang.code });

  const headerFont =
    selectedLang.code === 'vi'
      ? { fontSize: 'clamp(3rem, 4vw, 4rem)', fontStyle: 'italic', fontWeight: '500' }
      : { fontFamily: 'Brother, serif', fontSize: 'clamp(4rem, 6vw, 5.5rem)' };

  return (
    <section
      id="details"
      className="w-full bg-pastel-green-25 py-12 md:py-16 px-6 sm:px-8 md:px-12 text-gray-800"
    >
      <div className="max-w-5xl mx-auto text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-black leading-[1em] mb-3"
          style={headerFont}
        >
          {t('additional-details')}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-lg text-gray-600 max-w-2xl mx-auto"
        >
          {t('additional-details-subheader')}
        </motion.p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {details.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 text-left"
          >
            <div className="flex items-center gap-3 mb-3">
              <h3 className="text-xl font-medium text-black">{item.title}</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
