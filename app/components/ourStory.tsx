'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';

export default function OurStory({ selectedLang }: { selectedLang: { code: string } }) {
  const { t } = useTranslation({ locale: selectedLang.code });

  const headerFont =
    selectedLang.code === 'vi'
      ? { fontSize: 'clamp(3rem, 4vw, 4rem)', fontStyle: 'italic', fontWeight: '500' }
      : selectedLang.code === 'ja'
        ? { fontFamily: 'Norway, serif', fontSize: 'clamp(4rem, 6vw, 5.25rem)' }
        : { fontFamily: 'Norway, serif', fontSize: 'clamp(4rem, 6vw, 5.5rem)' };

  return (
    <section
      id="our-story"
      className="w-full relative flex flex-col md:flex-row justify-center items-center px-6 sm:px-12 py-17 gap-10"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="flex-1 max-w-3xl relative z-10 text-center md:text-left"
      >
        <h2 className="text-5xl sm:text-6xl text-gray-800 mb-6" style={headerFont}>
          {t('our-story')}
        </h2>
        <p className="text-gray-600 text-lg leading-relaxed">
          {t('our-story-paragraph-1')}
          <br />
          <br />
          {t('our-story-paragraph-2')}
          <br />
          <br />
        </p>
        <p
          className="text-gray-600 text-lg leading-relaxed"
          dangerouslySetInnerHTML={{ __html: t('our-story-paragraph-3') }}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="flex-1 w-full md:max-w-xs relative z-10 flex flex-col items-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 30, boxShadow: '0px 0px 0px rgba(0,0,0,0)' }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          whileHover={{ scale: 1.02, boxShadow: '10px 15px 15px rgba(0,0,0,0.2)' }}
          transition={{ duration: 0.8 }}
          className="w-full aspect-square rounded-full overflow-hidden shadow-md relative"
        >
          <Image
            src="/photoshoot-window-web.jpg"
            alt="Wedding detail"
            fill
            className="object-cover"
            style={{ objectPosition: '10% 65%' }}
            sizes="(max-width: 768px) 320px, 360px"
            priority
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
