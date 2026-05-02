'use client';

import { useParams } from 'next/navigation';

export default function SolidarityBanner() {
  const { locale } = useParams();

  const content = {
    en: {
      title: 'حرر شخص آخر معاك (Free someone else with you)',
      description: 'You have just started your own journey. Many others are waiting for help. If you can afford it, you can make a free donation to fund the support of another patient.',
      button: 'Make a free donation',
      placeholder: 'Amount (e.g., 5 TND)',
    },
    fr: {
      title: 'حرر شخص آخر معاك (Libérez une autre personne avec vous)',
      description: "Vous venez de commencer votre propre parcours. Beaucoup d'autres attendent une aide. Si vous en avez les moyens, vous pouvez faire un don libre pour financer l'accompagnement d'un autre patient.",
      button: 'Faire un don libre',
      placeholder: 'Montant (ex: 5 TND)',
    },
    ar: {
      title: 'حرر شخص آخر معاك',
      description: 'لقد بدأت للتو رحلتك الخاصة. ينتظر الكثيرون غيرك المساعدة. إذا كان بإمكانك، يمكنك تقديم تبرع حر لتمويل دعم مريض آخر.',
      button: 'تبرع الآن',
      placeholder: 'المبلغ (مثلاً: 5 د.ت)',
    },
  }[locale as 'en' | 'fr' | 'ar'] || content.fr;

  return (
    <div className="rounded-3xl bg-brand-gold/10 p-8 border-2 border-brand-gold/20 backdrop-blur-sm">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-2xl text-center md:text-start">
          <h2 className="text-2xl font-bold text-brand-teal mb-4">{content.title}</h2>
          <p className="text-gray-700 leading-relaxed">{content.description}</p>
        </div>
        <div className="flex flex-col w-full md:w-auto gap-4">
          <input
            type="number"
            min="1"
            placeholder={content.placeholder}
            className="rounded-xl border border-brand-gold/30 px-4 py-3 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold focus:outline-none"
          />
          <button className="rounded-xl bg-brand-gold px-8 py-3 text-lg font-bold text-white shadow-lg hover:bg-opacity-90 transition-all">
            {content.button}
          </button>
        </div>
      </div>
    </div>
  );
}
