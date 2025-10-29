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
    <div className="w-full mt-4">
      {/* Checkbox */}
      <label className="flex items-center gap-2 text-gray-800 cursor-pointer">
        <input
          type="checkbox"
          checked={bringingPlusOne}
          onChange={(e) => setBringingPlusOne(e.target.checked)}
          className="w-4 h-4 text-pastel-green-250 rounded focus:ring-pink-300"
        />
        <span className="text-sm sm:text-base">I will be bringing a plus one</span>
      </label>

      {/* Plus One Inputs */}
      <div className="flex flex-col gap-3 mt-4">
        <input
          type="text"
          value={plusOneFirstName}
          onChange={(e) => setPlusOneFirstName(e.target.value)}
          placeholder="First Name"
          disabled={!bringingPlusOne}
          className={`w-full rounded-lg border px-4 py-2.5 text-gray-700 placeholder-gray-400 transition 
            focus:outline-none focus:ring-2 
            ${
              bringingPlusOne
                ? 'border-gray-300 focus:border-pink-400 focus:ring-pink-200 bg-white'
                : 'border-gray-200 bg-gray-100 cursor-not-allowed opacity-60'
            }`}
        />
        <input
          type="text"
          value={plusOneLastName}
          onChange={(e) => setPlusOneLastName(e.target.value)}
          placeholder="Last Name"
          disabled={!bringingPlusOne}
          className={`w-full rounded-lg border px-4 py-2.5 text-gray-700 placeholder-gray-400 transition 
            focus:outline-none focus:ring-2 
            ${
              bringingPlusOne
                ? 'border-gray-300 focus:border-pink-400 focus:ring-pink-200 bg-white'
                : 'border-gray-200 bg-gray-100 cursor-not-allowed opacity-60'
            }`}
        />
      </div>
    </div>
  );
}
