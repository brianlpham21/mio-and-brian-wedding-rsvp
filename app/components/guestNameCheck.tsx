import { GuestNameCheckProps } from '../types';

export default function GuestNameCheck({
  nameAvailable,
  name,
  setName,
  fetchGuest,
  loading,
}: GuestNameCheckProps) {
  if (nameAvailable) return null;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault(); // prevent page reload
        if (name && !loading) fetchGuest();
      }}
      className="w-full max-w-md mx-auto flex flex-col sm:flex-row items-stretch gap-3"
    >
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Full Name"
        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700 placeholder-gray-400 
               focus:border-pink-400 focus:ring-2 focus:ring-pink-300 focus:outline-none transition"
      />
      <button
        type="submit"
        disabled={!name || loading}
        className={`flex items-center justify-center gap-2 rounded-lg px-5 py-3 font-medium text-white 
                whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-pink-300 transition bg-gray-800
                disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer
                ${loading ? 'bg-pink-300 cursor-not-allowed' : 'bg-pastel-green-250 hover:bg-black'}`}
      >
        {loading && (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
        )}
        {loading ? 'Checking...' : 'Check Name'}
      </button>
    </form>
  );
}
