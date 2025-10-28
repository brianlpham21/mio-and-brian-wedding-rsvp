import PlusOneConfirmation from './plusOneConfirmation';

type AttendingConfirmationProps = {
  nameAvailable: boolean | null;
  attending: boolean | null;
  setAttending: (attending: boolean) => void;
  plusOne: boolean | null;
  setBringingPlusOne: (bringing: boolean) => void;
  bringingPlusOne: boolean;
  plusOneFirst: string;
  setPlusOneFirst: (name: string) => void;
  plusOneLast: string;
  setPlusOneLast: (name: string) => void;
};

export default function AttendingConfirmation({
  nameAvailable,
  attending,
  setAttending,
  plusOne,
  setBringingPlusOne,
  bringingPlusOne,
  plusOneFirst,
  setPlusOneFirst,
  plusOneLast,
  setPlusOneLast,
}: AttendingConfirmationProps) {
  if (!nameAvailable) return null;

  return (
    <div>
      <label className="mr-4">
        <input
          type="radio"
          name="attending"
          value="yes"
          checked={attending === true}
          onChange={() => setAttending(true)}
          className="mr-1"
        />
        Attending
      </label>
      <label>
        <input
          type="radio"
          name="attending"
          value="no"
          checked={attending === false}
          onChange={() => setAttending(false)}
          className="mr-1"
        />
        Not Attending
      </label>

      {attending && plusOne && (
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={bringingPlusOne}
            onChange={(e) => setBringingPlusOne(e.target.checked)}
            className="w-4 h-4"
          />
          I will be bringing a plus one
        </label>
      )}

      <PlusOneConfirmation
        bringingPlusOne={bringingPlusOne}
        plusOneFirst={plusOneFirst}
        setPlusOneFirst={setPlusOneFirst}
        plusOneLast={plusOneLast}
        setPlusOneLast={setPlusOneLast}
      />
    </div>
  );
}
