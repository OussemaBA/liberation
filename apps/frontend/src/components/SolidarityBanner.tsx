'use client';

import { useParams } from 'next/navigation';

export default function SolidarityBanner() {
  const { locale } = useParams();

  const translations = {
    en: {
      title: 'حرر شخص آخر معاك',
      subtitle: 'Free someone else with you',
      description: 'You have just started your own journey. Many others are waiting for help. If you can afford it, you can make a free donation to fund the support of another patient.',
      button: 'Support a Patient',
      placeholder: 'Amount (DT)',
    },
    fr: {
      title: 'حرر شخص آخر معاك',
      subtitle: 'Libérez une autre personne avec vous',
      description: "Vous venez de commencer votre propre parcours. Beaucoup d'autres attendent une aide. Si vous en avez les moyens, vous pouvez faire un don libre.",
      button: 'Soutenir un Patient',
      placeholder: 'Montant (DT)',
    },
    ar: {
      title: 'حرر شخص آخر معاك',
      subtitle: 'ساعد غيرك في رحلة التحرر',
      description: 'لقد بدأت للتو رحلتك الخاصة. ينتظر الكثيرون غيرك المساعدة. إذا كان بإمكانك، يمكنك تقديم تبرع حر لتمويل دعم مريض آخر.',
      button: 'ادعم مريضاً الآن',
      placeholder: 'المبلغ (د.ت)',
    },
  };

  const content = translations[locale as 'en' | 'fr' | 'ar'] || translations.fr;

  return (
    <div className="rounded-[2.5rem] bg-gradient-to-br from-brand-gold/20 to-brand-gold/5 p-10 md:p-14 border border-brand-gold/20 backdrop-blur-md relative overflow-hidden group">
      {/* Decorative background icon */}
      <div className="absolute -bottom-10 end-[-2.5rem] text-brand-gold/10 rotate-12 group-hover:rotate-0 transition-transform duration-700">
        <svg className="w-64 h-64" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
        <div className="max-w-xl text-center lg:text-start">
          <div className="flex flex-col gap-1 mb-6">
            <h2 className="text-4xl font-black text-brand-teal tracking-tight">{content.title}</h2>
            <p className="text-brand-gold font-black uppercase tracking-[0.2em] text-xs">{content.subtitle}</p>
          </div>
          <p className="text-brand-teal/70 font-medium text-lg leading-relaxed">{content.description}</p>
        </div>
        
        <div className="flex flex-col w-full md:w-[320px] gap-5 bg-white/40 p-6 rounded-[2rem] border border-white/50 shadow-xl shadow-brand-gold/5 backdrop-blur-xl">
          <div className="relative">
            <input
              type="number"
              min="1"
              placeholder={content.placeholder}
              className="w-full rounded-2xl border-2 border-brand-gold/10 bg-white/80 px-6 py-4 text-lg font-bold text-brand-teal placeholder-brand-teal/30 focus:border-brand-gold focus:ring-4 focus:ring-brand-gold/10 outline-none transition-all"
            />
            <div className="absolute end-6 top-1/2 -translate-y-1/2 text-brand-gold font-black opacity-50">DT</div>
          </div>
          <button className="w-full rounded-2xl bg-brand-gold px-8 py-5 text-lg font-black text-white shadow-2xl shadow-brand-gold/30 hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-widest">
            {content.button}
          </button>
        </div>
      </div>
    </div>
  );
}
