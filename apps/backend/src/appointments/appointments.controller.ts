import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('appointments')
@UseGuards(JwtAuthGuard)
export class AppointmentsController {
  constructor(private appointmentsService: AppointmentsService) {}

  @Post()
  async create(@Request() req: any, @Body() body: any) {
    // If patient is scheduling, we need their patientId
    // For simplicity, we assume the frontend sends patientId or we look it up
    return this.appointmentsService.create(body);
  }

  @Get()
  async findAll(@Request() req: any) {
    return this.appointmentsService.findAllForUser(req.user.userId, req.user.role);
  }

  @Get('professionals')
  async findAllProfessionals() {
    return this.appointmentsService.findAllProfessionals();
  }
}
