'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function PricingPage() {
  const { locale } = useParams();
  const router = useRouter();
  const [packs, setPacks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState<string | null>(null);

  const t = {
    en: {
      title: 'Choose Your Plan',
      subtitle: 'Select the pack that best fits your journey to freedom',
      popular: 'Most Popular',
      month: 'Month',
      months: 'Months',
      select: 'Choose this plan',
      features: [
        'Weekly medical checkups',
        'Direct access to psychologists',
        'Daily progress tracking',
        'Clinical support network',
      ],
      simulatedNotice: 'Note: This is a simulated payment for development.',
    },
    fr: {
      title: 'Choisissez votre pack',
      subtitle: 'Sélectionnez le plan qui correspond le mieux à votre parcours',
      popular: 'Le plus populaire',
      month: 'Mois',
      months: 'Mois',
      select: 'Choisir ce plan',
      features: [
        'Suivi médical hebdomadaire',
        'Accès direct aux psychologues',
        'Suivi quotidien des progrès',
        'Réseau de soutien clinique',
      ],
      simulatedNotice: 'Note: Ceci est un paiement simulé pour le développement.',
    },
    ar: {
      title: 'اختر باقتك',
      subtitle: 'اختر الباقة التي تناسب رحلتك نحو التحرر',
      popular: 'الأكثر شعبية',
      month: 'شهر',
      months: 'أشهر',
      select: 'اختر هذه الباقة',
      features: [
        'متابعة طبية أسبوعية',
        'تواصل مباشر مع أخصائيين نفسيين',
        'تتبع يومي للتقدم',
        'شبكة دعم عيادي متكاملة',
      ],
      simulatedNotice: 'ملاحظة: هذه عملية دفع تجريبية للتطوير.',
    },
  }[locale as 'en' | 'fr' | 'ar'] || t.fr;

  useEffect(() => {
    const fetchPacks = async () => {
      try {
        const res = await fetch('/api/subscriptions/packs');
        if (res.ok) {
          const data = await res.json();
          setPacks(data);
        }
      } catch (err) {
        console.error('Failed to fetch packs:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPacks();
  }, []);

  const handleSubscribe = async (packId: string) => {
    setIsSubmitting(packId);
    try {
      // Get token from cookie (or AuthProvider if exposed)
      // For this simulated flow, we assume the user is logged in
      const res = await fetch('/api/subscriptions/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${document.cookie.split('; ').find(row => row.startsWith('access_token='))?.split('=')[1]}`
        },
        body: JSON.stringify({ packId }),
      });

      if (res.ok) {
        // Success! Redirect to dashboard
        router.push(`/${locale}/dashboard`);
      } else {
        alert('Payment simulation failed. Please ensure you are logged in.');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen brand-gradient flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-mint"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen brand-gradient py-24 px-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] start-[-5%] w-[40%] h-[40%] bg-brand-mint/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] end-[-5%] w-[40%] h-[40%] bg-brand-gold/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20 animate-fade-up">
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">{t.title}</h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto font-medium">{t.subtitle}</p>
          <div className="mt-4 inline-block px-4 py-1.5 rounded-full bg-brand-gold/20 border border-brand-gold/30 text-brand-gold font-bold text-xs">
            {t.simulatedNotice}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-end">
          {packs.map((pack, i) => (
            <div 
              key={pack.id} 
              className={`glass rounded-[3rem] p-10 flex flex-col transition-all hover:scale-[1.02] duration-500 animate-fade-up ${
                pack.duration === 3 ? 'border-brand-mint/40 bg-white/10 ring-4 ring-brand-mint/20 relative scale-[1.05] z-10' : ''
              }`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {pack.duration === 3 && (
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-brand-mint text-white px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest">
                  {t.popular}
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-2xl font-black text-white mb-2">{pack.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-black text-white">{pack.price}</span>
                  <span className="text-xl text-white/50 font-bold">DT</span>
                </div>
                <div className="mt-2 text-brand-mint font-black text-sm uppercase tracking-widest">
                  {pack.duration} {pack.duration === 1 ? t.month : t.months}
                </div>
              </div>

              <div className="flex-1 space-y-5 mb-10">
                {t.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-brand-mint/20 flex items-center justify-center">
                      <svg className="w-3 h-3 text-brand-mint" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <span className="text-white/70 font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => handleSubscribe(pack.id)}
                disabled={isSubmitting !== null}
                className={`w-full py-5 rounded-2xl text-lg font-black transition-all ${
                  pack.duration === 3 
                    ? 'bg-brand-mint text-white shadow-xl shadow-brand-mint/20 hover:bg-brand-mint/90' 
                    : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
                } disabled:opacity-50 active:scale-95`}
              >
                {isSubmitting === pack.id ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    ...
                  </span>
                ) : t.select}
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
