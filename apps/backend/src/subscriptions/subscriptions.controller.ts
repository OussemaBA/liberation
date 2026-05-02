import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private subscriptionsService: SubscriptionsService) {}

  @Get('packs')
  async findAllPacks() {
    return this.subscriptionsService.findAllPacks();
  }

  @UseGuards(JwtAuthGuard)
  @Post('subscribe')
  async subscribe(@Request() req: any, @Body('packId') packId: string) {
    return this.subscriptionsService.createSubscription(req.user.userId, packId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('current')
  async getCurrent(@Request() req: any) {
    return this.subscriptionsService.getCurrentSubscription(req.user.userId);
  }
}
