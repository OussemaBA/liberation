import Link from 'next/link';

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const translations = {
    en: {
      title: "Break Free from Smoking",
      subtitle: "A structured protocol guided by medical experts.",
      cta: "Get Started",
    },
    fr: {
      title: "Libérez-vous du tabac",
      subtitle: "Un protocole structuré encadré par des experts médicaux.",
      cta: "Commencer",
    },
    ar: {
      title: "تحرر من التدخين",
      subtitle: "بروتوكول منظم تحت إشراف خبراء طبيين.",
      cta: "ابدأ الآن",
    },
  };

  const content = translations[locale as 'en' | 'fr' | 'ar'] || translations.fr;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-brand-teal p-6 text-center text-white">
      <div className="max-w-3xl space-y-8">
        <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">
          {content.title}
        </h1>
        <p className="text-lg leading-8 text-brand-mint sm:text-xl">
          {content.subtitle}
        </p>
        <div className="flex items-center justify-center gap-x-6">
          <Link
            href={`/${locale}/register`}
            className="rounded-xl bg-brand-mint px-8 py-4 text-lg font-semibold text-white shadow-sm hover:bg-opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-mint transition-all"
          >
            {content.cta}
          </Link>
          <button className="text-lg font-semibold leading-6 text-brand-gold hover:underline">
            {locale === 'ar' ? 'اكتشف المزيد' : locale === 'fr' ? 'En savoir plus' : 'Learn more'} <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
      
      <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
        {['User', 'Patient', 'Professional'].map((role) => (
          <div key={role} className="rounded-2xl border border-brand-mint/20 bg-white/5 p-6 backdrop-blur-sm">
            <h3 className="text-brand-gold font-semibold">{role}</h3>
            <p className="mt-2 text-sm text-gray-300">
              {locale === 'ar' ? 'لوحة تحكم مخصصة' : locale === 'fr' ? 'Tableau de bord dédié' : 'Dedicated dashboard'}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
