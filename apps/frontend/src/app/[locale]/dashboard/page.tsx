'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/features/auth/components/AuthProvider';
import { 
  LayoutDashboard, 
  User, 
  Settings, 
  LogOut, 
  Calendar as CalendarIcon, 
  Plus, 
  TrendingUp, 
  Wallet, 
  Award,
  Bell,
  Search,
  Loader2,
  Clock,
  UserCheck,
  CheckCircle2,
  CalendarDays,
  Video,
  Menu,
  X
} from 'lucide-react';
import Link from 'next/link';
import Calendar from '@/features/appointments/components/Calendar';
import SolidarityBanner from '@/features/dashboard/components/SolidarityBanner';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { AppointmentService } from '@/lib/services/appointment.service';
import { SubscriptionService } from '@/lib/services/subscription.service';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogTrigger
} from '@/components/ui/Dialog';
import { Input } from '@/components/ui/Input';
import { cn } from '@/lib/utils';

export default function DashboardPage() {
  const { user, token, logout, isLoading: authLoading } = useAuth();
  const { locale } = useParams();
  const router = useRouter();
  const [appointments, setAppointments] = useState<any[]>([]);
  const [subscription, setSubscription] = useState<any>(null);
  const [professionals, setProfessionals] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const [bookingData, setBookingData] = useState({
    professionalId: '',
    date: '',
    time: '10:00',
  });

  const translations = {
    en: {
      welcome: "Clinical Dashboard",
      greeting: "Welcome back",
      subtitle: "Monitoring your journey to freedom",
      stats: {
        smokeFree: "Smoke Free Days",
        saved: "Currency Saved",
        status: "Protocol Status",
      },
      appointments: "Clinical Sessions",
      noAppointments: "No upcoming clinical sessions.",
      book: "Schedule Session",
      subscription: "Active Protocol",
      logout: "Sign Out",
      dashboard: "Overview",
      profile: "Health Record",
      settings: "Configuration",
      join: "Join Meeting",
      modal: {
        title: "Schedule clinical session",
        desc: "Select a professional and preferred time for your TCC session.",
        pro: "Select Specialist",
        date: "Preferred Date",
        time: "Preferred Time",
        submit: "Confirm Session",
        success: "Session Scheduled Successfully"
      }
    },
    fr: {
      welcome: "Tableau Clinique",
      greeting: "Bon retour",
      subtitle: "Suivi de votre parcours de liberté",
      stats: {
        smokeFree: "Jours sans Tabac",
        saved: "Économies Réalisées",
        status: "Statut Protocole",
      },
      appointments: "Séances Cliniques",
      noAppointments: "Aucune séance prévue.",
      book: "Planifier Séance",
      subscription: "Protocole Actif",
      logout: "Déconnexion",
      dashboard: "Aperçu",
      profile: "Dossier Santé",
      settings: "Configuration",
      join: "Rejoindre",
      modal: {
        title: "Planifier une séance clinique",
        desc: "Choisissez un professionnel et l'heure pour votre séance TCC.",
        pro: "Sélectionner un spécialiste",
        date: "Date souhaitée",
        time: "Heure souhaitée",
        submit: "Confirmer la séance",
        success: "Séance planifiée avec succès"
      }
    },
    ar: {
      welcome: "لوحة التحكم الطبية",
      greeting: "مرحباً بك مجدداً",
      subtitle: "متابعة رحلتك نحو التحرر",
      stats: {
        smokeFree: "أيام بدون تدخين",
        saved: "المبالغ المدخرة",
        status: "حالة البروتوكول",
      },
      appointments: "الجلسات الطبية",
      noAppointments: "لا توجد جلسات قادمة.",
      book: "حجز جلسة",
      subscription: "البروتوكول النشط",
      logout: "تسجيل الخروج",
      dashboard: "نظرة عامة",
      profile: "السجل الصحي",
      settings: "الإعدادات",
      join: "انضمام",
      modal: {
        title: "حجز جلسة طبية",
        desc: "اختر المتخصص والوقت المفضل لجلسة العلاج المعرفي السلوكي.",
        pro: "اختر الأخصائي",
        date: "التاريخ",
        time: "الوقت",
        submit: "تأكيد الحجز",
        success: "تم حجز الجلسة بنجاح"
      }
    },
  };

  const t = translations[locale as 'en' | 'fr' | 'ar'] || translations.fr;

  const fetchData = async () => {
    if (!token) return;
    try {
      const [appts, sub, pros] = await Promise.all([
        AppointmentService.findAll(token),
        SubscriptionService.findCurrent(token),
        AppointmentService.findProfessionals(token)
      ]);

      setAppointments(appts);
      setSubscription(sub);
      setProfessionals(pros);
      if (pros.length > 0) setBookingData(prev => ({ ...prev, professionalId: pros[0].id }));
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading && !user) {
      router.push(`/${locale}/login`);
      return;
    }
    if (token) fetchData();
  }, [user, token, authLoading, locale, router]);

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setIsSubmitting(true);

    try {
      const dateTime = `${bookingData.date}T${bookingData.time}:00.000Z`;
      await AppointmentService.create(token, {
        professionalId: bookingData.professionalId,
        dateTime,
      });

      await fetchData();
      setIsBookingOpen(false);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <Loader2 className="h-10 w-10 animate-spin text-brand-mint" />
      </div>
    );
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-brand-teal text-white">
      <div className="p-8 lg:p-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-mint rounded-xl flex items-center justify-center shadow-lg shadow-black/20 shrink-0">
            <span className="text-white font-black text-xl">ﺗ</span>
          </div>
          <span className="text-2xl font-black tracking-tight whitespace-nowrap">ﺗﺤﺮر</span>
        </div>
      </div>
      
      <nav className="flex-1 px-6 space-y-2">
        <div className="px-4 py-4 rounded-xl bg-white/10 text-white font-bold flex items-center gap-3 cursor-pointer">
          <LayoutDashboard className="w-5 h-5 text-brand-mint shrink-0" />
          <span className="truncate">{t.dashboard}</span>
        </div>
        <div className="px-4 py-4 rounded-xl text-white/40 font-bold hover:bg-white/5 transition-all flex items-center gap-3 cursor-pointer group">
          <User className="w-5 h-5 group-hover:text-white transition-colors shrink-0" />
          <span className="group-hover:text-white transition-colors truncate">{t.profile}</span>
        </div>
        <div className="px-4 py-4 rounded-xl text-white/40 font-bold hover:bg-white/5 transition-all flex items-center gap-3 cursor-pointer group">
          <CalendarIcon className="w-5 h-5 group-hover:text-white transition-colors shrink-0" />
          <span className="group-hover:text-white transition-colors truncate">{t.appointments}</span>
        </div>
        <div className="px-4 py-4 rounded-xl text-white/40 font-bold hover:bg-white/5 transition-all flex items-center gap-3 cursor-pointer group">
          <Settings className="w-5 h-5 group-hover:text-white transition-colors shrink-0" />
          <span className="group-hover:text-white transition-colors truncate">{t.settings}</span>
        </div>
      </nav>

      <div className="p-8 lg:p-10 mt-auto border-t border-white/5 space-y-8">
        <div className="p-6 rounded-[2rem] bg-brand-mint/10 border border-brand-mint/20">
          <p className="text-xs font-black text-brand-mint uppercase tracking-widest mb-2">Help Center</p>
          <p className="text-sm text-white/60 font-medium mb-4">Need medical assistance or support?</p>
          <Button size="sm" className="w-full bg-brand-mint hover:bg-brand-mint/90 rounded-xl">Contact Support</Button>
        </div>
        <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-destructive font-bold hover:bg-destructive/10 transition-all group">
          <LogOut className="w-5 h-5 opacity-60 group-hover:opacity-100 shrink-0" />
          <span className="truncate">{t.logout}</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col xl:flex-row overflow-x-hidden">
      {/* Desktop Sidebar */}
      <aside className="w-80 bg-brand-teal hidden xl:flex flex-col sticky top-0 h-screen shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <Dialog open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <DialogContent className="fixed inset-y-0 start-0 w-[300px] h-full p-0 border-none rounded-none shadow-2xl z-[70] bg-brand-teal">
              <SidebarContent />
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>

      <main className="flex-1 min-w-0 flex flex-col">
        {/* Meticulous Responsive Header */}
        <header className="h-20 sm:h-24 bg-white/80 backdrop-blur-xl border-b border-slate-100 px-4 sm:px-6 lg:px-10 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-4 sm:gap-6 flex-1 min-w-0">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="xl:hidden p-2 hover:bg-slate-100 rounded-xl transition-colors shrink-0"
            >
              <Menu className="h-6 w-6 text-brand-teal" />
            </button>
            
            <div className="hidden lg:flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 w-full max-w-sm">
              <Search className="h-4 w-4 text-slate-300 shrink-0" />
              <input type="text" placeholder="Search protocol data..." className="bg-transparent border-none text-sm font-medium focus:ring-0 placeholder:text-slate-300 w-full truncate" />
            </div>

            {/* Mobile Brand Logo */}
            <div className="xl:hidden flex items-center gap-2 lg:hidden">
              <div className="w-8 h-8 bg-brand-mint rounded-lg flex items-center justify-center shrink-0">
                <span className="text-white font-black">ﺗ</span>
              </div>
              <span className="text-xl font-black text-brand-teal truncate">ﺗﺤﺮر</span>
            </div>
          </div>

          <div className="flex items-center gap-4 sm:gap-8 shrink-0">
            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>
            <div className="hidden sm:block h-10 w-[1px] bg-slate-100" />
            
            <div className="flex items-center gap-3 sm:gap-4 group cursor-pointer max-w-[200px]">
              <div className="text-right hidden md:block min-w-0">
                <p className="text-sm font-black text-brand-teal leading-none mb-1 truncate">{user?.firstName} {user?.lastName}</p>
                <p className="text-[10px] font-black text-brand-mint uppercase tracking-widest leading-none">PatientID: #7742</p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-brand-teal flex items-center justify-center font-black text-white shadow-xl shadow-brand-teal/10 relative transition-transform active:scale-95 shrink-0">
                {user?.firstName?.[0]}{user?.lastName?.[0]}
                <div className="absolute -bottom-0.5 -right-0.5 sm:-bottom-1 sm:-right-1 w-3.5 h-3.5 sm:w-4 sm:h-4 bg-brand-mint border-2 border-white rounded-full" />
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-10 space-y-6 sm:y-8 lg:space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
             <SolidarityBanner />
          </motion.div>

          {/* Metrics Grid - Responsive Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {[
              { label: t.stats.smokeFree, value: "12", unit: "days", icon: TrendingUp, color: "text-brand-mint", bgColor: "bg-brand-mint/10", trend: "+2" },
              { label: t.stats.saved, value: "184", unit: "DT", icon: Wallet, color: "text-brand-gold", bgColor: "bg-brand-gold/10", trend: "8% saved" },
              { label: t.stats.status, value: subscription?.pack?.name || "None", unit: "ACTIVE", icon: Award, color: "text-brand-teal", bgColor: "bg-brand-teal/10", trend: "Level 2" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="border-none shadow-xl shadow-slate-200/40 rounded-[2rem] overflow-hidden p-6 sm:p-8 hover:shadow-2xl transition-all h-full">
                  <div className="flex justify-between items-start mb-6">
                    <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shrink-0", stat.bgColor)}>
                      <stat.icon className={cn("h-6 w-6", stat.color)} />
                    </div>
                    <span className="text-[10px] font-black text-brand-mint bg-brand-mint/5 px-2 py-1 rounded-md uppercase tracking-wider whitespace-nowrap">{stat.trend}</span>
                  </div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">{stat.label}</p>
                  <div className="flex items-baseline gap-2 overflow-hidden">
                    <span className="text-3xl sm:text-4xl font-black text-brand-teal tracking-tighter truncate">{stat.value}</span>
                    <span className="text-xs sm:text-sm font-bold text-slate-400 shrink-0">{stat.unit}</span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-7 xl:col-span-8 space-y-10 min-w-0"
            >
              <Card className="border-none shadow-xl shadow-slate-200/40 rounded-[2.5rem] overflow-hidden">
                <CardHeader className="p-6 sm:p-8 lg:p-10 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-xl sm:text-2xl">{t.appointments}</CardTitle>
                    <CardDescription className="text-sm mt-1">Manage your certified clinical interactions</CardDescription>
                  </div>
                  <Button onClick={() => setIsBookingOpen(true)} variant="brand" className="rounded-xl shadow-lg shadow-brand-teal/10 px-6 w-full sm:w-auto">
                    <Plus className="h-4 w-4 me-2" />
                    {t.book}
                  </Button>
                </CardHeader>
                
                <CardContent className="px-6 sm:px-8 lg:px-10 pb-10">
                  {appointments.length > 0 ? (
                    <div className="space-y-4">
                      {appointments.map((appt, i) => (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                          key={appt.id} 
                          className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-6 rounded-2xl bg-slate-50/50 border border-slate-100 hover:bg-white hover:shadow-md transition-all group gap-4"
                        >
                          <div className="flex items-center gap-4 sm:gap-6 min-w-0">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white shadow-sm flex items-center justify-center text-brand-teal font-black text-lg shrink-0">
                              {new Date(appt.dateTime).getDate()}
                            </div>
                            <div className="min-w-0">
                              <p className="font-black text-brand-teal mb-1 truncate">
                                {appt.professional?.user?.firstName} {appt.professional?.user?.lastName}
                              </p>
                              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest">
                                <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {new Date(appt.dateTime).toLocaleTimeString(locale as string, { hour: '2-digit', minute: '2-digit' })}</span>
                                <span className="hidden sm:block h-1 w-1 rounded-full bg-slate-200" />
                                <span className="truncate">{appt.type}</span>
                              </div>
                            </div>
                          </div>
                          <Link href={`/${locale}/meeting/${appt.id}`} className="w-full sm:w-auto">
                            <Button variant="ghost" className="w-full sm:w-auto rounded-xl font-bold text-brand-mint group-hover:bg-brand-mint group-hover:text-white group-hover:shadow-lg group-hover:shadow-brand-mint/20 transition-all">
                              <Video className="h-4 w-4 me-2" />
                              {t.join}
                            </Button>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 sm:py-20 border-2 border-dashed border-slate-100 rounded-[2rem] bg-slate-50/50">
                      <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm shrink-0">
                         <CalendarIcon className="h-8 w-8 text-slate-200" />
                      </div>
                      <p className="text-slate-400 font-bold max-w-xs mx-auto mb-8 px-4">{t.noAppointments}</p>
                      <Button onClick={() => setIsBookingOpen(true)} variant="outline" className="rounded-xl border-slate-200 font-bold bg-white">
                        {t.book}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-5 xl:col-span-4"
            >
              <Card className="border-none shadow-xl shadow-slate-200/40 rounded-[2.5rem] p-4 sm:p-6 bg-white/80 backdrop-blur-sm h-full">
                <Calendar />
              </Card>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Premium Booking Modal - Responsive and Accessible */}
      <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
        <DialogContent className="max-w-[95vw] sm:max-w-md max-h-[90vh] overflow-y-auto rounded-[2rem]">
          <DialogHeader className="pb-6">
            <div className="w-12 h-12 bg-brand-mint/10 rounded-2xl flex items-center justify-center mb-4 shrink-0">
              <CalendarDays className="h-6 w-6 text-brand-mint" />
            </div>
            <DialogTitle className="text-xl sm:text-2xl">{t.modal.title}</DialogTitle>
            <DialogDescription className="text-sm">{t.modal.desc}</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleBookingSubmit} className="space-y-6 pt-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ms-1 flex items-center gap-2">
                <UserCheck className="h-3 w-3" />
                {t.modal.pro}
              </label>
              <select
                required
                className="flex h-12 sm:h-14 w-full rounded-xl border border-slate-100 bg-slate-50/50 px-4 py-2 text-sm font-bold text-brand-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-mint/20 appearance-none cursor-pointer hover:bg-slate-100 transition-colors"
                value={bookingData.professionalId}
                onChange={(e) => setBookingData({ ...bookingData, professionalId: e.target.value })}
              >
                {professionals.map((pro) => (
                  <option key={pro.id} value={pro.id}>
                    {pro.user.firstName} {pro.user.lastName} ({pro.type})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ms-1 flex items-center gap-2">
                  <CalendarIcon className="h-3 w-3" />
                  {t.modal.date}
                </label>
                <Input
                  type="date"
                  required
                  min={new Date().toISOString().split('T')[0]}
                  className="h-12 sm:h-14 rounded-xl border-slate-100 bg-slate-50/50 focus-visible:bg-white"
                  value={bookingData.date}
                  onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ms-1 flex items-center gap-2">
                  <Clock className="h-3 w-3" />
                  {t.modal.time}
                </label>
                <Input
                  type="time"
                  required
                  className="h-12 sm:h-14 rounded-xl border-slate-100 bg-slate-50/50 focus-visible:bg-white"
                  value={bookingData.time}
                  onChange={(e) => setBookingData({ ...bookingData, time: e.target.value })}
                />
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={isSubmitting || !bookingData.date}
              size="lg"
              className="w-full h-14 sm:h-16 rounded-2xl bg-brand-teal hover:bg-brand-teal/90 text-base font-black shadow-xl shadow-brand-teal/10 group mt-4"
            >
              {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : (
                <>
                  <span className="truncate">{t.modal.submit}</span>
                  <CheckCircle2 className="ms-2 h-5 w-5 group-hover:scale-110 transition-transform shrink-0" />
                </>
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
