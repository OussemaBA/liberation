'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/features/auth/components/AuthProvider';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronLeft, User, Mail, Lock, Loader2, ArrowRight, Activity } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { AuthService } from '@/lib/services/auth.service';

export default function RegisterPage() {
  const router = useRouter();
  const { locale } = useParams();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'PATIENT',
    professionalType: 'DOCTOR',
    specialization: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const translations = {
    en: {
      title: 'Join Ta7aror',
      subtitle: 'Begin your clinical protocol today',
      firstName: 'First name',
      lastName: 'Last name',
      email: 'Clinical Email',
      password: 'Secure Password',
      role: 'Identity Type',
      patient: 'Patient Seeking Freedom',
      professional: 'Healthcare Professional',
      submit: 'Create Account',
      alreadyHave: 'Already registered?',
      signIn: 'Sign in instead',
      genericError: 'Protocol initiation failed. Please check your data.',
      back: 'Back to Home'
    },
    fr: {
      title: 'Rejoindre Ta7aror',
      subtitle: 'Commencez votre protocole clinique',
      firstName: 'Prénom',
      lastName: 'Nom',
      email: 'Email Clinique',
      password: 'Mot de passe sécurisé',
      role: 'Type d\'Identité',
      patient: 'Patient en sevrage',
      professional: 'Professionnel de Santé',
      submit: 'Créer un compte',
      alreadyHave: 'Déjà inscrit ?',
      signIn: 'Se connecter',
      genericError: 'Échec de l\'initialisation. Vérifiez vos données.',
      back: 'Retour à l\'accueil'
    },
    ar: {
      title: 'انضم إلى تحرر',
      subtitle: 'ابدأ بروتوكولك الطبي اليوم',
      firstName: 'الاسم الأول',
      lastName: 'اللقب',
      email: 'البريد الإلكتروني الطبي',
      password: 'كلمة المرور الآمنة',
      role: 'نوع الهوية',
      patient: 'مريض يبحث عن المساعدة',
      professional: 'مهني صحي',
      submit: 'إنشاء حساب',
      alreadyHave: 'لديك حساب بالفعل؟',
      signIn: 'سجل دخولك',
      genericError: 'حدث خطأ في التسجيل. يرجى التثبت من البيانات.',
      back: 'العودة للرئيسية'
    },
  };

  const t = translations[locale as 'en' | 'fr' | 'ar'] || translations.fr;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const data = await AuthService.register(formData);
      login(data.access_token, data.user);
      
      if (data.user.role === 'PATIENT') router.push(`/${locale}/pricing`);
      else router.push(`/${locale}/dashboard/pro`);
    } catch (err: any) {
      setError(err.message || t.genericError);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Brand Watermark */}
      <div className="absolute top-10 start-10 hidden md:block">
        <Link href={`/${locale}`} className="flex items-center gap-2 group">
          <ChevronLeft className="h-4 w-4 text-slate-400 group-hover:text-brand-teal transition-colors rtl:rotate-180" />
          <span className="text-sm font-bold text-slate-400 group-hover:text-brand-teal transition-colors">{t.back}</span>
        </Link>
      </div>

      <div className="absolute top-10 end-10">
        <LanguageSwitcher />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[540px] z-10"
      >
        <div className="flex justify-center mb-10">
          <div className="w-14 h-14 bg-brand-teal rounded-2xl flex items-center justify-center shadow-xl shadow-brand-teal/20">
            <span className="text-white font-black text-2xl">ﺗ</span>
          </div>
        </div>

        <Card className="border-none shadow-2xl shadow-slate-200/60 rounded-[2.5rem] overflow-hidden bg-white/80 backdrop-blur-sm">
          <CardHeader className="space-y-2 pb-8 text-center">
            <CardTitle className="text-3xl">{t.title}</CardTitle>
            <CardDescription className="text-base">{t.subtitle}</CardDescription>
          </CardHeader>
          
          <CardContent>
            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-6 p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm font-bold text-center"
              >
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ms-1">{t.firstName}</label>
                  <div className="relative">
                    <User className="absolute start-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
                    <Input 
                      placeholder="Ahmed"
                      required
                      className="ps-11 h-12 rounded-xl border-slate-100 bg-slate-50/50"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ms-1">{t.lastName}</label>
                  <div className="relative">
                    <User className="absolute start-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
                    <Input 
                      placeholder="Trabelsi"
                      required
                      className="ps-11 h-12 rounded-xl border-slate-100 bg-slate-50/50"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ms-1">{t.email}</label>
                <div className="relative">
                  <Mail className="absolute start-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
                  <Input 
                    type="email" 
                    placeholder="name@clinical.tn"
                    required
                    className="ps-11 h-12 rounded-xl border-slate-100 bg-slate-50/50"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ms-1">{t.password}</label>
                <div className="relative">
                  <Lock className="absolute start-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
                  <Input 
                    type="password" 
                    placeholder="••••••••"
                    required
                    className="ps-11 h-12 rounded-xl border-slate-100 bg-slate-50/50"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ms-1">{t.role}</label>
                <div className="relative">
                  <Activity className="absolute start-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
                  <select
                    className="flex h-12 w-full rounded-xl border border-slate-100 bg-slate-50/50 ps-11 pe-4 py-2 text-sm font-bold text-slate-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-mint/20 appearance-none cursor-pointer"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  >
                    <option value="PATIENT">{t.patient}</option>
                    <option value="PROFESSIONAL">{t.professional}</option>
                  </select>
                </div>
              </div>

              <Button 
                type="submit" 
                disabled={isLoading}
                size="lg"
                className="w-full bg-brand-teal hover:bg-brand-teal/90 h-14 rounded-2xl text-base shadow-lg shadow-brand-teal/10 mt-4 group"
              >
                {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : (
                  <>
                    {t.submit}
                    <ArrowRight className="ms-2 h-5 w-5 group-hover:translate-x-1 transition-transform rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>

          <div className="px-10 pb-10">
            <div className="pt-8 border-t border-slate-50 text-center">
              <p className="text-slate-400 font-medium">
                {t.alreadyHave}{' '}
                <Link href={`/${locale}/login`} className="text-brand-mint font-black hover:underline underline-offset-4">
                  {t.signIn}
                </Link>
              </p>
            </div>
          </div>
        </Card>
      </motion.div>
    </main>
  );
}
