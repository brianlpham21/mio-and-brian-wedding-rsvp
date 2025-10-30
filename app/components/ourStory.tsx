'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function OurStory() {
  return (
    <section
      id="our-story"
      className="w-full relative flex flex-col md:flex-row justify-center items-center px-6 sm:px-12 py-20 gap-10"
    >
      {/* Text Column */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="flex-1 max-w-3xl relative z-10 text-center md:text-left"
      >
        <h2
          className="text-5xl sm:text-6xl text-gray-800 mb-6 tracking-tight"
          style={{ fontFamily: 'Brother, serif', fontSize: 'clamp(4rem, 6vw, 5.5rem)' }}
        >
          Our Story
        </h2>
        <p className="text-gray-600 text-lg sm:text-xl leading-relaxed">
          It all began with a chance encounter in Los Angeles — two paths crossing unexpectedly,
          quickly becoming one journey. Over the years, we’ve shared countless adventures, laughter,
          and dreams that brought us closer with each passing moment.
        </p>
        <p className="text-gray-600 text-lg sm:text-xl leading-relaxed mt-6">
          Now, we can’t wait to celebrate this next chapter surrounded by our favorite people. Thank
          you for being part of our story — the beginning of our forever.
        </p>
      </motion.div>

      {/* Circular Cutout Image with Shadow */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="flex-1 max-w-xs relative z-10"
      >
        {/* Circle container with hover animation */}
        <motion.div
          whileHover={{ scale: 1.01, boxShadow: '0 10px 15px rgba(0,0,0,0.3)' }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="w-64 h-64 md:w-72 md:h-72 mx-auto rounded-full overflow-hidden relative shadow-md transition-shadow duration-300 ease-out"
        >
          <Image
            src="/story.jpg"
            alt="Mio & Brian"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 16rem, 18rem"
            priority
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
