import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { SubscriptionService } from '../services/subscription.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Controller('subscriptions')
@UseGuards(JwtAuthGuard)
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Get('packs')
  async getPacks() {
    return this.subscriptionService.findAllPacks();
  }

  @Post('subscribe')
  async subscribe(@Request() req: any, @Body() body: { packId: string }) {
    return this.subscriptionService.createSubscription(req.user.userId, body.packId);
  }

  @Get('current')
  async getCurrent(@Request() req: any) {
    return this.subscriptionService.getCurrentSubscription(req.user.userId);
  }
}
