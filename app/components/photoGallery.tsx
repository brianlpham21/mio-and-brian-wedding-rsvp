'use client';

import Image from 'next/image';

const DISPLAY_HEIGHT = 288; // 18rem / h-72

const photos = [
  { src: '/1.jpg', alt: '', width: 5839, height: 3893 },
  { src: '/2.jpg', alt: '', width: 2658, height: 1762 },
  { src: '/3.jpg', alt: '', width: 4000, height: 6000 },
  { src: '/5.jpg', alt: '', width: 6000, height: 4000 },
  { src: '/4.jpg', alt: '', width: 5464, height: 8192 },
  { src: '/6.jpg', alt: '', width: 6000, height: 4000 },
  { src: '/10.jpg', alt: '', width: 8192, height: 5464 },
  { src: '/7.jpg', alt: '', width: 5464, height: 8192 },
  { src: '/8.jpg', alt: '', width: 8192, height: 5464 },
  { src: '/9.jpg', alt: '', width: 5464, height: 8192 },
  { src: '/11.jpg', alt: '', width: 8192, height: 5464 },
  { src: '/12.jpg', alt: '', width: 5464, height: 8192 },
];

export default function PhotoGallery() {
  return (
    <section className="w-full overflow-hidden bg-peach-50 py-10 border-b-4 border-coral-75">
      <div
        className="flex gap-3"
        style={{
          animation: 'photo-scroll 60s linear infinite',
          width: 'max-content',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.animationPlayState = 'paused';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.animationPlayState = 'running';
        }}
      >
        {[...photos, ...photos].map((photo, i) => {
          const displayWidth = Math.round(DISPLAY_HEIGHT * (photo.width / photo.height));
          return (
            <div
              key={i}
              className="flex-shrink-0 rounded-2xl overflow-hidden shadow-md"
              style={{ width: displayWidth, height: DISPLAY_HEIGHT }}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                style={{ height: DISPLAY_HEIGHT, width: 'auto' }}
                sizes="500px"
                quality={90}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
