'use client';

import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Heart, Globe2, ShieldPlus } from 'lucide-react';

export default function SolidarityBanner() {
  const { locale } = useParams();

  const content = {
    en: {
      title: "Clinical Solidarity Initiative",
      message: "10% of every protocol subscription is directly allocated to certified mental health services in Gaza and Lebanon.",
      badge: "Humanitarian Commitment",
      action: "Track Impact"
    },
    fr: {
      title: "Initiative de Solidarité Clinique",
      message: "10% de chaque abonnement est directement alloué aux services de santé mentale certifiés à Gaza et au Liban.",
      badge: "Engagement Humanitaire",
      action: "Suivre l'Impact"
    },
    ar: {
      title: "مبادرة التضامن الطبي",
      message: "يتم تخصيص 10٪ من كل اشتراك مباشرة لخدمات الصحة النفسية المعتمدة في غزة ولبنان.",
      badge: "التزام إنساني",
      action: "تابع الأثر"
    },
  }[locale as 'en' | 'fr' | 'ar'] || content.fr;

  return (
    <motion.div 
      whileHover={{ y: -2 }}
      className="relative overflow-hidden bg-brand-teal rounded-[2.5rem] p-10 md:p-12 shadow-2xl shadow-brand-teal/20 group cursor-default"
    >
      {/* Premium background effects */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-mint/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-[100px] pointer-events-none group-hover:bg-brand-mint/10 transition-colors duration-700" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-mint/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-[80px] pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
        <div className="flex-1 text-center lg:text-left rtl:lg:text-right">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-white text-[10px] font-black uppercase tracking-[0.2em] mb-6">
            <ShieldPlus className="h-3 w-3 text-brand-mint" />
            {content.badge}
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight leading-tight">
            {content.title}
          </h2>
          <p className="text-white/60 text-lg font-medium max-w-2xl leading-relaxed">
            {content.message}
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-6 shrink-0">
          <div className="w-20 h-20 rounded-[2rem] bg-white/5 backdrop-blur-xl flex items-center justify-center border border-white/10 shadow-inner group-hover:border-brand-mint/30 transition-all duration-500">
            <Heart className="w-10 h-10 text-brand-mint fill-brand-mint/10 group-hover:scale-110 transition-transform duration-500" />
          </div>
          <div className="hidden md:block h-12 w-[1px] bg-white/10 mx-4" />
          <div className="flex items-center gap-3">
            <Globe2 className="h-5 w-5 text-white/40" />
            <span className="text-sm font-black text-white/40 uppercase tracking-widest">{content.action}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
