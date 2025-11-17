'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';

export function renderGiftLink(translation: string) {
  const linkHTML = `
    <a
      href="https://minted.sendbirdie.com/r/mioandbrian?cko=0"
      target="_blank"
      rel="noopener noreferrer"
      class="text-blue-600 underline inline-flex items-center gap-1"
    >
      Minted
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        class="w-4 h-4"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M5 19L19 5M5 5h14v14" />
      </svg>
    </a>
  `;

  return translation.replace(/Minted/g, linkHTML);
}

export default function AdditionalDetails({ selectedLang }: { selectedLang: { code: string } }) {
  const { t } = useTranslation({ locale: selectedLang.code });
  const details = [
    {
      title: t('dress-code-title'),
      description: t('dress-code-description'),
    },
    {
      title: t('parking-title'),
      description: t('parking-description'),
    },
    {
      title: t('reception-menu-title'),
      description: t('reception-menu-description'),
    },
    {
      title: t('travel-title'),
      description: t('travel-description'),
    },
    {
      title: t('kids-title'),
      description: t('kids-description'),
    },
    {
      title: t('gifts-title'),
      description: renderGiftLink(t('gifts-description')),
    },
  ];

  const headerFont =
    selectedLang.code === 'vi'
      ? { fontSize: 'clamp(3rem, 4vw, 4rem)', fontStyle: 'italic', fontWeight: '500' }
      : { fontFamily: 'Brother, serif', fontSize: 'clamp(4rem, 6vw, 5.5rem)' };

  return (
    <section
      id="details"
      className="w-full bg-pastel-green-25 py-12 md:py-16 px-6 sm:px-8 md:px-12 text-gray-800"
    >
      <div className="max-w-5xl mx-auto text-center mb-8">
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

      <div className="grid md:grid-cols-2 gap-3 max-w-5xl mx-auto">
        {details.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl shadow-sm px-6 py-4 border border-gray-100 text-left"
          >
            <div className="flex items-center gap-3 mb-1">
              <h3 className="text-lg font-medium text-black">{item.title}</h3>
            </div>
            <p
              className="text-gray-700 leading-relaxed text-sm"
              dangerouslySetInnerHTML={{ __html: item.description }}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
