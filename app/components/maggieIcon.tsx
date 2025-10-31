'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslation } from '@/hooks/useTranslation';

export default function MaggieIcon({ selectedLang }: { selectedLang: { code: string } }) {
  const { t } = useTranslation({ locale: selectedLang.code });
  const [showBubble, setShowBubble] = useState(false);

  const toggleBubble = () => setShowBubble((prev) => !prev);

  return (
    <div
      className="fixed z-20 group"
      style={{
        bottom: 'calc(env(safe-area-inset-bottom, 0px) + 14px)',
        right: 'calc(env(safe-area-inset-right, 0px) + 14px)',
      }}
    >
      {/* Speech bubble */}
      <div
        className={`absolute bottom-1/2 right-full mr-5 translate-y-1/2 bg-white text-gray-700 text-sm px-3 py-2 rounded-lg shadow-lg whitespace-nowrap transition-all duration-300
        ${showBubble ? 'opacity-100' : 'opacity-0'}
        group-hover:opacity-100`}
      >
        {t('maggie-message')}
        <div className="absolute top-1/2 -translate-y-1/2 right-[-6px] w-0 h-0 border-l-8 border-l-white border-y-8 border-y-transparent" />
      </div>

      {/* Image */}
      <div className="relative" onClick={toggleBubble}>
        <Image
          src="/maggie-face.png"
          alt="Maggie"
          width={25}
          height={25}
          className={`transition-all duration-500 ease-in-out transform cursor-pointer
            ${showBubble ? 'scale-150 opacity-100' : 'opacity-70 group-hover:scale-150 group-hover:opacity-100'}`}
        />
      </div>
    </div>
  );
}
