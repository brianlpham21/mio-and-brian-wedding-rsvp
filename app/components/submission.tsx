type SubmissionProps = {
  nameAvailable: boolean | null;
  attending: boolean | null;
  submitting: boolean;
  handleSubmit: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
};

export default function Submission({
  nameAvailable,
  attending,
  submitting,
  handleSubmit,
}: SubmissionProps) {
  return (
    <button
      disabled={!nameAvailable || attending === null || submitting}
      onClick={handleSubmit}
      className={`mt-6 flex items-center justify-center gap-2 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${
        submitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
      }`}
    >
      {submitting && (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
      )}
      {submitting ? 'Submitting...' : 'Submit'}
    </button>
  );
}
