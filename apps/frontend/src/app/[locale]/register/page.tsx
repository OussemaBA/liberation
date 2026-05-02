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

  const content = {
    en: {
      title: 'Create Account',
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email',
      password: 'Password',
      role: 'I am a...',
      patient: 'Patient',
      professional: 'Healthcare Professional',
      submit: 'Sign Up',
      proType: 'Professional Type',
      doctor: 'Doctor',
      psy: 'Psychologist',
      alreadyHave: 'Already have an account?',
      signIn: 'Sign In',
      genericError: 'Something went wrong. Please try again.',
    },
    fr: {
      title: 'Créer un compte',
      firstName: 'Prénom',
      lastName: 'Nom',
      email: 'Email',
      password: 'Mot de passe',
      role: 'Je suis un...',
      patient: 'Patient',
      professional: 'Professionnel de santé',
      submit: "S'inscrire",
      proType: 'Type de professionnel',
      doctor: 'Médecin',
      psy: 'Psychologue',
      alreadyHave: 'Vous avez déjà un compte ?',
      signIn: 'Se connecter',
      genericError: "Une erreur est survenue. Veuillez réessayer.",
    },
    ar: {
      title: 'إنشاء حساب',
      firstName: 'الاسم الأول',
      lastName: 'اللقب',
      email: 'البريد الإلكتروني',
      password: 'كلمة المرور',
      role: 'أنا...',
      patient: 'مريض',
      professional: 'مهني صحي',
      submit: 'تسجيل',
      proType: 'نوع المهني',
      doctor: 'طبيب',
      psy: 'أخصائي نفساني',
      alreadyHave: 'لديك حساب بالفعل؟',
      signIn: 'تسجيل الدخول',
      genericError: 'حدث خطأ ما. يرجى المحاولة مرة أخرى.',
    },
  }[locale as 'en' | 'fr' | 'ar'] || content.fr;

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
    <div className="flex min-h-screen items-center justify-center bg-brand-teal p-6 font-sans">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <h1 className="mb-8 text-center text-3xl font-bold text-brand-teal">
          {content.title}
        </h1>

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-500 border border-red-100">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} method="POST" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">{content.firstName}</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                autoComplete="given-name"
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-brand-mint focus:outline-none focus:ring-brand-mint transition-all"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">{content.lastName}</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                required
                autoComplete="family-name"
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-brand-mint focus:outline-none focus:ring-brand-mint transition-all"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">{content.email}</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-brand-mint focus:outline-none focus:ring-brand-mint transition-all"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">{content.password}</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="new-password"
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-brand-mint focus:outline-none focus:ring-brand-mint transition-all"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">{content.role}</label>
            <select
              id="role"
              name="role"
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-brand-mint focus:outline-none focus:ring-brand-mint transition-all"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            >
              <option value="PATIENT">{content.patient}</option>
              <option value="PROFESSIONAL">{content.professional}</option>
            </select>
          </div>

          {formData.role === 'PROFESSIONAL' && (
            <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
              <div>
                <label htmlFor="professionalType" className="block text-sm font-medium text-gray-700">{content.proType}</label>
                <select
                  id="professionalType"
                  name="professionalType"
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-brand-mint focus:outline-none focus:ring-brand-mint transition-all"
                  value={formData.professionalType}
                  onChange={(e) => setFormData({ ...formData, professionalType: e.target.value })}
                >
                  <option value="DOCTOR">{content.doctor}</option>
                  <option value="PSYCHOLOGIST">{content.psy}</option>
                </select>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-xl bg-brand-mint py-3 text-lg font-semibold text-white shadow-md hover:bg-opacity-90 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? '...' : content.submit}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-600">
          {content.alreadyHave}{' '}
          <Link href={`/${locale}/login`} className="font-semibold text-brand-mint hover:underline">
            {content.signIn}
          </Link>
        </p>
      </div>
    </div>
  );
}
