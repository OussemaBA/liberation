'use client';

import { usePathname, useRouter } from 'next/navigation';

export default function LanguageSwitcher({ currentLocale }: { currentLocale: string }) {
  const pathname = usePathname();
  const router = useRouter();

  const locales = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'ar', label: 'العربية', flag: '🇹🇳' },
  ];

  const handleLocaleChange = (newLocale: string) => {
    const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <div className="fixed top-4 end-4 z-50 flex gap-2">
      {locales.map((locale) => (
        <button
          key={locale.code}
          onClick={() => handleLocaleChange(locale.code)}
          className={`rounded-lg px-3 py-1 text-sm font-medium transition-colors ${
            currentLocale === locale.code
              ? 'bg-brand-mint text-white'
              : 'bg-white/10 text-white/80 hover:bg-white/20'
          }`}
        >
          <span className="me-2">{locale.flag}</span>
          {locale.label}
        </button>
      ))}
    </div>
  );
}
