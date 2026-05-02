'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const { locale } = useParams();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const content = {
    en: {
      title: 'Welcome Back',
      subtitle: 'Sign in to your account',
      email: 'Email',
      password: 'Password',
      submit: 'Sign In',
      noAccount: "Don't have an account?",
      signUp: 'Sign Up',
      invalid: 'Invalid email or password',
    },
    fr: {
      title: 'Bon retour',
      subtitle: 'Connectez-vous à votre compte',
      email: 'Email',
      password: 'Mot de passe',
      submit: 'Se connecter',
      noAccount: "Vous n'avez pas de compte ?",
      signUp: "S'inscrire",
      invalid: 'Email ou mot de passe invalide',
    },
    ar: {
      title: 'مرحباً بعودتك',
      subtitle: 'تسجيل الدخول إلى حسابك',
      email: 'البريد الإلكتروني',
      password: 'كلمة المرور',
      submit: 'تسجيل الدخول',
      noAccount: 'ليس لديك حساب؟',
      signUp: 'إنشاء حساب',
      invalid: 'البريد الإلكتروني أو كلمة المرور غير صالحة',
    },
  }[locale as 'en' | 'fr' | 'ar'] || content.fr;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      console.log('Attempting login for:', formData.email);
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Login failed:', errorData);
        throw new Error(content.invalid);
      }

      const data = await response.json();
      console.log('Login successful, user role:', data.user.role);
      login(data.access_token, data.user);
      
      // Redirect based on role
      if (data.user.role === 'ADMIN') {
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
    <div className="flex min-h-screen items-center justify-center bg-brand-teal p-6 font-sans">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-brand-teal mb-2">
            {content.title}
          </h1>
          <p className="text-gray-500">{content.subtitle}</p>
        </div>
        
        {error && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-500 border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} method="POST" className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">{content.email}</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="username"
              className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm focus:border-brand-mint focus:outline-none focus:ring-2 focus:ring-brand-mint/20 transition-all"
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
              autoComplete="current-password"
              className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm focus:border-brand-mint focus:outline-none focus:ring-2 focus:ring-brand-mint/20 transition-all"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-xl bg-brand-mint py-4 text-lg font-semibold text-white shadow-md hover:bg-opacity-90 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? '...' : content.submit}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-600">
          {content.noAccount}{' '}
          <Link href={`/${locale}/register`} className="font-semibold text-brand-mint hover:underline">
            {content.signUp}
          </Link>
        </p>
      </div>
    </div>
  );
}
