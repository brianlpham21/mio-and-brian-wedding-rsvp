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
    <div>
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={bringingPlusOne}
          onChange={(e) => setBringingPlusOne(e.target.checked)}
          className="w-4 h-4"
        />
        I will be bringing a plus one
      </label>

      {bringingPlusOne && (
        <div className="flex flex-col gap-2 mt-2">
          <input
            type="text"
            value={plusOneFirstName}
            onChange={(e) => setPlusOneFirstName(e.target.value)}
            placeholder="First Name"
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          />
          <input
            type="text"
            value={plusOneLastName}
            onChange={(e) => setPlusOneLastName(e.target.value)}
            placeholder="Last Name"
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          />
        </div>
      )}
    </div>
  );
}
