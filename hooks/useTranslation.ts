'use client';
import en from '../locales/en.json';
import ja from '../locales/ja.json';
import vi from '../locales/vi.json';

const translations: Record<string, Record<string, string>> = { en, ja, vi };

interface TranslationProps {
  locale?: string;
}

export function useTranslation(props?: TranslationProps) {
  const locale = props?.locale || 'en';
  const t = (key: string) => translations[locale][key] || key;
  return { t };
}
