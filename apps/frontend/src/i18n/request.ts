import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!routing.locales.includes(locale as any)) {
    console.error(`[i18n] Invalid locale requested: ${locale}`);
  }

  console.log(`[i18n] Loading messages for locale: ${locale}`);

  let messages;
  try {
    switch (locale) {
      case 'en':
        messages = (await import('../messages/en.json')).default;
        break;
      case 'ar':
        messages = (await import('../messages/ar.json')).default;
        break;
      case 'fr':
      default:
        messages = (await import('../messages/fr.json')).default;
        break;
    }
    console.log(`[i18n] Successfully loaded messages for: ${locale}`);
  } catch (error) {
    console.error(`[i18n] Failed to load messages for ${locale}:`, error);
    // Fallback to English if loading fails
    messages = (await import('../messages/en.json')).default;
  }

  return {
    locale,
    messages
  };
});
