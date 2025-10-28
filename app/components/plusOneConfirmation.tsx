type PlusOneConfirmationProps = {
  bringingPlusOne: boolean;
  plusOneFirst: string;
  setPlusOneFirst: (name: string) => void;
  plusOneLast: string;
  setPlusOneLast: (name: string) => void;
};

export default function PlusOneConfirmation({
  bringingPlusOne,
  plusOneFirst,
  setPlusOneFirst,
  plusOneLast,
  setPlusOneLast,
}: PlusOneConfirmationProps) {
  if (!bringingPlusOne) return null;

  return (
    <div className="flex flex-col gap-2 mt-2">
      <input
        type="text"
        value={plusOneFirst}
        onChange={(e) => setPlusOneFirst(e.target.value)}
        placeholder="First Name"
        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      />
      <input
        type="text"
        value={plusOneLast}
        onChange={(e) => setPlusOneLast(e.target.value)}
        placeholder="Last Name"
        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      />
    </div>
  );
}
