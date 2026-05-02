'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';

export default function Calendar({ onSelectDate }: { onSelectDate: (date: Date) => void }) {
  const { locale } = useParams();
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const translations = {
    en: {
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    },
    fr: {
      months: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
      days: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
    },
    ar: {
      months: ['جانفي', 'فيفري', 'مارس', 'أفريل', 'ماي', 'جوان', 'جويلية', 'أوت', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
      days: ['أحد', 'إثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'],
    },
  };

  const content = translations[locale as 'en' | 'fr' | 'ar'] || translations.fr;
  const monthNames = content.months;
  const dayNames = content.days;

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const totalDays = daysInMonth(year, month);
  const startDay = firstDayOfMonth(year, month);

  const days = [];
  for (let i = 0; i < startDay; i++) {
    days.push(<div key={`empty-${i}`} className="p-4 border-b border-e border-gray-50/50"></div>);
  }
  for (let d = 1; d <= totalDays; d++) {
    const date = new Date(year, month, d);
    const isToday = date.toDateString() === new Date().toDateString();
    days.push(
      <button
        key={d}
        onClick={() => onSelectDate(date)}
        className={`p-4 border-b border-e border-gray-50/50 hover:bg-brand-mint/5 transition-all text-start flex flex-col gap-2 min-h-[120px] group relative overflow-hidden ${isToday ? 'bg-brand-mint/[0.03]' : ''}`}
      >
        <span className={`text-xl font-black transition-colors ${isToday ? 'text-brand-mint' : 'text-brand-teal/40 group-hover:text-brand-teal'}`}>{d}</span>
        {isToday && (
          <div className="absolute top-4 end-4 w-2 h-2 bg-brand-mint rounded-full animate-ping" />
        )}
        <div className="absolute inset-x-0 bottom-0 h-1 bg-brand-mint scale-x-0 group-hover:scale-x-100 transition-transform origin-left rtl:origin-right" />
      </button>
    );
  }

  return (
    <div className="bg-white rounded-[2.5rem] shadow-xl shadow-brand-teal/5 overflow-hidden border border-gray-100 flex flex-col">
      <div className="bg-brand-teal p-8 flex items-center justify-between text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 100 C 20 0 50 0 100 100 Z" fill="currentColor" />
          </svg>
        </div>
        
        <button onClick={prevMonth} className="p-3 hover:bg-white/10 rounded-2xl transition-all relative z-10 border border-white/10 active:scale-90 rtl:rotate-180">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <div className="text-center relative z-10">
          <h2 className="text-2xl font-black tracking-tight">{monthNames[month]}</h2>
          <span className="text-brand-mint font-bold text-sm tracking-widest uppercase opacity-80">{year}</span>
        </div>
        <button onClick={nextMonth} className="p-3 hover:bg-white/10 rounded-2xl transition-all relative z-10 border border-white/10 active:scale-90 rtl:rotate-180">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>

      <div className="grid grid-cols-7 bg-gray-50/50 border-b border-gray-100">
        {dayNames.map(day => (
          <div key={day} className="p-5 text-center text-[10px] font-black text-brand-teal/30 uppercase tracking-[0.2em]">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 flex-1">
        {days}
      </div>
    </div>
  );
}
