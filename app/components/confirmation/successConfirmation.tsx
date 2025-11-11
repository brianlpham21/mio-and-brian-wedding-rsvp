import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';

export function renderGiftLink(translation: string) {
  const parts = translation.split('Minted');

  return (
    <>
      {parts.map((part, index) => (
        <React.Fragment key={index}>
          {part}
          {index < parts.length - 1 && (
            <a
              href="https://minted.sendbirdie.com/r/mioandbrian?cko=0"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline inline-flex items-center gap-1"
            >
              Minted
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 19L19 5M5 5h14v14" />
              </svg>
            </a>
          )}
        </React.Fragment>
      ))}
    </>
  );
}

export default function SuccessConfirmation({
  selectedLang,
  startOver,
}: {
  selectedLang: { code: string; name: string; flag: string };
  startOver: () => void;
}) {
  const { t } = useTranslation({ locale: selectedLang.code });

  return (
    <div className="flex flex-col items-center justify-center text-center bg-white rounded-lg shadow-md p-8 mt-8 max-w-md mx-auto">
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
        <svg
          className="w-8 h-8 text-green-600"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h2 className="text-2xl font-semibold text-gray-800 mb-2">{t('rsvp-submitted')}!</h2>
      <p className="text-gray-600 mb-6">{t('rsvp-success-message')}</p>

      <p className="text-gray-700 mb-4 text-sm">{renderGiftLink(t('gift-message'))}</p>

      <button
        onClick={startOver}
        className="px-6 py-3 rounded-lg font-medium text-white bg-pastel-green-250 hover:bg-black transition focus:outline-none focus:ring-2 focus:ring-pink-300 focus:ring-offset-2 cursor-pointer bg-gray-800"
      >
        {t('back-to-start')}
      </button>
    </div>
  );
}
