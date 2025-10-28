import PlusOneConfirmation from './plusOneConfirmation';
import Submission from './submission';
import SuccessConfirmation from './successConfirmation';
import GuestsDisplay from '../guestsDisplay';

import { AttendingConfirmationProps } from '@/app/types';
import ExistingConfirmation from './existingConfirmation';

export default function AttendingConfirmation({
  nameAvailable,
  rsvp,
  party,
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
  submitted,
}: AttendingConfirmationProps) {
  if (!nameAvailable) return null;

  if (submitted) return <SuccessConfirmation />;

  if (rsvp) return <ExistingConfirmation />;

  return (
    <div className="w-full max-w-md mx-auto mt-8 bg-white rounded-lg shadow-sm px-6 py-5 text-gray-800">
      <GuestsDisplay party={party} />

      {/* Attendance Selection */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="attending"
            value="yes"
            checked={attending === true}
            onChange={() => setAttending(true)}
            className="h-4 w-4 text-pink-500 focus:ring-pink-300"
          />
          <span className="text-sm sm:text-base">Attending</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="attending"
            value="no"
            checked={attending === false}
            onChange={() => setAttending(false)}
            className="h-4 w-4 text-pink-500 focus:ring-pink-300"
          />
          <span className="text-sm sm:text-base">Not Attending</span>
        </label>
      </div>

      {/* Plus One Section */}
      <div className="mb-6">
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
      </div>

      {/* Submission Button */}
      <div className="flex justify-center">
        <Submission
          nameAvailable={nameAvailable}
          attending={attending}
          submitting={submitting}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
