import { capitalizeWords } from '../helpers/capitalize';

type GuestsDisplayProps = {
  party: string[];
};

export default function GuestsDisplay({ party }: GuestsDisplayProps) {
  if (party.length < 1) return null;

  return (
    <div className="mt-4 text-gray-700 dark:text-gray-300">
      Guests: {party.map((name) => capitalizeWords(name)).join(', ')}
    </div>
  );
}
