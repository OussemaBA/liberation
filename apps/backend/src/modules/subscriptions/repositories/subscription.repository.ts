import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { BasePrismaRepository } from '../../../common/repositories/base.prisma.repository';
import { Subscription, SubscriptionStatus } from '@prisma/client';

@Injectable()
export class SubscriptionRepository extends BasePrismaRepository<Subscription> {
  constructor(prisma: PrismaService) {
    super(prisma, 'subscription');
  }

  async findActiveByUserId(userId: string): Promise<Subscription | null> {
    return this.prisma.subscription.findFirst({
      where: {
        userId,
        status: SubscriptionStatus.ACTIVE,
      },
      include: { pack: true },
      orderBy: { startDate: 'desc' },
    });
  }
}
