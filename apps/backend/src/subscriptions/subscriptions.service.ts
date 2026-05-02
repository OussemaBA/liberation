import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SubscriptionStatus } from '@prisma/client';

@Injectable()
export class SubscriptionsService {
  constructor(private prisma: PrismaService) {}

  async findAllPacks() {
    return this.prisma.pack.findMany({
      orderBy: { duration: 'asc' },
    });
  }

  async createSubscription(userId: string, packId: string) {
    const pack = await this.prisma.pack.findUnique({ where: { id: packId } });
    if (!pack) throw new NotFoundException('Pack not found');

    const patient = await this.prisma.patientProfile.findUnique({
      where: { userId },
    });
    if (!patient) throw new NotFoundException('Patient profile not found');

    // Calculate expiry date
    const expiresAt = new Date();
    expiresAt.setMonth(expiresAt.getMonth() + pack.duration);

    return this.prisma.subscription.create({
      data: {
        patientId: patient.id,
        packId: pack.id,
        status: SubscriptionStatus.ACTIVE,
        expiresAt,
      },
    });
  }

  async getCurrentSubscription(userId: string) {
    const patient = await this.prisma.patientProfile.findUnique({
      where: { userId },
    });
    if (!patient) return null;

    return this.prisma.subscription.findFirst({
      where: {
        patientId: patient.id,
        status: SubscriptionStatus.ACTIVE,
      },
      include: { pack: true },
      orderBy: { createdAt: 'desc' },
    });
  }
}
