'use client';

import * as React from "react";
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  ArrowRight, 
  CheckCircle2, 
  Stethoscope, 
  Users2, 
  ShieldCheck, 
  Sparkles,
  ChevronRight,
  Globe
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { cn } from '@/lib/utils';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useParams } from 'next/navigation';

import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('Home');
  const tc = useTranslations('Common');
  const { locale } = useParams();
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 200], [1, 0]);
  const y = useTransform(scrollY, [0, 200], [0, -50]);

  const stats = [
    { label: t('stats.quitters'), value: "2.5k+", icon: Users2 },
    { label: t('stats.experts'), value: "45", icon: Stethoscope },
    { label: t('stats.rate'), value: "88%", icon: ShieldCheck }
  ];

  const features = [
    { 
      title: t('features.personalized.title'), 
      desc: t('features.personalized.desc'),
      icon: Sparkles
    },
    { 
      title: t('features.guidance.title'), 
      desc: t('features.guidance.desc'),
      icon: ShieldCheck
    },
    { 
      title: t('features.support.title'), 
      desc: t('features.support.desc'),
      icon: CheckCircle2
    }
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Dynamic Navigation */}
      <nav className="fixed top-0 w-full z-[60] border-b border-slate-100 bg-white/80 backdrop-blur-md">
        <div className="layout-grid h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <motion.div 
              whileHover={{ rotate: 10 }}
              className="w-10 h-10 bg-brand-teal rounded-xl flex items-center justify-center shadow-lg shadow-brand-teal/20"
            >
              <span className="text-white font-black text-xl">ﺗ</span>
            </motion.div>
            <span className="text-2xl font-black tracking-tight text-brand-teal">ﺗﺤﺮر</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <Link href="#" className="text-sm font-bold text-slate-500 hover:text-brand-teal transition-colors">{t('footer.protocol')}</Link>
            <Link href="#" className="text-sm font-bold text-slate-500 hover:text-brand-teal transition-colors">{t('footer.science')}</Link>
            <Link href="#" className="text-sm font-bold text-slate-500 hover:text-brand-teal transition-colors">Testimonials</Link>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>
            <Link href={`/${locale}/login`}>
              <Button variant="ghost" className="text-slate-600 font-bold">Sign In</Button>
            </Link>
            <Link href={`/${locale}/register`}>
              <Button variant="brand" className="rounded-xl shadow-xl shadow-brand-teal/10">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-44 pb-32 overflow-hidden">
        {/* Architectural Background */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50/50 -z-10 rounded-bl-[100px]" />
        <div className="absolute top-40 left-10 w-72 h-72 bg-brand-mint/5 rounded-full blur-[100px] -z-10" />

        <div className="layout-grid">
          <div className="max-w-4xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-mint/10 border border-brand-mint/20 text-brand-mint text-xs font-black uppercase tracking-widest mb-8"
            >
              <span className="flex h-2 w-2 rounded-full bg-brand-mint animate-pulse" />
              {t('hero.tag')}
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-6xl lg:text-8xl font-black text-brand-teal leading-[1.1] sm:leading-[1.05] tracking-tight mb-8"
            >
              {t('hero.title')} <br className="hidden sm:block" />
              <span className="text-brand-mint decoration-brand-gold/30 underline underline-offset-8 decoration-4 sm:decoration-8">{t('hero.highlight')}</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg sm:text-xl md:text-2xl text-slate-500 font-medium leading-relaxed max-w-2xl mb-12"
            >
              {t('hero.subtitle')}
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6"
            >
              <Button size="lg" className="bg-brand-mint hover:bg-brand-mint/90 shadow-2xl shadow-brand-mint/20 group w-full sm:w-auto">
                {t('hero.cta')}
                <ArrowRight className="ms-2 h-5 w-5 group-hover:translate-x-1 transition-transform rtl:rotate-180 rtl:group-hover:-translate-x-1" />
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-slate-200 text-slate-600 bg-white hover:bg-slate-50 w-full sm:w-auto">
                {t('hero.secondary')}
              </Button>
            </motion.div>

            {/* Micro-Social Proof */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-16 flex items-center gap-4 border-t border-slate-100 pt-10"
            >
              <div className="flex -space-x-3 rtl:space-x-reverse">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200" />
                ))}
              </div>
              <p className="text-sm font-bold text-slate-400">
                {t('stats.trustedBy')}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Board */}
      <section className="bg-brand-teal py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,rgba(27,135,112,0.1),transparent_50%)]" />
        <div className="layout-grid relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 sm:gap-12">
            {stats.map((stat, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className={cn(
                  "flex flex-col items-center text-center p-6 sm:p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm transition-all",
                  i === 2 && "col-span-2 md:col-span-1"
                )}
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-brand-mint/20 flex items-center justify-center mb-4 sm:mb-6">
                  <stat.icon className="h-5 w-5 sm:h-6 sm:w-6 text-brand-mint" />
                </div>
                <span className="text-3xl sm:text-5xl font-black text-white mb-2">{stat.value}</span>
                <span className="text-brand-mint font-bold uppercase tracking-widest text-[8px] sm:text-[10px]">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-20 sm:py-32 bg-slate-50/50">
        <div className="layout-grid">
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24">
            <h2 className="text-3xl sm:text-5xl font-black text-brand-teal mb-6">{t('features.sectionTitle')}</h2>
            <p className="text-base sm:text-lg text-slate-500 font-medium leading-relaxed">
              {t('features.sectionSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, i) => (
              <Card key={i} className="group border-none shadow-none bg-white hover:shadow-2xl hover:shadow-brand-teal/5 transition-all duration-500 p-2">
                <CardContent className="p-6 sm:p-8">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 sm:mb-8 group-hover:bg-brand-mint transition-colors duration-500">
                    <feature.icon className="h-6 w-6 sm:h-7 sm:w-7 text-brand-teal group-hover:text-white transition-colors duration-500" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-brand-teal mb-4">{feature.title}</h3>
                  <p className="text-sm sm:text-base text-slate-500 font-medium leading-relaxed mb-6">{feature.desc}</p>
                  <div className="flex items-center text-brand-mint font-bold text-sm">
                    {t('features.learnMore')} 
                    <ChevronRight className="ms-1 h-4 w-4 rtl:rotate-180" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="layout-grid">
          <div className="bg-brand-mint rounded-[3rem] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-2xl shadow-brand-mint/30">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px]" />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">{t('cta.title')}</h2>
              <p className="text-xl text-white/80 font-medium mb-12 max-w-2xl mx-auto">{t('cta.subtitle')}</p>
              <Link href={`/${locale}/register`}>
                <Button size="lg" className="bg-white text-brand-mint hover:bg-slate-50 text-xl px-16 py-8 rounded-2xl font-black shadow-xl">
                  {t('cta.button')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-slate-100 bg-white">
        <div className="layout-grid grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-brand-teal rounded-lg flex items-center justify-center">
                <span className="text-white font-black">ﺗ</span>
              </div>
              <span className="text-2xl font-black text-brand-teal">ﺗﺤﺮر</span>
            </div>
            <p className="text-slate-500 font-medium max-w-sm mb-8">
              {t('footer.desc')}
            </p>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100" />
              <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100" />
              <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100" />
            </div>
          </div>
          <div>
            <h4 className="font-black text-brand-teal mb-6 uppercase tracking-widest text-[10px]">{t('footer.platform')}</h4>
            <ul className="space-y-4">
              <li><Link href="#" className="text-sm font-bold text-slate-500 hover:text-brand-teal transition-colors">{t('footer.protocol')}</Link></li>
              <li><Link href="#" className="text-sm font-bold text-slate-500 hover:text-brand-teal transition-colors">{t('footer.science')}</Link></li>
              <li><Link href="#" className="text-sm font-bold text-slate-500 hover:text-brand-teal transition-colors">{t('footer.pricing')}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-black text-brand-teal mb-6 uppercase tracking-widest text-[10px]">{t('footer.company')}</h4>
            <ul className="space-y-4">
              <li><Link href="#" className="text-sm font-bold text-slate-500 hover:text-brand-teal transition-colors">{t('footer.about')}</Link></li>
              <li><Link href="#" className="text-sm font-bold text-slate-500 hover:text-brand-teal transition-colors">{t('footer.privacy')}</Link></li>
              <li><Link href="#" className="text-sm font-bold text-slate-500 hover:text-brand-teal transition-colors">{t('footer.contact')}</Link></li>
            </ul>
          </div>
        </div>
        <div className="layout-grid mt-20 pt-8 border-t border-slate-50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('footer.rights')}</p>
          <div className="flex gap-6">
            <Link href="#" className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-brand-teal">{t('footer.terms')}</Link>
            <Link href="#" className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-brand-teal">{t('footer.cookies')}</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
