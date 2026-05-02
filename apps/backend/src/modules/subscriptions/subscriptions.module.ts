import { Module } from '@nestjs/common';
import { SubscriptionService } from './services/subscription.service';
import { SubscriptionController } from './controllers/subscription.controller';
import { SubscriptionRepository } from './repositories/subscription.repository';

@Module({
  providers: [SubscriptionService, SubscriptionRepository],
  controllers: [SubscriptionController],
})
export class SubscriptionsModule {}
