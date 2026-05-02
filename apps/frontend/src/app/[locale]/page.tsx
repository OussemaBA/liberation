import Link from 'next/link';

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const translations = {
    en: {
      title: "Reclaim Your Freedom",
      subtitle: "The medical-grade protocol to quit smoking for good. Guided by experts, supported by science.",
      cta: "Start Your Journey",
      more: "Discover the protocol",
      stats: [
        { label: "Successful Quitters", value: "2,500+" },
        { label: "Medical Experts", value: "45" },
        { label: "Success Rate", value: "88%" }
      ],
      features: [
        { title: "Personalized Care", desc: "A protocol tailored to your smoking history and health profile." },
        { title: "Expert Support", desc: "Weekly sessions with certified doctors and psychologists." },
        { title: "Digital Companion", desc: "Track your progress, savings, and health improvements 24/7." }
      ]
    },
    fr: {
      title: "Libérez-vous Enfin",
      subtitle: "Le protocole médical pour arrêter de fumer définitivement. Guidé par des experts, soutenu par la science.",
      cta: "Commencer le parcours",
      more: "Découvrir le protocole",
      stats: [
        { label: "Réussites", value: "2,500+" },
        { label: "Experts Médicaux", value: "45" },
        { label: "Taux de Réussite", value: "88%" }
      ],
      features: [
        { title: "Suivi Personnalisé", desc: "Un protocole adapté à votre historique et votre profil de santé." },
        { title: "Soutien d'Experts", desc: "Séances hebdomadaires avec des médecins et psychologues." },
        { title: "Compagnon Digital", desc: "Suivez vos progrès, vos économies et votre santé 24h/24." }
      ]
    },
    ar: {
      title: "استعد حريتك الآن",
      subtitle: "البروتوكول الطبي المعتمد للإقلاع عن التدخين نهائياً. بإشراف خبراء ودعم علمي متكامل.",
      cta: "ابدأ رحلتك الآن",
      more: "اكتشف البروتوكول",
      stats: [
        { label: "حالات نجاح", value: "+2,500" },
        { label: "خبير طبي", value: "45" },
        { label: "نسبة النجاح", value: "88%" }
      ],
      features: [
        { title: "رعاية شخصية", desc: "بروتوكول مخصص حسب تاريخ تدخينك وملفك الصحي." },
        { title: "دعم المختصين", desc: "جلسات أسبوعية مع أطباء وأخصائيين نفسيين معتمدين." },
        { title: "رفيق رقمي", desc: "تابع تقدمك، مدخراتك وتحسن صحتك على مدار الساعة." }
      ]
    },
  };

  const content = translations[locale as 'en' | 'fr' | 'ar'] || translations.fr;

  return (
    <main className="min-h-screen brand-gradient text-white overflow-hidden relative">
      {/* Immersive Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] end-[-5%] w-[50%] h-[50%] bg-brand-mint/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] start-[-5%] w-[50%] h-[50%] bg-brand-gold/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Navigation Placeholder */}
      <nav className="relative z-20 flex items-center justify-between px-8 py-8 max-w-7xl mx-auto">
        <div className="text-3xl font-black tracking-tighter text-glow flex items-center gap-2">
          <div className="w-10 h-10 bg-brand-mint rounded-xl rotate-12 flex items-center justify-center">
            <span className="text-white -rotate-12">ﺗ</span>
          </div>
          ﺗﺤﺮر
        </div>
        <div className="flex gap-4">
          <Link href={`/${locale}/login`} className="px-6 py-2 rounded-xl font-bold hover:bg-white/10 transition-colors">
            {locale === 'ar' ? 'دخول' : 'Connexion'}
          </Link>
          <Link href={`/${locale}/register`} className="px-6 py-2 rounded-xl bg-brand-mint font-bold shadow-lg shadow-brand-mint/20 hover:scale-105 transition-all">
            {content.cta}
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 pt-20 pb-32 flex flex-col items-center text-center">
        <div className="inline-block px-4 py-1.5 rounded-full bg-brand-mint/20 border border-brand-mint/30 text-brand-mint font-bold text-sm mb-8 animate-fade-up">
          {locale === 'ar' ? 'المنصة الطبية رقم 1 في تونس' : 'Plateforme Médicale #1 en Tunisie'}
        </div>
        
        <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tight animate-fade-up" style={{ animationDelay: '0.1s' }}>
          {content.title.split(' ').map((word, i) => (
            <span key={i} className={i === 1 ? 'text-brand-mint text-glow' : ''}>
              {word}{' '}
            </span>
          ))}
        </h1>

        <p className="max-w-2xl text-xl md:text-2xl text-white/70 leading-relaxed mb-12 animate-fade-up" style={{ animationDelay: '0.2s' }}>
          {content.subtitle}
        </p>

        <div className="flex flex-col sm:flex-row gap-6 animate-fade-up" style={{ animationDelay: '0.3s' }}>
          <Link
            href={`/${locale}/register`}
            className="rounded-2xl bg-brand-mint px-10 py-5 text-xl font-bold shadow-2xl shadow-brand-mint/30 hover:scale-105 active:scale-95 transition-all"
          >
            {content.cta}
          </Link>
          <button className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 px-10 py-5 text-xl font-bold hover:bg-white/20 transition-all flex items-center justify-center gap-3 group">
            {content.more}
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>

        {/* Stats */}
        <div className="mt-24 grid grid-cols-1 sm:grid-cols-3 gap-12 w-full animate-fade-up" style={{ animationDelay: '0.4s' }}>
          {content.stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="text-5xl font-black text-brand-gold mb-2">{stat.value}</span>
              <span className="text-white/50 font-bold uppercase tracking-widest text-sm">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 py-32 border-t border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {content.features.map((feature, i) => (
            <div key={i} className="glass rounded-[2rem] p-10 hover:bg-white/15 transition-all group">
              <div className="w-16 h-16 rounded-2xl bg-brand-mint/20 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <div className="w-8 h-8 text-brand-mint">
                  {/* Icon placeholder based on index */}
                  {i === 0 && <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>}
                  {i === 1 && <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857C17.183 15.558 17 14.802 17 14V6a4 4 0 00-8 0v8c0 .802-.183 1.558-.356 2.143A3 3 0 003 18v2h5" /></svg>}
                  {i === 2 && <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
              <p className="text-white/60 leading-relaxed text-lg">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
