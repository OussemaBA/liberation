import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AccessToken } from 'livekit-server-sdk';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class VideoService {
  private readonly apiKey: string;
  private readonly apiSecret: string;

  constructor(private readonly prisma: PrismaService) {
    this.apiKey = process.env.LIVEKIT_API_KEY || '';
    this.apiSecret = process.env.LIVEKIT_API_SECRET || '';
  }

  async generateToken(userId: string, appointmentId: string) {
    // 1. Verify user association with the appointment
    const appointment = await this.prisma.appointment.findUnique({
      where: { id: appointmentId },
      include: {
        patient: { select: { userId: true } },
        professional: { select: { userId: true } },
      },
    });

    if (!appointment) {
      throw new UnauthorizedException('Appointment not found');
    }

    const isPatient = appointment.patient.userId === userId;
    const isProfessional = appointment.professional.userId === userId;

    if (!isPatient && !isProfessional) {
      throw new UnauthorizedException('Unauthorized access to this session');
    }

    // 2. Fetch user details for identity
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    const identity = `${user?.firstName || 'User'}_${user?.role}`;
    
    // 3. Create LiveKit Access Token
    const at = new AccessToken(this.apiKey, this.apiSecret, {
      identity: identity,
      name: `${user?.firstName} ${user?.lastName}`,
    });

    at.addGrant({
      roomJoin: true,
      room: appointmentId,
      canPublish: true,
      canSubscribe: true,
    });

    return {
      token: at.toJwt(),
      serverUrl: process.env.LIVEKIT_URL,
    };
  }
}
