import { useTranslation } from '@/hooks/useTranslation';
import { capitalizeWords } from '../../helpers/capitalize';
import { GuestsDisplayProps } from '../../types';

export default function GuestsDisplay({
  attending,
  selectedLang,
  party,
  selectedGuests,
  setSelectedGuests,
}: GuestsDisplayProps) {
  const { t } = useTranslation({ locale: selectedLang.code });

  if (party.length < 1) return null;

  const isSolo = party.length === 1;

  const toggleGuest = (name: string) => {
    if (selectedGuests.includes(name)) {
      setSelectedGuests(selectedGuests.filter((n) => n !== name));
    } else {
      setSelectedGuests([...selectedGuests, name]);
    }
  };

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
        <div className="flex flex-col gap-2">
          {party.map((name, index) => (
            <label
              key={index}
              className={`flex items-center gap-2 text-sm sm:text-base justify-center ${attending || attending === null ? 'text-gray-700' : 'text-gray-400'}`}
            >
              <input
                disabled={attending === false}
                type="checkbox"
                checked={selectedGuests.includes(name)}
                onChange={() => toggleGuest(name)}
                className="h-4 w-4 accent-pastel-green focus:ring-pink-300"
              />
              {capitalizeWords(name)}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
