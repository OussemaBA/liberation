'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Loader2, Sparkles, ShieldCheck, HeartPulse } from 'lucide-react';
import { useAuth } from '@/features/auth/components/AuthProvider';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { SubscriptionService } from '@/lib/services/subscription.service';
import { cn } from '@/lib/utils';

export default function PricingPage() {
  const { locale } = useParams();
  const router = useRouter();
  const { token } = useAuth();
  const [packs, setPacks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState<string | null>(null);

  const translations = {
    en: {
      title: 'Select Your Protocol',
      subtitle: 'The clinical path to a smoke-free life starts here',
      popular: 'Clinical Standard',
      month: 'Month',
      months: 'Months',
      select: 'Initiate Protocol',
      features: [
        'Weekly Clinical Checkups',
        'Certified Psychologist Access',
        'Real-time Health Progress',
        '24/7 Clinical Support'
      ],
      notice: 'Certified Medical Simulation',
      loginRequired: 'Authentication required to proceed.'
    },
    fr: {
      title: 'Choisissez votre Protocole',
      subtitle: 'Le chemin clinique vers une vie sans tabac commence ici',
      popular: 'Standard Clinique',
      month: 'Mois',
      months: 'Mois',
      select: 'Initier le Protocole',
      features: [
        'Suivi Clinique Hebdomadaire',
        'Accès Psychologue Diplômé',
        'Progrès Santé en Temps Réel',
        'Support Clinique 24/7'
      ],
      notice: 'Simulation Médicale Certifiée',
      loginRequired: 'Authentification requise pour continuer.'
    },
    ar: {
      title: 'اختر بروتوكولك الطبي',
      subtitle: 'المسار السريري نحو حياة خالية من التدخين يبدأ من هنا',
      popular: 'المعيار الطبي',
      month: 'شهر',
      months: 'أشهر',
      select: 'بدء البروتوكول',
      features: [
        'متابعة طبية أسبوعية',
        'تواصل مع أخصائيين معتمدين',
        'تتبع مؤشرات الصحة لحظياً',
        'دعم طبي على مدار الساعة'
      ],
      notice: 'محاكاة طبية معتمدة',
      loginRequired: 'يرجى تسجيل الدخول للمتابعة.'
    }
  };

  const t = translations[locale as 'en' | 'fr' | 'ar'] || translations.fr;

  useEffect(() => {
    const fetchPacks = async () => {
      try {
        const data = await SubscriptionService.findAllPacks();
        setPacks(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPacks();
  }, []);

  const handleSubscribe = async (packId: string) => {
    if (!token) {
      alert(t.loginRequired);
      router.push(`/${locale}/login?redirect=pricing`);
      return;
    }

    setIsSubmitting(packId);
    try {
      await SubscriptionService.subscribe(token, packId);
      router.push(`/${locale}/dashboard`);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-brand-mint" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 relative overflow-hidden">
      <nav className="fixed top-0 w-full z-50 h-20 flex items-center justify-between px-8 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <Link href={`/${locale}`} className="flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-teal rounded-lg flex items-center justify-center">
            <span className="text-white font-black">ﺗ</span>
          </div>
          <span className="text-xl font-black text-brand-teal">ﺗﺤﺮر</span>
        </Link>
        <LanguageSwitcher />
      </nav>

      {/* Decorative architectural background */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-white -z-10 rounded-b-[100px] shadow-sm" />
      
      <div className="layout-grid pt-32 sm:pt-44 pb-20 sm:pb-32">
        <div className="text-center mb-16 sm:mb-24 max-w-3xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-teal/5 border border-brand-teal/10 text-brand-teal text-[10px] font-black uppercase tracking-widest mb-6"
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            {t.notice}
          </motion.div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-brand-teal tracking-tight mb-6 sm:mb-8">{t.title}</h1>
          <p className="text-lg sm:text-xl text-slate-500 font-medium leading-relaxed px-4">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {packs.map((pack, i) => (
            <motion.div
              key={pack.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className={cn(
                "relative flex",
                pack.duration === 3 && "md:col-span-2 lg:col-span-1"
              )}
            >
              <Card className={cn(
                "relative flex flex-col w-full border-none shadow-xl shadow-slate-200/50 rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden bg-white/90 backdrop-blur-sm transition-all",
                pack.duration === 3 ? 'ring-2 ring-brand-mint' : ''
              )}>
                {pack.duration === 3 && (
                  <div className="absolute top-0 right-0 left-0 bg-brand-mint text-white py-3 text-center text-[10px] font-black uppercase tracking-[0.2em]">
                    {t.popular}
                  </div>
                )}

                <CardHeader className={cn(
                  "px-6 sm:px-10 pb-6 sm:pb-8",
                  pack.duration === 3 ? 'pt-12 sm:pt-14' : 'pt-10 sm:pt-12'
                )}>
                  <CardTitle className="text-xl sm:text-2xl mb-4">{pack.name}</CardTitle>
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl sm:text-6xl font-black text-brand-teal tracking-tighter">{pack.price}</span>
                    <span className="text-base sm:text-lg font-bold text-slate-400">DT</span>
                  </div>
                  <CardDescription className="text-brand-mint font-black text-xs uppercase tracking-widest mt-2">
                    {pack.duration} {pack.duration === 1 ? t.month : t.months} Access
                  </CardDescription>
                </CardHeader>

                <CardContent className="px-6 sm:px-10 flex-1 flex flex-col">
                  <div className="space-y-4 sm:space-y-5 mb-8 sm:mb-12 border-t border-slate-50 pt-8 sm:pt-10">
                    {t.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3 sm:gap-4">
                        <div className="mt-1 h-4 w-4 sm:h-5 sm:w-5 rounded-full bg-brand-mint/10 flex items-center justify-center shrink-0">
                          <Check className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-brand-mint" strokeWidth={4} />
                        </div>
                        <span className="text-xs sm:text-sm font-bold text-slate-600 leading-tight">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    onClick={() => handleSubscribe(pack.id)}
                    disabled={isSubmitting !== null}
                    size="lg"
                    className={cn(
                      "w-full h-14 sm:h-16 rounded-2xl text-sm sm:text-base font-black shadow-lg group transition-all mt-auto",
                      pack.duration === 3 
                        ? 'bg-brand-mint hover:bg-brand-mint/90 shadow-brand-mint/20' 
                        : 'bg-brand-teal hover:bg-brand-teal/90 shadow-brand-teal/10'
                    )}
                  >
                    {isSubmitting === pack.id ? <Loader2 className="h-5 w-5 animate-spin" /> : (
                      <>
                        {t.select}
                        <ArrowRight className="ms-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                      </>
                    )}
                  </Button>
                </CardContent>
                
                <div className="px-6 sm:px-10 py-5 sm:py-6 bg-slate-50/50 flex items-center justify-center gap-2">
                   <HeartPulse className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-brand-mint" />
                   <span className="text-[8px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Medical Protocol Guaranteed</span>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
