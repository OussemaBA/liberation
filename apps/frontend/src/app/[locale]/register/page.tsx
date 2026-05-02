'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import Link from 'next/link';

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
      subtitle: 'Start your journey to a smoke-free life',
      firstName: 'First name',
      lastName: 'Last name',
      email: 'Email address',
      password: 'Create password',
      role: 'I am a...',
      patient: 'Patient looking for help',
      professional: 'Healthcare professional',
      submit: 'Create Account',
      proType: 'Specialization',
      doctor: 'Doctor',
      psy: 'Psychologist',
      alreadyHave: 'Already have an account?',
      signIn: 'Sign in instead',
      genericError: 'Something went wrong. Please try again.',
    },
    fr: {
      title: 'Rejoindre Ta7aror',
      subtitle: 'Commencez votre parcours vers une vie sans tabac',
      firstName: 'Prénom',
      lastName: 'Nom',
      email: 'Adresse email',
      password: 'Créer un mot de passe',
      role: 'Je suis un...',
      patient: "Patient cherchant de l'aide",
      professional: 'Professionnel de santé',
      submit: 'Créer un compte',
      proType: 'Spécialisation',
      doctor: 'Médecin',
      psy: 'Psychologue',
      alreadyHave: 'Vous avez déjà un compte ?',
      signIn: 'Se connecter à la place',
      genericError: 'Une erreur est survenue. Veuillez réessayer.',
    },
    ar: {
      title: 'انضم إلى تحرر',
      subtitle: 'ابدأ رحلتك نحو حياة خالية من التدخين',
      firstName: 'الاسم الأول',
      lastName: 'اللقب',
      email: 'البريد الإلكتروني',
      password: 'كلمة المرور',
      role: 'أنا...',
      patient: 'مريض يبحث عن المساعدة',
      professional: 'مهني صحي',
      submit: 'إنشاء حساب',
      proType: 'التخصص',
      doctor: 'طبيب',
      psy: 'أخصائي نفساني',
      alreadyHave: 'لديك حساب بالفعل؟',
      signIn: 'سجل دخولك بدلاً من ذلك',
      genericError: 'حدث خطأ ما. يرجى المحاولة مرة أخرى.',
    },
  };

  const content = translations[locale as 'en' | 'fr' | 'ar'] || translations.fr;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || content.genericError);
      }

      const data = await response.json();
      login(data.access_token, data.user);
      
      if (data.user.role === 'PATIENT') {
        router.push(`/${locale}/pricing`);
      } else {
        router.push(`/${locale}/dashboard/pro`);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center brand-gradient p-6 overflow-hidden relative">
      {/* Decorative blobs */}
      <div className="absolute top-[-10%] start-[-10%] w-[40%] h-[40%] bg-brand-mint/20 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] end-[-10%] w-[40%] h-[40%] bg-brand-gold/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1.5s' }}></div>

      <div className="w-full max-w-2xl glass rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative z-10 animate-fade-up">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-3 tracking-tight">
            {content.title}
          </h1>
          <p className="text-brand-mint/80 font-medium text-lg">{content.subtitle}</p>
        </div>

        {error && (
          <div className="mb-6 rounded-2xl bg-red-500/10 border border-red-500/20 p-4 text-sm text-red-200 text-center backdrop-blur-md">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} method="POST" className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="firstName" className="block text-sm font-bold text-brand-mint/90 mb-2 ms-1">{content.firstName}</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                className="w-full rounded-2xl bg-white/5 border border-white/10 px-6 py-4 text-white placeholder-white/30 focus:border-brand-mint focus:ring-4 focus:ring-brand-mint/10 focus:outline-none transition-all"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-bold text-brand-mint/90 mb-2 ms-1">{content.lastName}</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                required
                className="w-full rounded-2xl bg-white/5 border border-white/10 px-6 py-4 text-white placeholder-white/30 focus:border-brand-mint focus:ring-4 focus:ring-brand-mint/10 focus:outline-none transition-all"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-bold text-brand-mint/90 mb-2 ms-1">{content.email}</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full rounded-2xl bg-white/5 border border-white/10 px-6 py-4 text-white placeholder-white/30 focus:border-brand-mint focus:ring-4 focus:ring-brand-mint/10 focus:outline-none transition-all"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-bold text-brand-mint/90 mb-2 ms-1">{content.password}</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full rounded-2xl bg-white/5 border border-white/10 px-6 py-4 text-white placeholder-white/30 focus:border-brand-mint focus:ring-4 focus:ring-brand-mint/10 focus:outline-none transition-all"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="role" className="block text-sm font-bold text-brand-mint/90 mb-2 ms-1">{content.role}</label>
              <select
                id="role"
                name="role"
                className="w-full rounded-2xl bg-white/5 border border-white/10 px-6 py-4 text-white focus:border-brand-mint focus:ring-4 focus:ring-brand-mint/10 focus:outline-none transition-all appearance-none cursor-pointer"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              >
                <option value="PATIENT" className="bg-brand-teal">{content.patient}</option>
                <option value="PROFESSIONAL" className="bg-brand-teal">{content.professional}</option>
              </select>
            </div>

            {formData.role === 'PROFESSIONAL' && (
              <div className="animate-in fade-in slide-in-from-top-2">
                <label htmlFor="professionalType" className="block text-sm font-bold text-brand-mint/90 mb-2 ms-1">{content.proType}</label>
                <select
                  id="professionalType"
                  name="professionalType"
                  className="w-full rounded-2xl bg-white/5 border border-white/10 px-6 py-4 text-white focus:border-brand-mint focus:ring-4 focus:ring-brand-mint/10 focus:outline-none transition-all appearance-none cursor-pointer"
                  value={formData.professionalType}
                  onChange={(e) => setFormData({ ...formData, professionalType: e.target.value })}
                >
                  <option value="DOCTOR" className="bg-brand-teal">{content.doctor}</option>
                  <option value="PSYCHOLOGIST" className="bg-brand-teal">{content.psy}</option>
                </select>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-2xl bg-brand-mint py-5 text-xl font-bold text-white shadow-xl shadow-brand-mint/20 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-4"
          >
            {isLoading ? '...' : content.submit}
          </button>
        </form>

        <p className="mt-8 text-center text-lg text-white/60">
          {content.alreadyHave}{' '}
          <Link href={`/${locale}/login`} className="font-bold text-brand-gold hover:text-brand-mint transition-colors underline decoration-2 underline-offset-4">
            {content.signIn}
          </Link>
        </p>
      </div>
    </div>
  );
}
