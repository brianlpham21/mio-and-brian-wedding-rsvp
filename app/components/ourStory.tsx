'use client';

import { motion } from 'framer-motion';

export default function OurStory() {
  return (
    <section
      id="our-story"
      className="w-full relative flex flex-col justify-center items-center text-center px-6 sm:px-12 py-20"
    >
      {/* Background accent (optional subtle texture or overlay) */}
      <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5 pointer-events-none" />

      {/* Animated container */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="max-w-3xl mx-auto relative z-10"
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
    </section>
  );
}
