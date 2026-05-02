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

  const monthNames = {
    en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    fr: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
    ar: ['جانفي', 'فيفري', 'مارس', 'أفريل', 'ماي', 'جوان', 'جويلية', 'أوت', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
  }[locale as 'en' | 'fr' | 'ar'] || monthNames.en;

  const dayNames = {
    en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    fr: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
    ar: ['أحد', 'إثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'],
  }[locale as 'en' | 'fr' | 'ar'] || dayNames.en;

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const totalDays = daysInMonth(year, month);
  const startDay = firstDayOfMonth(year, month);

  const days = [];
  for (let i = 0; i < startDay; i++) {
    days.push(<div key={`empty-${i}`} className="p-4 border-b border-e border-gray-100"></div>);
  }
  for (let d = 1; d <= totalDays; d++) {
    const date = new Date(year, month, d);
    const isToday = date.toDateString() === new Date().toDateString();
    days.push(
      <button
        key={d}
        onClick={() => onSelectDate(date)}
        className={`p-4 border-b border-e border-gray-100 hover:bg-brand-mint/5 transition-colors text-start flex flex-col gap-1 min-h-[100px] ${isToday ? 'bg-brand-mint/10' : ''}`}
      >
        <span className={`font-bold ${isToday ? 'text-brand-mint' : 'text-gray-700'}`}>{d}</span>
      </button>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200">
      <div className="bg-brand-teal p-6 flex items-center justify-between text-white">
        <button onClick={prevMonth} className="p-2 hover:bg-white/10 rounded-full">←</button>
        <h2 className="text-xl font-bold">{monthNames[month]} {year}</h2>
        <button onClick={nextMonth} className="p-2 hover:bg-white/10 rounded-full">→</button>
      </div>
      <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-200">
        {dayNames.map(day => (
          <div key={day} className="p-4 text-center text-sm font-bold text-gray-500 uppercase tracking-wider">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {days}
      </div>
    </div>
  );
}
