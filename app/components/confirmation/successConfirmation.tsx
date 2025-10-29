export default function SuccessConfirmation() {
  return (
    <div className="flex flex-col items-center justify-center text-center bg-white rounded-lg shadow-md p-8 mt-8 max-w-md mx-auto">
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
        <svg
          className="w-8 h-8 text-green-600"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h2 className="text-2xl font-semibold text-gray-800 mb-2">RSVP Submitted!</h2>
      <p className="text-gray-600 mb-6">
        Thank you for letting us know — we can’t wait to celebrate with you!
      </p>

      <button
        onClick={() => window.location.reload()}
        className="px-6 py-3 rounded-lg font-medium text-white bg-pastel-green-250 hover:bg-black transition focus:outline-none focus:ring-2 focus:ring-pink-300 focus:ring-offset-2 cursor-pointer"
      >
        Back to Start
      </button>
    </div>
  );
}
