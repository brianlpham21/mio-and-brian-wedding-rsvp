export default function WeddingInfo() {
  return (
    <section
      id="info"
      className="w-full sm:px-8 md:px-12 text-gray-800 pt-16 md:pt-20 pb-2 md:pb-6 lg:pb-10 px-6"
    >
      <div className="max-w-5xl mx-auto">
        <h2
          className="text-center mb-10 leading-[1em]"
          style={{ fontFamily: 'Brother, serif', fontSize: 'clamp(4rem, 6vw, 5.5rem)' }}
        >
          Wedding Day Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Ceremony Details */}
          <div className="bg-pastel-green-25 rounded-2xl shadow-sm p-6">
            <h3 className="text-xl font-semibold mb-3 text-black">Ceremony</h3>
            <p className="text-gray-700 mb-2">
              <strong>Date:</strong> Friday, March 20, 2025
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Time:</strong> 4:00 PM
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Location:</strong> 802 Mateo St, Los Angeles, CA 90021
            </p>
            <p className="text-gray-600 mt-4">
              Please arrive 30 minutes early to be seated. The ceremony will be outdoors — light
              attire recommended!
            </p>
          </div>

          {/* Reception Details */}
          <div className="bg-pastel-green-25 rounded-2xl shadow-sm p-6">
            <h3 className="text-xl font-semibold mb-3 text-black">Reception</h3>
            <p className="text-gray-700 mb-2">
              <strong>Time:</strong> 6:00 PM – 11:00 PM
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Location:</strong> 802 Mateo St, Los Angeles, CA 90021
            </p>
            <p className="text-gray-600 mt-4">
              Dinner, drinks, and dancing to follow. Valet parking will be available on-site.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
