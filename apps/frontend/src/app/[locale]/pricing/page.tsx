'use client';

import { useParams } from 'next/navigation';
import SolidarityBanner from '@/components/SolidarityBanner';

export default function PricingPage() {
  const { locale } = useParams();

  const content = {
    en: {
      title: 'Choose Your Plan',
      subtitle: 'Structured support for a smoke-free life.',
      packs: [
        { id: '1', name: '1 Month Pack', price: '99', duration: '1 month', features: ['Full evaluation', 'Weekly TCC sessions', 'Daily journal'] },
        { id: '3', name: '3 Months Pack', price: '249', duration: '3 months', features: ['All 1-month features', 'Discounted rate', 'Priority support'], recommended: true },
        { id: '6', name: '6 Months Pack', price: '399', duration: '6 months', features: ['Maximum savings', 'Long-term follow-up', 'Relapse prevention'] },
      ],
      select: 'Select Pack',
    },
    fr: {
      title: 'Choisissez votre pack',
      subtitle: 'Un accompagnement structuré pour une vie sans tabac.',
      packs: [
        { id: '1', name: 'Pack 1 mois', price: '99', duration: '1 mois', features: ['Évaluation complète', 'Séances TCC hebdomadaires', 'Journal quotidien'] },
        { id: '3', name: 'Pack 3 mois', price: '249', duration: '3 mois', features: ['Tous les avantages 1 mois', 'Tarif dégressif', 'Support prioritaire'], recommended: true },
        { id: '6', name: 'Pack 6 mois', price: '399', duration: '6 mois', features: ['Économie maximale', 'Suivi long terme', 'Prévention rechute'] },
      ],
      select: 'Choisir ce pack',
    },
    ar: {
      title: 'اختر باقتك',
      subtitle: 'دعم منظم لحياة خالية من التدخين.',
      packs: [
        { id: '1', name: 'باقة شهر واحد', price: '99', duration: 'شهر واحد', features: ['تقييم كامل', 'جلسات TCC أسبوعية', 'يوميات المتابعة'] },
        { id: '3', name: 'باقة 3 أشهر', price: '249', duration: '3 أشهر', features: ['جميع ميزات باقة الشهر', 'سعر مخفض', 'دعم ذو أولوية'], recommended: true },
        { id: '6', name: 'باقة 6 أشهر', price: '399', duration: '6 أشهر', features: ['توفير أقصى', 'متابعة طويلة الأمد', 'الوقاية من الانتكاس'] },
      ],
      select: 'اختر الباقة',
    },
  }[locale as 'en' | 'fr' | 'ar'] || content.fr;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-brand-teal sm:text-5xl">{content.title}</h1>
          <p className="mt-4 text-lg text-gray-600">{content.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {content.packs.map((pack) => (
            <div
              key={pack.id}
              className={`relative flex flex-col rounded-3xl p-8 shadow-lg transition-transform hover:scale-105 ${
                pack.recommended ? 'bg-brand-teal text-white ring-4 ring-brand-mint' : 'bg-white text-gray-900'
              }`}
            >
              {pack.recommended && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-brand-gold px-4 py-1 text-sm font-bold text-white uppercase tracking-wider">
                   {locale === 'ar' ? 'موصى به' : locale === 'fr' ? 'Recommandé' : 'Recommended'}
                </span>
              )}
              <h3 className="text-2xl font-bold">{pack.name}</h3>
              <div className="mt-4 flex items-baseline">
                <span className="text-4xl font-bold tracking-tight">{pack.price}</span>
                <span className="ms-2 text-sm font-semibold opacity-80">TND / {pack.duration}</span>
              </div>
              <ul className="mt-8 space-y-4 text-sm opacity-90">
                {pack.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <svg className={`h-5 w-5 me-2 ${pack.recommended ? 'text-brand-mint' : 'text-brand-mint'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                className={`mt-10 w-full rounded-xl py-4 text-lg font-bold transition-colors ${
                  pack.recommended ? 'bg-brand-mint hover:bg-opacity-90' : 'bg-brand-teal text-white hover:bg-opacity-90'
                }`}
              >
                {content.select}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-20">
          <SolidarityBanner />
        </div>
      </div>
    </div>
  );
}
