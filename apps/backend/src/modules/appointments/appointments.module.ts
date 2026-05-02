import { Module } from '@nestjs/common';
import { AppointmentService } from './services/appointment.service';
import { AppointmentController } from './controllers/appointment.controller';
import { AppointmentRepository } from './repositories/appointment.repository';

@Module({
  providers: [AppointmentService, AppointmentRepository],
  controllers: [AppointmentController],
})
export class AppointmentsModule {}
