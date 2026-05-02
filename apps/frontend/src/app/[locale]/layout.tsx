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

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const isRtl = locale === 'ar';

  return (
    <html
      lang={locale}
      dir={isRtl ? 'rtl' : 'ltr'}
      className={`${inter.variable} ${cairo.variable} min-h-screen antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
