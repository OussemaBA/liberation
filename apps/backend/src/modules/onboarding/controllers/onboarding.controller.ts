import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { OnboardingService } from '../services/onboarding.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Controller('onboarding')
@UseGuards(JwtAuthGuard)
export class OnboardingController {
  constructor(private readonly onboardingService: OnboardingService) {}

  @Post('assess')
  async submit(@Request() req: any, @Body() body: any) {
    return this.onboardingService.submitAssessment(req.user.userId, body);
  }

  @Get('history')
  async getHistory(@Request() req: any) {
    return this.onboardingService.getPatientAssessments(req.user.userId);
  }
}
