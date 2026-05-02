import { Module } from '@nestjs/common';
import { SubscriptionService } from './services/subscription.service';
import { SubscriptionController } from './controllers/subscription.controller';
import { SubscriptionRepository } from './repositories/subscription.repository';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  providers: [SubscriptionService, SubscriptionRepository, PrismaService],
  controllers: [SubscriptionController],
})
export class SubscriptionsModule {}
