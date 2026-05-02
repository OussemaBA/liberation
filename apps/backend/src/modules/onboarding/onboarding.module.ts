import { Module } from '@nestjs/common';
import { OnboardingService } from './services/onboarding.service';
import { OnboardingController } from './controllers/onboarding.controller';
import { OnboardingRepository } from './repositories/onboarding.repository';

@Module({
  providers: [OnboardingService, OnboardingRepository],
  controllers: [OnboardingController],
})
export class OnboardingModule {}
