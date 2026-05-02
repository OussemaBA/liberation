import { Controller, Post, Body, UseGuards, Request, Get, Query } from '@nestjs/common';
import { PaymentService } from '../services/payment.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Controller('payments')
@UseGuards(JwtAuthGuard)
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('checkout')
  async createSession(@Request() req: any, @Body() body: any) {
    return this.paymentService.initiateCheckout(req.user.userId, body);
  }

  @Get('verify')
  async verify(@Query('reference') reference: string) {
    return this.paymentService.verifyTransaction(reference);
  }
}
