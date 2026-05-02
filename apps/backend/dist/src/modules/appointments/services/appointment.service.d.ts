import { AppointmentRepository } from '../repositories/appointment.repository';
import { PrismaService } from '../../../prisma/prisma.service';
import { AppointmentType } from '@prisma/client';
export declare class AppointmentService {
    private readonly appointmentRepository;
    private readonly prisma;
    constructor(appointmentRepository: AppointmentRepository, prisma: PrismaService);
    create(data: {
        userId: string;
        professionalId: string;
        dateTime: string;
        duration?: number;
        type?: AppointmentType;
        notes?: string;
    }): Promise<{
        id: string;
        duration: number;
        createdAt: Date;
        updatedAt: Date;
        type: import("@prisma/client").$Enums.AppointmentType;
        patientId: string;
        professionalId: string;
        dateTime: Date;
        status: import("@prisma/client").$Enums.AppointmentStatus;
        notes: string | null;
    }>;
    findAllForUser(userId: string, role: string): Promise<{
        id: string;
        duration: number;
        createdAt: Date;
        updatedAt: Date;
        type: import("@prisma/client").$Enums.AppointmentType;
        patientId: string;
        professionalId: string;
        dateTime: Date;
        status: import("@prisma/client").$Enums.AppointmentStatus;
        notes: string | null;
    }[]>;
    findAllProfessionals(): Promise<({
        user: {
            email: string;
            firstName: string | null;
            lastName: string | null;
        };
    } & {
        id: string;
        specialization: string | null;
        userId: string;
        type: import("@prisma/client").$Enums.ProfessionalType;
        bio: string | null;
    })[]>;
}
