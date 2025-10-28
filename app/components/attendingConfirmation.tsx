type AttendingConfirmationProps = {
  attending: boolean | null;
  setAttending: (attending: boolean) => void;
};

export default function AttendingConfirmation({
  attending,
  setAttending,
}: AttendingConfirmationProps) {
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
    </div>
  );
}
