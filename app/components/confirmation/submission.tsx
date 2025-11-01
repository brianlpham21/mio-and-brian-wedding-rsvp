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

        <button
          onClick={startOver}
          className="flex items-center justify-center rounded-lg px-6 py-3 font-medium text-gray-700 
                 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300
                 focus:ring-offset-2 transition whitespace-nowrap cursor-pointer"
        >
          {t('start-over')}
        </button>
      </div>

      {/* Error Message Display */}
      {errorMessage && <p className="text-red-600 text-xs mt-2 px-4">{errorMessage}</p>}
    </div>
  );
}
