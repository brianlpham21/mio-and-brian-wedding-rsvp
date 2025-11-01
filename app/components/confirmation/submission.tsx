import { motion } from 'framer-motion';

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

  // Check if all contact info fields are filled
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

  // Determine the error message
  let errorMessage = '';
  if (attendingWithNoGuestsChecked) {
    errorMessage = t('please-select-at-least-one-guest');
  }

  const iconVariants = {
    initial: { rotate: 0 },
    hover: { rotate: 180 },
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3 mt-6 text-center">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
        <button
          disabled={isDisabled}
          onClick={handleSubmit}
          className={`flex items-center justify-center gap-2 rounded-lg px-6 py-3 font-medium text-white 
                  focus:outline-none focus:ring-2 focus:ring-pink-300 focus:ring-offset-2 transition 
                  disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer bg-gray-800
                  ${submitting ? 'bg-pink-300 cursor-not-allowed' : 'bg-pastel-green-250 hover:bg-black'}`}
        >
          {submitting && (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
          )}
          {submitting ? t('submitting') : t('submit')}
        </button>

        <motion.button
          onClick={startOver}
          initial="initial"
          whileHover="hover" // this triggers the child motion.svg variants
          className="group flex items-center justify-center rounded-lg px-6 py-3 font-medium text-gray-700 
                 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300
                 focus:ring-offset-2 transition whitespace-nowrap cursor-pointer gap-2"
          aria-label={t('start-over')}
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

      {/* Error Message Display */}
      {errorMessage && <p className="text-red-600 text-xs mt-2 px-4">{errorMessage}</p>}
    </div>
  );
}
