import { motion, AnimatePresence } from 'framer-motion';
import { SubmissionProps } from '@/app/types';
import { useTranslation } from '@/hooks/useTranslation';

export default function Submission({
  selectedLang,
  nameAvailable,
  attending,
  noGuestsSelected,
  contactInfo,
  submitting,
  handleSubmit,
  startOver,
}: SubmissionProps) {
  const { t } = useTranslation({ locale: selectedLang.code });

  const isContactComplete =
    contactInfo?.email &&
    contactInfo?.addressLine &&
    contactInfo?.city &&
    contactInfo?.state &&
    contactInfo?.zip;

  const attendingWithNoGuestsChecked = !!attending && noGuestsSelected;

  const isDisabled =
    !nameAvailable ||
    attending === null ||
    submitting ||
    (attending === true && !isContactComplete) ||
    attendingWithNoGuestsChecked;

  let errorMessage = '';
  if (attendingWithNoGuestsChecked) {
    errorMessage = t('please-select-at-least-one-guest');
  }

  const iconVariants = {
    initial: { rotate: 0 },
    hover: { rotate: 180 },
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3 text-center w-full max-w-md mx-auto mt-6">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full items-stretch">
        <motion.button
          disabled={isDisabled}
          onClick={handleSubmit}
          layout
          className={`flex items-center justify-center gap-2 rounded-lg px-6 py-3 font-medium text-white
            focus:outline-none focus:ring-2 focus:ring-pink-300 focus:ring-offset-2 transition
            disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer bg-gray-800
            ${submitting ? 'bg-pink-300 cursor-not-allowed' : 'bg-pastel-green-250 hover:bg-black'}`}
        >
          <AnimatePresence mode="wait" initial={false}>
            {submitting ? (
              <motion.span
                key="spinner"
                className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"
                initial={{ opacity: 0, rotate: 0 }}
                animate={{ opacity: 1, rotate: 360 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, repeat: Infinity, ease: 'linear' }}
              />
            ) : (
              <motion.span
                key="text"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {t('submit')}
              </motion.span>
            )}
          </AnimatePresence>

          {submitting && (
            <motion.span
              key="loading-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="ml-1"
            >
              {t('submitting')}
            </motion.span>
          )}
        </motion.button>

        <motion.button
          onClick={startOver}
          initial="initial"
          whileHover="hover"
          className="group flex items-center justify-center rounded-lg px-6 py-3 font-medium text-gray-700
                     bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300
                     focus:ring-offset-2 transition whitespace-nowrap cursor-pointer gap-2"
          aria-label={t('start-over')}
          layout
        >
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            fill="none"
            className="w-4 h-4"
            variants={iconVariants}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 4v6h6M20 20v-6h-6M4 10a8 8 0 0114.32-4.906M20 14a8 8 0 01-14.32 4.906"
            />
          </motion.svg>
          <span>{t('start-over')}</span>
        </motion.button>
      </div>

      {/* Animate error message height & opacity */}
      <AnimatePresence>
        {errorMessage && (
          <motion.p
            key="error"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="text-red-600 text-xs mt-2 px-4 overflow-hidden"
          >
            {errorMessage}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
