import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'fr', 'ar'],

  // Used when no locale matches
  defaultLocale: 'fr',
  
  // Set to false to avoid prefixing the default locale
  localePrefix: 'always'
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(en|fr|ar)/:path*']
};
