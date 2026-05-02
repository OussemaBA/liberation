import { Module } from '@nestjs/common';
import { AppointmentService } from './services/appointment.service';
import { AppointmentController } from './controllers/appointment.controller';
import { AppointmentRepository } from './repositories/appointment.repository';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  providers: [AppointmentService, AppointmentRepository, PrismaService],
  controllers: [AppointmentController],
})
export class AppointmentsModule {}
