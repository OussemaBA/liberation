import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('appointments')
@UseGuards(JwtAuthGuard)
export class AppointmentsController {
  constructor(private appointmentsService: AppointmentsService) {}

  @Post()
  async create(@Request() req: any, @Body() body: any) {
    return this.appointmentsService.create({
      ...body,
      userId: req.user.userId,
    });
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
