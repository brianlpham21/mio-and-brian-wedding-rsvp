'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';

export default function OurStory({ selectedLang }: { selectedLang: { code: string } }) {
  const { t } = useTranslation({ locale: selectedLang.code });

  const headerFont =
    selectedLang.code === 'vi'
      ? { fontSize: 'clamp(3rem, 4vw, 4rem)', fontStyle: 'italic', fontWeight: '500' }
      : { fontFamily: 'Norway, serif', fontSize: 'clamp(4rem, 6vw, 5.5rem)' };

  return (
    <section
      id="our-story"
      className="w-full relative flex flex-col md:flex-row justify-center items-center px-6 sm:px-12 py-17 gap-16"
    >
      {/* Text Column */}
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
        {/* Circle Image */}
        <motion.div
          // whileHover={{ scale: 1.02, boxShadow: '10px 20px 15px rgba(0,0,0,.7)' }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          // style={{ boxShadow: '10px 20px 15px rgba(0,0,0,0.5)' }}
          className="w-64 h-64 md:w-50 md:h-50 rounded-full overflow-hidden relative shadow-md transition-shadow duration-300 ease-out mb-8"
        >
          <Image
            src="/photoshoot-ring.png"
            alt="Mio & Brian"
            fill
            className="object-cover scale-125"
            sizes="(max-width: 768px) 256px, 288px"
            priority
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
          className="w-full aspect-[3/4] rounded-xl overflow-hidden shadow-md relative"
        >
          <Image
            src="/photoshoot-window-web.jpg"
            alt="Wedding detail"
            fill
            className="object-cover"
            // style={{ objectPosition: '50% 10%' }}
            sizes="(max-width: 768px) 320px, 360px"
            priority
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
