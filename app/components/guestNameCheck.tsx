import { GuestNameCheckProps } from '../types';

export default function GuestNameCheck({
  name,
  setName,
  fetchGuest,
  loading,
}: GuestNameCheckProps) {
  return (
    <div className="flex w-full max-w-md">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Full Name"
        className="mt-4 mr-2 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      />
      <button
        onClick={fetchGuest}
        disabled={!name || loading}
        className={`mt-4 flex items-center justify-center gap-2 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${
          loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
        }`}
      >
        {loading && (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
        )}
        {loading ? 'Checking...' : 'Check Name'}
      </button>
    </div>
  );
}
