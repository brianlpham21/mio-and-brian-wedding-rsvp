import { capitalizeWords } from '../../helpers/capitalize';
import { GuestsDisplayProps } from '../../types';

export default function GuestsDisplay({ party }: GuestsDisplayProps) {
  if (party.length < 1) return null;

  return (
    <div className="w-full max-w-md mx-auto mb-6 text-center text-gray-700">
      <p className="text-sm sm:text-base font-medium">
        <span className="font-semibold text-gray-800">Guests:</span>{' '}
        {party.map((name) => capitalizeWords(name)).join(', ')}
      </p>
    </div>
  );
}
