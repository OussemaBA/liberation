'use client';

import { useParams, useRouter } from 'next/navigation';
import VideoRoom from '@/features/appointments/components/VideoRoom';

export default function MeetingPage() {
  const { id, locale } = useParams();
  const router = useRouter();

  const handleLeave = () => {
    router.push(`/${locale}/dashboard`);
  };

  return (
    <div className="h-screen w-full flex flex-col bg-brand-teal">
      <VideoRoom 
        appointmentId={id as string} 
        onLeave={handleLeave} 
        locale={locale as string} 
      />
    </div>
  );
}
