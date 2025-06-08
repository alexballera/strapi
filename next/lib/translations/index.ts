import { es } from './es';
import { en } from './en';
import { fr } from './fr';

export type Locale = 'es' | 'en' | 'fr';

const translations = {
  es,
  en,
  fr
} as const;

export type TranslationKey = keyof typeof es;

export function getTranslation(locale: Locale): typeof es {
  return translations[locale] || translations.es; // Fallback a español
}

export function useTranslation(locale: Locale) {
  const t = getTranslation(locale);
  
  return {
    t,
    locale,
    // Helper para obtener una traducción específica
    getText: (key: TranslationKey): string => {
      return t[key] || key;
    }
  };
}

// Export de todas las traducciones para uso directo
export { es, en, fr };
