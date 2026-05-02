import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AppointmentService } from '../services/appointment.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Controller('appointments')
@UseGuards(JwtAuthGuard)
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  async create(@Request() req: any, @Body() body: any) {
    return this.appointmentService.create({
      ...body,
      userId: req.user.userId,
    });
  }

  @Get()
  async findAll(@Request() req: any) {
    return this.appointmentService.findAllForUser(req.user.userId, req.user.role);
  }

  @Get('professionals')
  async findAllProfessionals() {
    return this.appointmentService.findAllProfessionals();
  }
}
