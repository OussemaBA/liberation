'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Calendar() {
  const { locale } = useParams();
  const [currentDate, setCurrentDate] = useState(new Date());

  const translations = {
    en: {
      days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    },
    fr: {
      days: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
      months: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
    },
    ar: {
      days: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
      months: ['جانفي', 'فيفري', 'مارس', 'أفريل', 'ماي', 'جوان', 'جويلية', 'أوت', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
    },
  };

  const t = translations[locale as 'en' | 'fr' | 'ar'] || translations.fr;

  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const days = [];
  const totalDays = daysInMonth(year, month);
  const startDay = firstDayOfMonth(year, month);

  for (let i = 0; i < startDay; i++) days.push(null);
  for (let i = 1; i <= totalDays; i++) days.push(i);

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  return (
    <div className="w-full p-4">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-lg font-black text-brand-teal capitalize tracking-tight">
          {t.months[month]} <span className="text-slate-300 font-bold">{year}</span>
        </h3>
        <div className="flex gap-1 bg-slate-50 p-1 rounded-xl border border-slate-100">
          <button onClick={prevMonth} className="p-2 rounded-lg hover:bg-white hover:shadow-sm text-slate-400 hover:text-brand-teal transition-all">
            <ChevronLeft className="h-4 w-4 rtl:rotate-180" />
          </button>
          <button onClick={nextMonth} className="p-2 rounded-lg hover:bg-white hover:shadow-sm text-slate-400 hover:text-brand-teal transition-all">
            <ChevronRight className="h-4 w-4 rtl:rotate-180" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center mb-4">
        {t.days.map((day, i) => (
          <div key={i} className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={month}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="grid grid-cols-7 gap-1 col-span-7"
          >
            {days.map((day, i) => {
              const isToday = day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear();
              return (
                <div
                  key={i}
                  className={cn(
                    "aspect-square flex items-center justify-center text-xs font-bold rounded-xl transition-all relative group",
                    day === null ? 'invisible' : 'cursor-pointer'
                  )}
                >
                  {isToday && (
                    <motion.div 
                      layoutId="today-indicator"
                      className="absolute inset-0 bg-brand-mint rounded-xl shadow-lg shadow-brand-mint/20" 
                    />
                  )}
                  <span className={cn(
                    "relative z-10",
                    isToday ? 'text-white' : 'text-slate-600 group-hover:text-brand-mint'
                  )}>
                    {day}
                  </span>
                  {!isToday && day !== null && (
                    <div className="absolute inset-0 bg-slate-50 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity" />
                  )}
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
