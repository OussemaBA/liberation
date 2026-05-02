'use client';

import { useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ChevronLeft, Video, ShieldCheck, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/Button';

declare global {
  interface Window {
    JitsiMeetExternalAPI: any;
  }
}

export default function MeetingPage() {
  const { id, locale } = useParams();
  const router = useRouter();
  const jitsiContainerRef = useRef<HTMLDivElement>(null);

  const translations = {
    en: {
      title: "Clinical Consultation",
      room: "Room Session",
      back: "Leave Consultation",
      secure: "Encrypted Clinical Session"
    },
    fr: {
      title: "Consultation Clinique",
      room: "Session de Salle",
      back: "Quitter la Consultation",
      secure: "Session Clinique Chiffrée"
    },
    ar: {
      title: "استشارة طبية",
      room: "جلسة الغرفة",
      back: "مغادرة الاستشارة",
      secure: "جلسة طبية مشفرة"
    }
  };

  const t = translations[locale as 'en' | 'fr' | 'ar'] || translations.fr;

  useEffect(() => {
    // Load Jitsi script
    const script = document.createElement('script');
    script.src = 'https://meet.jit.si/external_api.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (jitsiContainerRef.current) {
        const domain = 'meet.jit.si';
        const options = {
          roomName: `Ta7aror-Meeting-${id}`,
          width: '100%',
          height: '100%',
          parentNode: jitsiContainerRef.current,
          lang: locale as string,
          configOverwrite: {
            startWithAudioMuted: true,
            disableThirdPartyRequests: true,
          },
          interfaceConfigOverwrite: {
            TOOLBAR_BUTTONS: [
              'microphone', 'camera', 'desktop', 'fullscreen',
              'fodeviceselection', 'hangup', 'chat', 'raisehand',
              'videoquality', 'tileview', 'videobackgroundblur', 'help', 'mute-everyone'
            ],
          },
        };
        const api = new window.JitsiMeetExternalAPI(domain, options);
        
        api.addEventListener('videoConferenceLeft', () => {
          router.push(`/${locale}/dashboard`);
        });
      }
    };

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [id, locale, router]);

  return (
    <div className="flex flex-col h-screen bg-brand-teal overflow-hidden">
      {/* Meticulous Clinical Header */}
      <header className="h-20 bg-brand-teal border-b border-white/10 px-8 flex items-center justify-between z-20 shrink-0">
        <div className="flex items-center gap-6">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => router.push(`/${locale}/dashboard`)}
            className="text-white/60 hover:text-white hover:bg-white/10 gap-2 rounded-xl px-4"
          >
            <ChevronLeft className="h-4 w-4 rtl:rotate-180" />
            <span className="text-xs font-black uppercase tracking-widest hidden sm:inline">{t.back}</span>
          </Button>

          <div className="h-8 w-[1px] bg-white/10 hidden sm:block" />

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-mint/20 flex items-center justify-center">
              <Video className="h-5 w-5 text-brand-mint" />
            </div>
            <div>
              <h1 className="text-sm font-black text-white leading-none mb-1">{t.title}</h1>
              <p className="text-[10px] font-black text-white/40 uppercase tracking-widest leading-none">{t.room}: #{id}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-mint/10 border border-brand-mint/20">
             <ShieldCheck className="h-3 w-3 text-brand-mint" />
             <span className="text-[10px] font-black text-brand-mint uppercase tracking-widest">{t.secure}</span>
          </div>
          <div className="w-8 h-8 bg-brand-mint rounded-lg flex items-center justify-center">
            <span className="text-white font-black text-sm">ﺗ</span>
          </div>
        </div>
      </header>

      {/* Fullscreen Video Experience */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        ref={jitsiContainerRef} 
        className="flex-1 bg-black" 
      />
    </div>
  );
}
