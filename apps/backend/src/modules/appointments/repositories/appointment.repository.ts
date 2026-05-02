import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { BasePrismaRepository } from '../../../common/repositories/base.prisma.repository';
import { Appointment } from '@prisma/client';

@Injectable()
export class AppointmentRepository extends BasePrismaRepository<Appointment> {
  constructor(prisma: PrismaService) {
    super(prisma, 'appointment');
  }

  async findByUserId(userId: string, role: string): Promise<Appointment[]> {
    console.log(`[AppointmentRepository] Finding appointments for userId: ${userId}, role: ${role}`);
    if (role === 'PATIENT') {
      const patient = await this.prisma.patientProfile.findUnique({
        where: { userId },
      });
      console.log(`[AppointmentRepository] Found patient profile: ${JSON.stringify(patient)}`);
      if (!patient) return [];
      return this.prisma.appointment.findMany({
        where: { patientId: patient.id },
        include: { professional: { include: { user: true } } },
        orderBy: { dateTime: 'asc' },
      });
    } else {
      const professional = await this.prisma.professionalProfile.findUnique({
        where: { userId },
      });
      console.log(`[AppointmentRepository] Found professional profile: ${JSON.stringify(professional)}`);
      if (!professional) return [];
      return this.prisma.appointment.findMany({
        where: { professionalId: professional.id },
        include: { patient: { include: { user: true } } },
        orderBy: { dateTime: 'asc' },
      });
    }
  }
}
