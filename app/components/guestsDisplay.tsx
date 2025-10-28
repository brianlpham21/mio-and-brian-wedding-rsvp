import { capitalizeWords } from '../helpers/capitalize';
import { GuestsDisplayProps } from '../types';

export default function GuestsDisplay({ party, startOver }: GuestsDisplayProps) {
  if (party.length < 1) return null;

  return (
    <div className="w-full max-w-md mx-auto mt-6 px-4 py-3 bg-white rounded-lg shadow-sm text-center text-gray-700">
      <p className="text-sm sm:text-base font-medium mb-4">
        <span className="font-semibold text-gray-800">Guests:</span>{' '}
        {party.map((name) => capitalizeWords(name)).join(', ')}
      </p>

      <button
        onClick={startOver}
        className="mt-2 w-full sm:w-auto px-5 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium transition"
      >
        Start Over
      </button>
    </div>
  );
}
