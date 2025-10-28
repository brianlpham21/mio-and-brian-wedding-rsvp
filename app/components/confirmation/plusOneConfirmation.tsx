import { PlusOneConfirmationProps } from '@/app/types';

export default function PlusOneConfirmation({
  attending,
  plusOne,
  setBringingPlusOne,
  bringingPlusOne,
  plusOneFirstName,
  setPlusOneFirstName,
  plusOneLastName,
  setPlusOneLastName,
}: PlusOneConfirmationProps) {
  if (!attending || !plusOne) return null;

  return (
    <div className="w-full">
      {/* Checkbox */}
      <label className="flex items-center gap-2 text-gray-800 cursor-pointer">
        <input
          type="checkbox"
          checked={bringingPlusOne}
          onChange={(e) => setBringingPlusOne(e.target.checked)}
          className="w-4 h-4 text-pink-500 rounded focus:ring-pink-300"
        />
        <span className="text-sm sm:text-base">I will be bringing a plus one</span>
      </label>

      {/* Plus One Inputs */}
      {bringingPlusOne && (
        <div className="flex flex-col gap-3 mt-4">
          <input
            type="text"
            value={plusOneFirstName}
            onChange={(e) => setPlusOneFirstName(e.target.value)}
            placeholder="First Name"
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-700 placeholder-gray-400
                   focus:border-pink-400 focus:ring-2 focus:ring-pink-200 focus:outline-none transition"
          />
          <input
            type="text"
            value={plusOneLastName}
            onChange={(e) => setPlusOneLastName(e.target.value)}
            placeholder="Last Name"
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-700 placeholder-gray-400
                   focus:border-pink-400 focus:ring-2 focus:ring-pink-200 focus:outline-none transition"
          />
        </div>
      )}
    </div>
  );
}
