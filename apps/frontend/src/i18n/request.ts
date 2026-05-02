import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

// Can be imported from a shared config
const locales = ['en', 'fr', 'ar'];

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();

  let messages;
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

  return {
    messages
  };
});
