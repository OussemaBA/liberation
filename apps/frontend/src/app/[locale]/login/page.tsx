'use client';

import { useState } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const { locale } = useParams();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect');
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const translations = {
    en: {
      title: 'Welcome Back',
      subtitle: 'Continue your journey to freedom',
      email: 'Email address',
      password: 'Password',
      submit: 'Sign In',
      noAccount: "Don't have an account?",
      signUp: 'Create one now',
      invalid: 'Invalid email or password',
    },
    fr: {
      title: 'Bon retour',
      subtitle: 'Continuez votre parcours vers la liberté',
      email: 'Adresse email',
      password: 'Mot de passe',
      submit: 'Se connecter',
      noAccount: "Vous n'avez pas de compte ?",
      signUp: 'En créer un maintenant',
      invalid: 'Email ou mot de passe invalide',
    },
    ar: {
      title: 'مرحباً بعودتك',
      subtitle: 'واصل رحلتك نحو الحرية',
      email: 'البريد الإلكتروني',
      password: 'كلمة المرور',
      submit: 'تسجيل الدخول',
      noAccount: 'ليس لديك حساب؟',
      signUp: 'أنشئ حساباً الآن',
      invalid: 'البريد الإلكتروني أو كلمة المرور غير صالحة',
    },
  };

  const content = translations[locale as 'en' | 'fr' | 'ar'] || translations.fr;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(content.invalid);
      }

      const data = await response.json();
      login(data.access_token, data.user);
      
      if (redirect) {
        router.push(`/${locale}/${redirect}`);
      } else if (data.user.role === 'ADMIN') {
        router.push(`/${locale}/admin`);
      } else if (data.user.role === 'PROFESSIONAL') {
        router.push(`/${locale}/dashboard/pro`);
      } else {
        router.push(`/${locale}/dashboard`);
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
      <div className="absolute bottom-[-10%] end-[-10%] w-[40%] h-[40%] bg-brand-gold/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>

      <div className="w-full max-w-lg glass rounded-[2.5rem] p-10 md:p-14 shadow-2xl relative z-10 animate-fade-up">
        <div className="mb-10 text-center">
          <div className="inline-block p-4 rounded-3xl bg-brand-mint/20 mb-6">
            <svg className="w-10 h-10 text-brand-mint" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
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

        <form onSubmit={handleSubmit} method="POST" className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-bold text-brand-mint/90 mb-2 ms-1">{content.email}</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="username"
              placeholder="name@example.com"
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
              autoComplete="current-password"
              placeholder="••••••••"
              className="w-full rounded-2xl bg-white/5 border border-white/10 px-6 py-4 text-white placeholder-white/30 focus:border-brand-mint focus:ring-4 focus:ring-brand-mint/10 focus:outline-none transition-all"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-2xl bg-brand-mint py-5 text-xl font-bold text-white shadow-xl shadow-brand-mint/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-4"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {content.submit}
              </span>
            ) : content.submit}
          </button>
        </form>

        <p className="mt-10 text-center text-lg text-white/60">
          {content.noAccount}{' '}
          <Link href={`/${locale}/register`} className="font-bold text-brand-gold hover:text-brand-mint transition-colors underline decoration-2 underline-offset-4">
            {content.signUp}
          </Link>
        </p>
      </div>
    </div>
  );
}
