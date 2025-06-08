import { es } from './es';
import { en } from './en';
import { fr } from './fr';

export type Locale = 'es' | 'en' | 'fr';

// Create a base type from the Spanish translations structure
type TranslationSchema = {
  [K in keyof typeof es]: string;
};

const translations: Record<Locale, TranslationSchema> = {
  es,
  en,
  fr
};

export type TranslationKey = keyof typeof es;

export function getTranslation(locale: Locale): TranslationSchema {
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
