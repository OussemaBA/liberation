'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const { locale } = useParams();
  const isRtl = locale === 'ar';

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'PATIENT',
    professionalType: 'DOCTOR',
    specialization: '',
  });

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
    },
  }[locale as 'en' | 'fr' | 'ar'] || content.fr;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, call API here
    console.log('Registering:', formData);
    router.push(`/${locale}/pricing`);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-teal p-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <h1 className="mb-8 text-center text-3xl font-bold text-brand-teal">
          {content.title}
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">{content.firstName}</label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-brand-mint focus:outline-none focus:ring-brand-mint"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">{content.lastName}</label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-brand-mint focus:outline-none focus:ring-brand-mint"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">{content.email}</label>
            <input
              type="email"
              required
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-brand-mint focus:outline-none focus:ring-brand-mint"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">{content.password}</label>
            <input
              type="password"
              required
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-brand-mint focus:outline-none focus:ring-brand-mint"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">{content.role}</label>
            <select
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-brand-mint focus:outline-none focus:ring-brand-mint"
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
                <label className="block text-sm font-medium text-gray-700">{content.proType}</label>
                <select
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-brand-mint focus:outline-none focus:ring-brand-mint"
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
            className="w-full rounded-xl bg-brand-mint py-3 text-lg font-semibold text-white shadow-md hover:bg-opacity-90 transition-all"
          >
            {content.submit}
          </button>
        </form>
      </div>
    </div>
  );
}
