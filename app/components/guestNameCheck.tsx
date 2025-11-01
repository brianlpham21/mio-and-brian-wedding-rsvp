'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import { GuestNameCheckProps } from '../types';

export default function GuestNameCheck({
  selectedLang,
  nameAvailable,
  name,
  setName,
  fetchGuest,
  loading,
}: GuestNameCheckProps) {
  const { t } = useTranslation({ locale: selectedLang.code });

  if (nameAvailable) return null;
  const showError = nameAvailable === false;

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (name && !loading) fetchGuest();
        }}
        className="w-full max-w-md mx-auto flex flex-col sm:flex-row items-stretch gap-3"
      >
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t('enter-your-full-name')}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700 placeholder-gray-400 
               focus:border-pink-400 focus:ring-2 focus:ring-pink-300 focus:outline-none transition bg-white"
        />

        {/* Framer Motion Button */}
        <motion.button
          type="submit"
          disabled={!name || loading}
          initial={false}
          animate={{
            backgroundColor: loading ? '#F9A8D4' : '#1A1A1A',
            scale: loading ? 0.98 : 1,
          }}
          transition={{ duration: 0.3 }}
          className={`relative flex items-center justify-center gap-2 rounded-lg px-5 py-3 font-medium text-white 
            focus:outline-none focus:ring-2 focus:ring-pink-300 transition disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {/* Spinner fade-in */}
          <AnimatePresence mode="wait" initial={false}>
            {loading && (
              <motion.span
                key="spinner"
                className="h-4 w-4 rounded-full border-2 border-white border-t-transparent"
                animate={{ rotate: 360 }}
                transition={{
                  repeat: Infinity,
                  ease: 'linear',
                  duration: 1,
                }}
              />
            )}
          </AnimatePresence>

          {/* Text crossfade */}
          <div className="relative overflow-hidden w-16 text-center">
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.span
                  key="loading"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="block"
                >
                  {t('loading')}
                </motion.span>
              ) : (
                <motion.span
                  key="rsvp"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="block"
                >
                  {t('rsvp').toUpperCase()}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </motion.button>
      </form>

      {/* Error message */}
      {showError && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-red-500 text-sm mt-2"
        >
          Sorry, we couldn&apos;t find your name in the guest list. Please double-check the spelling
          or contact us.
        </motion.p>
      )}
    </div>
  );
}
