import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { AppointmentsModule } from './appointments/appointments.module';

@Module({
  imports: [AuthModule, AppointmentsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
