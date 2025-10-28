import { GuestNameCheckProps } from '../types';

export default function GuestNameCheck({
  name,
  setName,
  fetchGuest,
  loading,
}: GuestNameCheckProps) {
  return (
    <div className="w-full max-w-md mx-auto flex flex-col sm:flex-row items-stretch gap-3 mt-6">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Full Name"
        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700 placeholder-gray-400 
               focus:border-pink-400 focus:ring-2 focus:ring-pink-300 focus:outline-none transition"
      />
      <button
        onClick={fetchGuest}
        disabled={!name || loading}
        className={`flex items-center justify-center gap-2 rounded-lg px-5 py-3 font-medium text-white 
                whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-pink-300 transition 
                disabled:opacity-50 disabled:cursor-not-allowed
                ${loading ? 'bg-pink-300 cursor-not-allowed' : 'bg-pink-500 hover:bg-pink-600'}`}
      >
        {loading && (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
        )}
        {loading ? 'Checking...' : 'Check Name'}
      </button>
    </div>
  );
}
