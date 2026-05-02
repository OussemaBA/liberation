import { AppointmentsService } from './appointments.service';
export declare class AppointmentsController {
    private appointmentsService;
    constructor(appointmentsService: AppointmentsService);
    create(req: any, body: any): Promise<{
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
    findAll(req: any): Promise<({
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
