import { useTranslation } from '@/hooks/useTranslation';
import { GuestNameCheckProps } from '../types';

export default function GuestNameCheck({
  selectedLang,
  nameAvailable,
  name,
  setName,
  fetchGuest,
  loading,
}: GuestNameCheckProps) {
  const { t } = useTranslation({ locale: selectedLang.code });

  if (nameAvailable) return null;

  const showError = nameAvailable === false;

  return (
    <div>
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
          placeholder={t('enter-your-full-name')}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700 placeholder-gray-400 
               focus:border-pink-400 focus:ring-2 focus:ring-pink-300 focus:outline-none transition bg-white"
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
          {loading ? t('loading') : t('rsvp').toUpperCase()}
        </button>
      </form>

      {/* Error message */}
      {showError && (
        <p className="text-red-500 text-sm mt-2">
          Sorry, we couldn&apos;t find your name in the guest list. Please double-check the spelling
          or contact us.
        </p>
      )}
    </div>
  );
}
