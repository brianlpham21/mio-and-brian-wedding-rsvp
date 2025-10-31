import { useTranslation } from '@/hooks/useTranslation';
import { capitalizeWords } from '../../helpers/capitalize';
import { GuestsDisplayProps } from '../../types';

export default function GuestsDisplay({ selectedLang, party }: GuestsDisplayProps) {
  const { t } = useTranslation({ locale: selectedLang.code });

  if (party.length < 1) return null;

  const isSolo = party.length === 1;
  return (
    <div className="w-full max-w-md mx-auto mb-6 text-center text-gray-700">
      <p className="text-sm sm:text-base font-medium">
        <span className="font-semibold text-gray-800">
          {isSolo ? t('your-rsvp') : t('your-rsvp-group')}:
        </span>
      </p>
      <p className="text-sm sm:text-base mb-2">
        <span className="font-normal text-gray-800">
          {isSolo ? t('solo-rsvp-message') : t('group-rsvp-message')}
        </span>
      </p>
      {!isSolo && (
        <div className="flex flex-col gap-1">
          {party.map((name, index) => (
            <p key={index} className="text-gray-700 text-sm sm:text-base">
              {capitalizeWords(name)}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
