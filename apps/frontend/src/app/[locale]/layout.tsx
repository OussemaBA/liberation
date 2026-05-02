import type { Metadata } from "next";
import { Inter, Cairo } from "next/font/google";
import "../globals.css";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic"],
});

export const metadata: Metadata = {
  title: "تحرر - Ta7aror",
  description: "Plateforme d'accompagnement au sevrage tabagique",
};

import { AuthProvider } from "@/features/auth/components/AuthProvider";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const isRtl = locale === 'ar';
  
  console.log(`[Layout] Fetching messages for locale: ${locale}`);
  // Force the locale in getMessages to ensure correct dictionary is loaded
  const messages = await getMessages({ locale });

  console.log(`[Layout] Rendering RootLayout for locale: ${locale}, RTL: ${isRtl}`);

  return (
    <html
      lang={locale}
      dir={isRtl ? 'rtl' : 'ltr'}
      className={`${inter.variable} ${cairo.variable} min-h-screen antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AuthProvider>
            {children}
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
