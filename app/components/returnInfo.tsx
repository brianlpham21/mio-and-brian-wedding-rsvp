'use client';

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion, useAnimation, Variants } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';

export default function ReturnInfo({ selectedLang }: { selectedLang: { code: string } }) {
  const { t } = useTranslation({ locale: selectedLang.code });

  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 1, triggerOnce: true });

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: 'easeOut' } },
  };

  useEffect(() => {
    if (inView) controls.start('visible');
  }, [controls, inView]);

  return (
    <section className="w-full py-16 px-6 sm:px-8 md:px-12 text-gray-800 overflow-hidden relative">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={containerVariants}
        className="max-w-3xl mx-auto text-center relative z-10"
      >
        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl text-gray-700 leading-relaxed"
        >
          {t('thank-you-message')}
        </motion.p>
      </motion.div>
    </section>
  );
}
