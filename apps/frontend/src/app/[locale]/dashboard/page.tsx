'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Calendar from '@/components/Calendar';
import SolidarityBanner from '@/components/SolidarityBanner';

export default function Dashboard() {
  const { locale } = useParams();
  const [appointments, setAppointments] = useState<any[]>([]);
  const [professionals, setProfessionals] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  // Form state
  const [selectedProfessional, setSelectedProfessional] = useState('');
  const [time, setTime] = useState('10:00');
  const [notes, setNotes] = useState('');

  const translations = {
    en: {
      title: 'Your Dashboard',
      subtitle: 'Track your progress and schedule meetings',
      upcoming: 'Upcoming Meetings',
      noMeetings: 'No meetings scheduled yet.',
      scheduleTitle: 'Schedule a Meeting',
      selectProf: 'Select a Professional',
      time: 'Preferred Time',
      notes: 'Notes (optional)',
      cancel: 'Cancel',
      confirm: 'Confirm Appointment',
      smokeFree: 'Smoke-Free Days',
      savings: 'Money Saved',
      health: 'Health Progress',
    },
    fr: {
      title: 'Votre Tableau de bord',
      subtitle: 'Suivez vos progrès et gérez vos rendez-vous',
      upcoming: 'Prochains Rendez-vous',
      noMeetings: 'Aucun rendez-vous prévu.',
      scheduleTitle: 'Prendre un rendez-vous',
      selectProf: 'Choisir un professionnel',
      time: 'Heure souhaitée',
      notes: 'Notes (optionnel)',
      cancel: 'Annuler',
      confirm: 'Confirmer le rendez-vous',
      smokeFree: 'Jours sans tabac',
      savings: 'Économies réalisées',
      health: 'Santé améliorée',
    },
    ar: {
      title: 'لوحة التحكم الخاصة بك',
      subtitle: 'تابع تقدمك وجدول مواعيدك',
      upcoming: 'المواعيد القادمة',
      noMeetings: 'لا توجد مواعيد مجدولة بعد.',
      scheduleTitle: 'جدولة موعد',
      selectProf: 'اختر مختصاً',
      time: 'الوقت المفضل',
      notes: 'ملاحظات (اختياري)',
      cancel: 'إلغاء',
      confirm: 'تأكيد الموعد',
      smokeFree: 'أيام بدون تدخين',
      savings: 'المال الموفر',
      health: 'تحسن الصحة',
    },
  };

  const t = translations[locale as 'en' | 'fr' | 'ar'] || translations.fr;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setProfessionals([
          { id: '1', user: { firstName: 'Dr. Ahmed', lastName: 'Ben Salah' } },
          { id: '2', user: { firstName: 'Mme. Sarah', lastName: 'Trabelsi' } },
        ]);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);
    setShowModal(true);
  };

  const handleSchedule = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedProfessional) return;

    const [hours, minutes] = time.split(':');
    const fullDate = new Date(selectedDate);
    fullDate.setHours(parseInt(hours), parseInt(minutes));

    const newAppointment = {
      id: Math.random().toString(),
      dateTime: fullDate.toISOString(),
      professional: professionals.find(p => p.id === selectedProfessional),
      status: 'PENDING',
      type: 'VISIO',
    };

    setAppointments([...appointments, newAppointment]);
    setShowModal(false);
    setSelectedProfessional('');
    setTime('10:00');
    setNotes('');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col md:flex-row">
      {/* Sidebar Placeholder */}
      <aside className="w-full md:w-24 bg-brand-teal flex flex-row md:flex-col items-center py-6 px-4 gap-8 z-20">
        <div className="w-12 h-12 bg-brand-mint rounded-2xl rotate-12 flex items-center justify-center text-white font-black text-xl mb-0 md:mb-8">
          <span className="ltr:-rotate-12 rtl:rotate-12">ﺗ</span>
        </div>
        <nav className="flex flex-row md:flex-col gap-6 flex-1 justify-center md:justify-start">
          {['home', 'calendar', 'users', 'settings'].map((icon) => (
            <div key={icon} className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 text-white/50 hover:text-white cursor-pointer transition-all">
              <div className="w-6 h-6 border-2 border-current rounded-lg opacity-50" />
            </div>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-6 md:p-12 overflow-y-auto">
        <div className="max-w-7xl mx-auto space-y-10">
          <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 animate-fade-up">
            <div>
              <h1 className="text-4xl font-black text-brand-teal mb-2">{t.title}</h1>
              <p className="text-lg text-gray-500 font-medium">{t.subtitle}</p>
            </div>
            <div className="flex flex-wrap gap-4">
              <div className="bg-white px-8 py-5 rounded-[2rem] shadow-sm border border-brand-mint/10 flex flex-col items-center min-w-[140px]">
                <span className="text-3xl font-black text-brand-mint">12</span>
                <span className="text-[10px] text-gray-400 uppercase font-black tracking-widest mt-1">{t.smokeFree}</span>
              </div>
              <div className="bg-white px-8 py-5 rounded-[2rem] shadow-sm border border-brand-gold/10 flex flex-col items-center min-w-[140px]">
                <span className="text-3xl font-black text-brand-gold">145 د.ت</span>
                <span className="text-[10px] text-gray-400 uppercase font-black tracking-widest mt-1">{t.savings}</span>
              </div>
              <div className="bg-brand-mint px-8 py-5 rounded-[2rem] shadow-xl shadow-brand-mint/20 flex flex-col items-center min-w-[140px] text-white">
                <span className="text-3xl font-black">75%</span>
                <span className="text-[10px] opacity-70 uppercase font-black tracking-widest mt-1">{t.health}</span>
              </div>
            </div>
          </header>

          <div className="grid xl:grid-cols-12 gap-10">
            <div className="xl:col-span-8 space-y-10">
              <div className="animate-fade-up" style={{ animationDelay: '0.1s' }}>
                <Calendar onSelectDate={handleSelectDate} />
              </div>
              <div className="animate-fade-up" style={{ animationDelay: '0.2s' }}>
                <SolidarityBanner />
              </div>
            </div>

            <div className="xl:col-span-4 space-y-8 animate-fade-up" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-black text-brand-teal flex items-center gap-3">
                  <span className="w-1.5 h-8 bg-brand-gold rounded-full"></span>
                  {t.upcoming}
                </h2>
              </div>
              
              <div className="space-y-5">
                {appointments.length === 0 ? (
                  <div className="bg-white p-12 rounded-[2.5rem] border-2 border-dashed border-gray-200 text-center flex flex-col items-center">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                      <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p className="text-gray-400 font-bold">{t.noMeetings}</p>
                  </div>
                ) : (
                  appointments.map((apt, i) => (
                    <div key={apt.id} className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex items-center gap-6 hover:shadow-md transition-all group animate-fade-up" style={{ animationDelay: `${0.1 * i + 0.4}s` }}>
                      <div className="bg-brand-mint/10 p-4 rounded-2xl text-brand-mint font-black text-center min-w-[70px] group-hover:bg-brand-mint group-hover:text-white transition-colors">
                        <div className="text-[10px] uppercase opacity-70">{new Date(apt.dateTime).toLocaleDateString(locale as string, { month: 'short' })}</div>
                        <div className="text-2xl">{new Date(apt.dateTime).getDate()}</div>
                      </div>
                      <div className="flex-1">
                        <div className="font-black text-brand-teal text-lg">
                          {apt.professional.user.firstName} {apt.professional.user.lastName}
                        </div>
                        <div className="text-sm text-gray-500 font-bold mb-3 uppercase tracking-tight">
                          {new Date(apt.dateTime).toLocaleTimeString(locale as string, { hour: '2-digit', minute: '2-digit' })} • {apt.type}
                        </div>
                        <div className="flex gap-2">
                          <span className="px-3 py-1 bg-brand-gold/10 text-brand-gold text-[10px] font-black rounded-lg uppercase tracking-widest border border-brand-gold/10">
                            {apt.status}
                          </span>
                          <a
                            href={`/${locale}/meeting/${apt.id}`}
                            className="px-4 py-1 bg-brand-teal text-white text-[10px] font-black rounded-lg uppercase tracking-widest hover:bg-brand-mint transition-colors shadow-lg shadow-brand-teal/10"
                          >
                            {locale === 'ar' ? 'انضم للمكالمة' : locale === 'fr' ? "Rejoindre l'appel" : 'Join Call'}
                          </a>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modern Modal for Scheduling */}
      {showModal && (
        <div className="fixed inset-0 bg-brand-teal/80 backdrop-blur-md flex items-center justify-center p-6 z-50 overflow-y-auto">
          <div className="bg-white rounded-[3rem] p-10 md:p-14 max-w-xl w-full shadow-2xl relative animate-fade-up">
            <button onClick={() => setShowModal(false)} className="absolute top-8 end-8 p-3 rounded-full hover:bg-gray-100 transition-colors">
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            
            <h2 className="text-3xl font-black text-brand-teal mb-8">{t.scheduleTitle}</h2>
            
            <div className="mb-10 p-5 bg-brand-mint/5 rounded-3xl border border-brand-mint/10 flex items-center gap-4">
              <div className="w-12 h-12 bg-brand-mint/20 rounded-2xl flex items-center justify-center text-brand-mint">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              </div>
              <span className="text-lg font-bold text-brand-mint capitalize">
                {selectedDate?.toLocaleDateString(locale as string, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
            </div>

            <form onSubmit={handleSchedule} className="space-y-8">
              <div className="space-y-3">
                <label className="text-sm font-black text-brand-teal uppercase tracking-widest ms-2">{t.selectProf}</label>
                <select
                  required
                  value={selectedProfessional}
                  onChange={(e) => setSelectedProfessional(e.target.value)}
                  className="w-full rounded-2xl bg-gray-50 border border-gray-200 px-6 py-4 text-brand-teal font-bold focus:border-brand-mint focus:ring-4 focus:ring-brand-mint/10 outline-none appearance-none cursor-pointer"
                >
                  <option value="">-- {t.selectProf} --</option>
                  {professionals.map(p => (
                    <option key={p.id} value={p.id}>{p.user.firstName} {p.user.lastName}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-black text-brand-teal uppercase tracking-widest ms-2">{t.time}</label>
                <input
                  type="time"
                  required
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full rounded-2xl bg-gray-50 border border-gray-200 px-6 py-4 text-brand-teal font-bold focus:border-brand-mint focus:ring-4 focus:ring-brand-mint/10 outline-none"
                />
              </div>

              <div className="space-y-3">
                <label className="text-sm font-black text-brand-teal uppercase tracking-widest ms-2">{t.notes}</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  className="w-full rounded-2xl bg-gray-50 border border-gray-200 px-6 py-4 text-brand-teal font-bold focus:border-brand-mint focus:ring-4 focus:ring-brand-mint/10 outline-none resize-none"
                ></textarea>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-8 py-5 rounded-2xl border-2 border-gray-100 font-black text-gray-400 hover:bg-gray-50 transition-colors uppercase tracking-widest text-sm"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  className="flex-1 px-8 py-5 rounded-2xl bg-brand-mint font-black text-white shadow-xl shadow-brand-mint/20 hover:scale-105 active:scale-95 transition-all uppercase tracking-widest text-sm"
                >
                  {t.confirm}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
