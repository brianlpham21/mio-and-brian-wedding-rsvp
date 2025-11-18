'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function WeddingInfoImages() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const fadeOut = useTransform(scrollYProgress, [0.85, 1], [1, 0]);

  const [topImage, setTopImage] = useState<'first' | 'second'>('second');

  const bringToFront = (image: 'first' | 'second') => {
    setTopImage(image);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      style={{ opacity: fadeOut }}
      className="relative w-full h-80 md:h-full rounded-2xl overflow-visible"
    >
      {/* Bottom Image */}
      <motion.div
        className="absolute top-12 left-0 right-12 bottom-0 rounded-2xl shadow-md cursor-pointer"
        whileHover={{ scale: 1.03 }}
        drag
        dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
        dragElastic={0.2}
        style={{ zIndex: topImage === 'first' ? 2 : 1 }}
        onClick={() => bringToFront('first')}
      >
        <Image src="/venue.png" alt="Venue 1" fill className="object-cover rounded-2xl" priority />
      </motion.div>

      {/* Top Image */}
      <motion.div
        className="absolute top-0 left-12 right-0 bottom-12 rounded-2xl shadow-lg cursor-pointer overflow-hidden"
        whileHover={{ scale: 1.03 }}
        drag
        dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
        dragElastic={0.2}
        style={{ zIndex: topImage === 'second' ? 2 : 1 }}
        onClick={() => bringToFront('second')}
      >
        <Image
          src="/photoshoot-main.jpg"
          alt="Venue 2"
          fill
          className="object-cover rounded-2xl"
          style={{
            transform: 'scale(1.1)',
            transformOrigin: 'center center',
          }}
          priority
        />
      </motion.div>
    </motion.div>
  );
}
