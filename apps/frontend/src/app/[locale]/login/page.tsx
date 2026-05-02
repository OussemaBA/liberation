'use client';

import { useState } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { useAuth } from '@/features/auth/components/AuthProvider';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronLeft, Lock, Mail, Loader2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { AuthService } from '@/lib/services/auth.service';

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
      title: 'Sign In',
      subtitle: 'Access your clinical dashboard',
      email: 'Clinical Email',
      password: 'Secure Password',
      submit: 'Sign In',
      noAccount: "New to the platform?",
      signUp: 'Create clinical account',
      invalid: 'Invalid credentials. Please try again.',
      back: 'Back to Home'
    },
    fr: {
      title: 'Connexion',
      subtitle: 'Accédez à votre tableau de bord clinique',
      email: 'Email Clinique',
      password: 'Mot de passe sécurisé',
      submit: 'Se connecter',
      noAccount: "Nouveau sur la plateforme ?",
      signUp: 'Créer un compte clinique',
      invalid: 'Identifiants invalides. Veuillez réessayer.',
      back: 'Retour à l\'accueil'
    },
    ar: {
      title: 'تسجيل الدخول',
      subtitle: 'الدخول إلى لوحة التحكم الطبية',
      email: 'البريد الإلكتروني الطبي',
      password: 'كلمة المرور الآمنة',
      submit: 'دخول',
      noAccount: 'جديد على المنصة؟',
      signUp: 'إنشاء حساب طبي',
      invalid: 'بيانات الاعتماد غير صالحة. يرجى المحاولة مرة أخرى.',
      back: 'العودة للرئيسية'
    },
  };

  const t = translations[locale as 'en' | 'fr' | 'ar'] || translations.fr;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const data = await AuthService.login(formData);
      login(data.access_token, data.user);
      
      if (redirect) router.push(`/${locale}/${redirect}`);
      else router.push(`/${locale}/dashboard`);
    } catch (err: any) {
      setError(t.invalid);
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

      {/* Background Architectural Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-white -z-10 rounded-bl-full opacity-50" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-brand-mint/5 -z-10 rounded-tr-full" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[440px] z-10"
      >
        <div className="flex justify-center mb-10">
          <div className="w-14 h-14 bg-brand-teal rounded-2xl flex items-center justify-center shadow-xl shadow-brand-teal/20">
            <span className="text-white font-black text-2xl">ﺗ</span>
          </div>
        </div>

        <Card className="border-none shadow-2xl shadow-slate-200/60 rounded-[2rem] overflow-hidden bg-white/80 backdrop-blur-sm">
          <CardHeader className="space-y-2 pb-8 text-center">
            <CardTitle className="text-3xl">{t.title}</CardTitle>
            <CardDescription className="text-base">{t.subtitle}</CardDescription>
          </CardHeader>
          
          <CardContent>
            {error && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-6 p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm font-bold text-center"
              >
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ms-1">{t.email}</label>
                <div className="relative">
                  <Mail className="absolute start-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300" />
                  <Input 
                    type="email" 
                    placeholder="dr.name@clinic.tn"
                    required
                    className="ps-12 h-14 rounded-xl border-slate-100 bg-slate-50/50"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center ms-1">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400">{t.password}</label>
                </div>
                <div className="relative">
                  <Lock className="absolute start-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300" />
                  <Input 
                    type="password" 
                    placeholder="••••••••"
                    required
                    className="ps-12 h-14 rounded-xl border-slate-100 bg-slate-50/50"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                disabled={isLoading}
                size="lg"
                className="w-full bg-brand-teal hover:bg-brand-teal/90 h-14 rounded-xl text-base shadow-lg shadow-brand-teal/10 mt-4 group"
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
                {t.noAccount}{' '}
                <Link href={`/${locale}/register`} className="text-brand-mint font-black hover:underline underline-offset-4">
                  {t.signUp}
                </Link>
              </p>
            </div>
          </div>
        </Card>
      </motion.div>
    </main>
  );
}
