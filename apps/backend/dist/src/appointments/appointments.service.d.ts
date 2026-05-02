import { PrismaService } from '../prisma/prisma.service';
import { AppointmentType } from '@prisma/client';
export declare class AppointmentsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: {
        userId: string;
        professionalId: string;
        dateTime: string;
        duration?: number;
        type?: AppointmentType;
        notes?: string;
    }): Promise<{
        id: string;
        dateTime: Date;
        duration: number;
        status: import("@prisma/client").$Enums.AppointmentStatus;
        type: import("@prisma/client").$Enums.AppointmentType;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
        patientId: string;
        professionalId: string;
    }>;
    findAllForUser(userId: string, role: string): Promise<({
        professional: {
            user: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                email: string;
                password: string;
                role: import("@prisma/client").$Enums.Role;
                firstName: string | null;
                lastName: string | null;
            };
        } & {
            id: string;
            type: import("@prisma/client").$Enums.ProfessionalType;
            userId: string;
            specialization: string | null;
            bio: string | null;
        };
    } & {
        id: string;
        dateTime: Date;
        duration: number;
        status: import("@prisma/client").$Enums.AppointmentStatus;
        type: import("@prisma/client").$Enums.AppointmentType;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
        patientId: string;
        professionalId: string;
    })[] | ({
        patient: {
            user: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                email: string;
                password: string;
                role: import("@prisma/client").$Enums.Role;
                firstName: string | null;
                lastName: string | null;
            };
        } & {
            id: string;
            userId: string;
            smokingStartDate: Date | null;
            dailyCigarettes: number | null;
            isSmokeFree: boolean;
            quitDate: Date | null;
            smokeFreeDays: number;
            assignedDoctorId: string | null;
            assignedPsychologistId: string | null;
        };
    } & {
        id: string;
        dateTime: Date;
        duration: number;
        status: import("@prisma/client").$Enums.AppointmentStatus;
        type: import("@prisma/client").$Enums.AppointmentType;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
        patientId: string;
        professionalId: string;
    })[]>;
    findAllProfessionals(): Promise<({
        user: {
            email: string;
            firstName: string | null;
            lastName: string | null;
        };
    } & {
        id: string;
        type: import("@prisma/client").$Enums.ProfessionalType;
        userId: string;
        specialization: string | null;
        bio: string | null;
    })[]>;
}
