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

  const t = {
    en: {
      title: 'Your Dashboard',
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
    },
    fr: {
      title: 'Votre Tableau de bord',
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
    },
    ar: {
      title: 'لوحة التحكم الخاصة بك',
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
    },
  }[locale as 'en' | 'fr' | 'ar'] || t.fr;

  useEffect(() => {
    // In a real app, we'd fetch from our API
    // For now, let's mock some data or try to fetch if backend is up
    const fetchData = async () => {
      try {
        // Mocking for now to ensure UI works
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
    // Reset form
    setSelectedProfessional('');
    setTime('10:00');
    setNotes('');
  };

  return (
    <main className="flex-1 bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-3xl font-bold text-brand-teal">{t.title}</h1>
          <div className="flex gap-4">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-brand-mint/20 flex flex-col items-center min-w-[120px]">
              <span className="text-2xl font-bold text-brand-mint">12</span>
              <span className="text-xs text-gray-500 uppercase font-semibold">{t.smokeFree}</span>
            </div>
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-brand-gold/20 flex flex-col items-center min-w-[120px]">
              <span className="text-2xl font-bold text-brand-gold">145 د.ت</span>
              <span className="text-xs text-gray-500 uppercase font-semibold">{t.savings}</span>
            </div>
          </div>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Calendar onSelectDate={handleSelectDate} />
            <SolidarityBanner />
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-bold text-brand-teal flex items-center gap-2">
              <span className="w-2 h-8 bg-brand-mint rounded-full"></span>
              {t.upcoming}
            </h2>
            <div className="space-y-4">
              {appointments.length === 0 ? (
                <div className="bg-white p-8 rounded-3xl border border-dashed border-gray-300 text-center text-gray-500">
                  {t.noMeetings}
                </div>
              ) : (
                appointments.map(apt => (
                  <div key={apt.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4">
                    <div className="bg-brand-mint/10 p-3 rounded-xl text-brand-mint font-bold text-center min-w-[60px]">
                      <div className="text-xs uppercase">{new Date(apt.dateTime).toLocaleDateString(locale as string, { month: 'short' })}</div>
                      <div className="text-xl">{new Date(apt.dateTime).getDate()}</div>
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-gray-800">
                        {apt.professional.user.firstName} {apt.professional.user.lastName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(apt.dateTime).toLocaleTimeString(locale as string, { hour: '2-digit', minute: '2-digit' })} • {apt.type}
                      </div>
                      <div className="mt-2 flex gap-2">
                        <div className="inline-block px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-bold rounded-full uppercase tracking-wider">
                          {apt.status}
                        </div>
                        <a
                          href={`/${locale}/meeting/${apt.id}`}
                          className="inline-block px-3 py-1 bg-brand-mint text-white text-xs font-bold rounded-full uppercase tracking-wider hover:bg-opacity-90 transition-all"
                        >
                          Join Meeting
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

      {/* Modal for Scheduling */}
      {showModal && (
        <div className="fixed inset-0 bg-brand-teal/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl animate-in fade-in zoom-in duration-200">
            <h2 className="text-2xl font-bold text-brand-teal mb-6">{t.scheduleTitle}</h2>
            <div className="mb-4 text-brand-mint font-bold p-3 bg-brand-mint/5 rounded-xl border border-brand-mint/10">
              {selectedDate?.toLocaleDateString(locale as string, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
            <form onSubmit={handleSchedule} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">{t.selectProf}</label>
                <select
                  required
                  value={selectedProfessional}
                  onChange={(e) => setSelectedProfessional(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-brand-mint focus:ring-1 focus:ring-brand-mint outline-none"
                >
                  <option value="">-- {t.selectProf} --</option>
                  {professionals.map(p => (
                    <option key={p.id} value={p.id}>{p.user.firstName} {p.user.lastName}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">{t.time}</label>
                <input
                  type="time"
                  required
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-brand-mint focus:ring-1 focus:ring-brand-mint outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">{t.notes}</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-brand-mint focus:ring-1 focus:ring-brand-mint outline-none resize-none"
                ></textarea>
              </div>
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-6 py-3 rounded-xl border border-gray-200 font-bold text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 rounded-xl bg-brand-mint font-bold text-white shadow-lg hover:bg-opacity-90 transition-all"
                >
                  {t.confirm}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
