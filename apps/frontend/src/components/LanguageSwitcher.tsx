'use client';

import { usePathname, useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const { locale: currentLocale } = useParams();

  const locales = [
    { code: 'en', label: 'EN', flag: '🇺🇸' },
    { code: 'fr', label: 'FR', flag: '🇫🇷' },
    { code: 'ar', label: 'AR', flag: '🇹🇳' },
  ];

  const handleLocaleChange = (newLocale: string) => {
    const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <div className="inline-flex items-center gap-2 bg-slate-50 border border-slate-100 p-1 rounded-2xl shadow-inner">
      <div className="ps-3 pe-1 text-slate-300">
        <Globe className="h-3.5 w-3.5" />
      </div>
      {locales.map((locale) => (
        <button
          key={locale.code}
          onClick={() => handleLocaleChange(locale.code)}
          className={cn(
            "relative px-4 py-1.5 text-[10px] font-black tracking-widest transition-all rounded-xl overflow-hidden",
            currentLocale === locale.code
              ? "text-white"
              : "text-slate-400 hover:text-brand-teal"
          )}
        >
          {currentLocale === locale.code && (
            <motion.div
              layoutId="active-lang"
              className="absolute inset-0 bg-brand-teal shadow-lg shadow-brand-teal/20"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10 flex items-center gap-1.5">
            <span className="hidden sm:inline">{locale.flag}</span>
            {locale.label}
          </span>
        </button>
      ))}
    </div>
  );
}
