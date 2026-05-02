import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ locale }) => {
  // If locale is undefined, try to resolve it from the environment or default
  // This happens when next-intl plugin fails to inject the locale segment
  const activeLocale = locale && routing.locales.includes(locale as any) 
    ? locale 
    : routing.defaultLocale;

  console.log(`[i18n] Loading: ${activeLocale} (received: ${locale})`);

  let messages;
  if (activeLocale === 'en') {
    messages = (await import('../messages/en.json')).default;
  } else if (activeLocale === 'ar') {
    messages = (await import('../messages/ar.json')).default;
  } else {
    messages = (await import('../messages/fr.json')).default;
  }

  return {
    locale: activeLocale,
    messages
  };
});
