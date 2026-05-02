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

    // Calculate end date
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + pack.duration);

    return this.prisma.subscription.create({
      data: {
        userId: userId,
        packId: pack.id,
        status: SubscriptionStatus.ACTIVE,
        startDate: new Date(),
        endDate: endDate,
        amount: pack.price,
      },
    });
  }

  async getCurrentSubscription(userId: string) {
    return this.prisma.subscription.findFirst({
      where: {
        userId: userId,
        status: SubscriptionStatus.ACTIVE,
      },
      include: { pack: true },
      orderBy: { startDate: 'desc' },
    });
  }
}
