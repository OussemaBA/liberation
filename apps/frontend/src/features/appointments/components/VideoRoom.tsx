'use client';

import {
  ControlBar,
  GridLayout,
  LiveKitRoom,
  ParticipantTile,
  RoomAudioRenderer,
  useTracks,
} from '@livekit/components-react';
import '@livekit/components-styles';
import { Track } from 'livekit-client';
import { useEffect, useState } from 'react';
import { Loader2, ShieldCheck, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { VideoService } from '@/lib/services/video.service';
import { useAuth } from '@/features/auth/components/AuthProvider';

interface VideoRoomProps {
  appointmentId: string;
  onLeave: () => void;
  locale: string;
}

export default function VideoRoom({ appointmentId, onLeave, locale }: VideoRoomProps) {
  const { token: authDataToken } = useAuth();
  const [token, setToken] = useState<string>('');
  const [serverUrl, setServerUrl] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const t = {
    en: {
      loading: "Securing Clinical Connection...",
      secure: "End-to-End Encrypted",
      error: "Connection Failed. Please try again.",
      retry: "Retry Connection"
    },
    fr: {
      loading: "Sécurisation de la connexion...",
      secure: "Chiffré de bout en bout",
      error: "Échec de la connexion. Veuillez réessayer.",
      retry: "Réessayer"
    },
    ar: {
      loading: "تأمين الاتصال الطبي...",
      secure: "اتصال مشفر وآمن",
      error: "فشل الاتصال. يرجى المحاولة مرة أخرى.",
      retry: "إعادة المحاولة"
    }
  }[locale as 'en' | 'fr' | 'ar'] || t.fr;

  useEffect(() => {
    async function fetchToken() {
      if (!authDataToken) return;
      try {
        const data = await VideoService.getToken(authDataToken, appointmentId);
        setToken(data.token);
        setServerUrl(data.serverUrl);
      } catch (err) {
        console.error(err);
        setError(t.error);
      }
    }
    fetchToken();
  }, [appointmentId, authDataToken, t.error]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-brand-teal text-white p-6">
        <AlertCircle className="h-12 w-12 text-destructive mb-4" />
        <p className="text-lg font-bold mb-6">{error}</p>
        <Button variant="outline" onClick={() => window.location.reload()} className="border-white/20 text-white hover:bg-white/10">
          {t.retry}
        </Button>
      </div>
    );
  }

  if (!token || !serverUrl) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-brand-teal text-white">
        <Loader2 className="h-10 w-10 animate-spin text-brand-mint mb-4" />
        <p className="text-sm font-black uppercase tracking-widest opacity-60">{t.loading}</p>
      </div>
    );
  }

  return (
    <LiveKitRoom
      video={true}
      audio={true}
      token={token}
      serverUrl={serverUrl}
      onDisconnected={onLeave}
      data-lk-theme="default"
      className="flex-1 flex flex-col"
    >
      {/* Premium Clinical Overlay */}
      <div className="absolute top-4 left-4 z-50 pointer-events-none">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-teal/40 backdrop-blur-md border border-white/10">
          <ShieldCheck className="h-3.5 w-3.5 text-brand-mint" />
          <span className="text-[10px] font-black text-white uppercase tracking-widest">{t.secure}</span>
        </div>
      </div>

      <MyVideoConference />
      <RoomAudioRenderer />
      
      {/* Optimized Control Bar Container */}
      <div className="bg-brand-teal/95 border-t border-white/5 p-4 flex justify-center">
         <ControlBar variation="minimal" />
      </div>
    </LiveKitRoom>
  );
}

function MyVideoConference() {
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, name: 'camera' },
      { source: Track.Source.ScreenShare, name: 'screen_share' },
    ],
    { onlyPlanned: false },
  );

  return (
    <GridLayout tracks={tracks} style={{ height: 'calc(100vh - 160px)' }}>
      <ParticipantTile />
    </GridLayout>
  );
}
