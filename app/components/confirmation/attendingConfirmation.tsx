import { AttendingConfirmationProps } from '@/app/types';
import PlusOneConfirmation from './plusOneConfirmation';
import Submission from './submission';

export default function AttendingConfirmation({
  nameAvailable,
  attending,
  setAttending,
  plusOne,
  setBringingPlusOne,
  bringingPlusOne,
  plusOneFirstName,
  setPlusOneFirstName,
  plusOneLastName,
  setPlusOneLastName,
  submitting,
  handleSubmit,
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

      <PlusOneConfirmation
        attending={attending}
        plusOne={plusOne}
        setBringingPlusOne={setBringingPlusOne}
        bringingPlusOne={bringingPlusOne}
        plusOneFirstName={plusOneFirstName}
        setPlusOneFirstName={setPlusOneFirstName}
        plusOneLastName={plusOneLastName}
        setPlusOneLastName={setPlusOneLastName}
      />

      <Submission
        nameAvailable={nameAvailable}
        attending={attending}
        submitting={submitting}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
