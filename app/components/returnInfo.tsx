'use client';

import { motion, useAnimation, Variants } from 'framer-motion';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

export default function ReturnInfo() {
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
          Thank you for celebrating with us! After the wedding, please return to this website to see
          all the photos and relive the memories from our special day.
        </motion.p>
      </motion.div>

      {/* Fixed bottom-right PNG */}
      <div className="absolute bottom-3 right-3 z-20">
        <Image src="/maggie-face.png" alt="Maggie" width={30} height={30} />
      </div>
    </section>
  );
}
