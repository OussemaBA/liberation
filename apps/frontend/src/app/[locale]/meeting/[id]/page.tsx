'use client';

import { useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';

declare global {
  interface Window {
    JitsiMeetExternalAPI: any;
  }
}

export default function MeetingPage() {
  const { id, locale } = useParams();
  const router = useRouter();
  const jitsiContainerRef = useRef<HTMLDivElement>(null);

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
          interfaceConfigOverwrite: {
            TOOLBAR_BUTTONS: [
              'microphone', 'camera', 'closedcaptions', 'desktop', 'fullscreen',
              'fodeviceselection', 'hangup', 'profile', 'chat', 'recording',
              'livestreaming', 'etherpad', 'sharedvideo', 'settings', 'raisehand',
              'videoquality', 'filmstrip', 'invite', 'feedback', 'stats', 'shortcuts',
              'tileview', 'videobackgroundblur', 'download', 'help', 'mute-everyone',
              'security'
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
      document.body.removeChild(script);
    };
  }, [id, locale, router]);

  return (
    <div className="flex flex-col h-screen bg-brand-teal">
      <header className="p-4 flex items-center justify-between bg-brand-teal text-white shadow-lg z-10">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.push(`/${locale}/dashboard`)}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            ←
          </button>
          <h1 className="text-xl font-bold">Meeting Room</h1>
        </div>
        <div className="text-sm opacity-80">Room ID: {id}</div>
      </header>
      <div ref={jitsiContainerRef} className="flex-1" />
    </div>
  );
}
