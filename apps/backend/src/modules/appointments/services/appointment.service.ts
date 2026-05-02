import { Injectable, NotFoundException } from '@nestjs/common';
import { AppointmentRepository } from '../repositories/appointment.repository';
import { PrismaService } from '../../../prisma/prisma.service';
import { AppointmentStatus, AppointmentType } from '@prisma/client';

@Injectable()
export class AppointmentService {
  constructor(
    private readonly appointmentRepository: AppointmentRepository,
    private readonly prisma: PrismaService,
  ) {}

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
      throw new NotFoundException('Patient profile not found.');
    }

    return this.appointmentRepository.create({
      patientId: patient.id,
      professionalId: data.professionalId,
      dateTime: new Date(data.dateTime),
      duration: data.duration ?? 30,
      type: data.type ?? AppointmentType.VISIO,
      notes: data.notes,
      status: AppointmentStatus.PENDING,
    });
  }

  async findAllForUser(userId: string, role: string) {
    return this.appointmentRepository.findByUserId(userId, role);
  }

  async findAllProfessionals() {
    return this.prisma.professionalProfile.findMany({
      include: { user: { select: { firstName: true, lastName: true, email: true } } },
    });
  }
}
