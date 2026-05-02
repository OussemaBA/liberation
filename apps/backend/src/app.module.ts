import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';

// Modular Architecture Imports
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { AppointmentsModule } from './modules/appointments/appointments.module';
import { SubscriptionsModule } from './modules/subscriptions/subscriptions.module';
import { OnboardingModule } from './modules/onboarding/onboarding.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { VideoModule } from './modules/video/video.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UsersModule,
    AppointmentsModule,
    SubscriptionsModule,
    OnboardingModule,
    PaymentsModule,
    VideoModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}
