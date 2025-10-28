import { SubmissionProps } from '@/app/types';

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
      className={`mt-6 flex items-center justify-center gap-2 rounded-lg px-6 py-3 font-medium text-white
              focus:outline-none focus:ring-2 focus:ring-pink-300 focus:ring-offset-2 transition
              disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap
              ${submitting ? 'bg-pink-300 cursor-not-allowed' : 'bg-pink-500 hover:bg-pink-600'}`}
    >
      {submitting && (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
      )}
      {submitting ? 'Submitting...' : 'Submit'}
    </button>
  );
}
