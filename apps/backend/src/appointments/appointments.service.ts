import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AppointmentStatus, AppointmentType } from '@prisma/client';

@Injectable()
export class AppointmentsService {
  constructor(private prisma: PrismaService) {}

  async create(data: {
    userId: string;
    professionalId: string;
    dateTime: string;
    duration?: number;
    type?: AppointmentType;
    notes?: string;
  }) {
    const patient = await this.prisma.patientProfile.findUnique({
      where: { userId: data.userId },
    });

    if (!patient) {
      throw new NotFoundException('Patient profile not found. Please complete your registration.');
    }

    return this.prisma.appointment.create({
      data: {
        patientId: patient.id,
        professionalId: data.professionalId,
        dateTime: new Date(data.dateTime),
        duration: data.duration ?? 30,
        type: data.type ?? AppointmentType.VISIO,
        notes: data.notes,
        status: AppointmentStatus.PENDING,
      },
    });
  }

  async findAllForUser(userId: string, role: string) {
    if (role === 'PATIENT') {
      const patient = await this.prisma.patientProfile.findUnique({
        where: { userId },
      });
      if (!patient) throw new NotFoundException('Patient profile not found');
      return this.prisma.appointment.findMany({
        where: { patientId: patient.id },
        include: { professional: { include: { user: true } } },
        orderBy: { dateTime: 'asc' },
      });
    } else if (role === 'PROFESSIONAL') {
      const professional = await this.prisma.professionalProfile.findUnique({
        where: { userId },
      });
      if (!professional) throw new NotFoundException('Professional profile not found');
      return this.prisma.appointment.findMany({
        where: { professionalId: professional.id },
        include: { patient: { include: { user: true } } },
        orderBy: { dateTime: 'asc' },
      });
    }
    return [];
  }

  async findAllProfessionals() {
    return this.prisma.professionalProfile.findMany({
      include: { user: { select: { firstName: true, lastName: true, email: true } } },
    });
  }
}
