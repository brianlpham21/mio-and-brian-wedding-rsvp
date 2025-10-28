export default function HeroSection() {
  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-pink-50 text-center">
      <div className="container mx-auto px-6 sm:px-8">
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-gray-800 mb-4">
          Mio & Brian&apos;s Wedding
        </h1>
        <p className="text-base sm:text-lg text-gray-600 max-w-xl mx-auto leading-relaxed">
          We are so excited to celebrate our special day with you! Please RSVP below to let us know
          if you can join us.
        </p>
      </div>

      {/* Bouncing Down Arrow */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <svg
          className="w-8 h-8 text-pink-400 animate-bounce"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
