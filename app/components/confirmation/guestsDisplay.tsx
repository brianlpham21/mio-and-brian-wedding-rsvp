import { motion } from 'framer-motion';
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
      <motion.p layout className="text-sm sm:text-base font-medium">
        <span className="font-semibold text-gray-800">
          {isSolo ? t('your-rsvp') : t('your-rsvp-group')}:
        </span>
      </motion.p>

      <motion.p
        layout
        key={isSolo ? 'solo-msg' : 'group-msg'} // ensures AnimatePresence detects change
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="text-sm sm:text-base mb-2"
      >
        <span className="font-normal text-gray-800">
          {isSolo ? t('solo-rsvp-message') : t('group-rsvp-message')}
        </span>
      </motion.p>

      {!isSolo && (
        <div className="flex flex-col gap-2">
          {party.map((name, index) => {
            const isDisabled = attending === false;
            const isChecked = selectedGuests.includes(name);

            return (
              <motion.label
                key={index}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`flex items-center gap-2 text-sm sm:text-base justify-center cursor-pointer`}
              >
                <input
                  disabled={isDisabled}
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleGuest(name)}
                  className="h-4 w-4 accent-black focus:ring-pink-300"
                />
                <motion.span
                  layout
                  animate={{
                    color: isDisabled ? '#9CA3AF' : '#374151', // gray-400 vs gray-700
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {capitalizeWords(name)}
                </motion.span>
              </motion.label>
            );
          })}
        </div>
      )}
    </div>
  );
}
