'use client';

import { motion, useAnimation, Variants } from 'framer-motion';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

export default function ReturnInfoSection() {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });

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
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  useEffect(() => {
    if (inView) controls.start('visible');
  }, [controls, inView]);

  return (
    <section className="w-full bg-pink-50 py-16 px-6 sm:px-8 md:px-12 text-gray-800 overflow-hidden">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={containerVariants}
        className="max-w-3xl mx-auto text-center"
      >
        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl text-gray-700 leading-relaxed"
        >
          Thank you for celebrating with us! After the wedding, please return to this website to see
          all the photos and relive the memories from our special day.
        </motion.p>
      </motion.div>
    </section>
  );
}
