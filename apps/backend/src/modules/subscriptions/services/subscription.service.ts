import { Injectable, NotFoundException } from '@nestjs/common';
import { SubscriptionRepository } from '../repositories/subscription.repository';
import { PrismaService } from '../../../prisma/prisma.service';
import { SubscriptionStatus } from '@prisma/client';

@Injectable()
export class SubscriptionService {
  constructor(
    private readonly subscriptionRepository: SubscriptionRepository,
    private readonly prisma: PrismaService,
  ) {}

  async findAllPacks() {
    return this.prisma.pack.findMany();
  }

  async createSubscription(userId: string, packId: string) {
    const pack = await this.prisma.pack.findUnique({ where: { id: packId } });
    if (!pack) throw new NotFoundException('Pack not found');

    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(startDate.getMonth() + pack.duration);

    return this.subscriptionRepository.create({
      userId,
      packId: pack.id,
      startDate,
      endDate,
      status: SubscriptionStatus.ACTIVE,
      amount: pack.price,
    });
  }

  async getCurrentSubscription(userId: string) {
    return this.subscriptionRepository.findActiveByUserId(userId);
  }
}
