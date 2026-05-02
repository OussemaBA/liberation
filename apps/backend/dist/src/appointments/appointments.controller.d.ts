import { AppointmentsService } from './appointments.service';
export declare class AppointmentsController {
    private appointmentsService;
    constructor(appointmentsService: AppointmentsService);
    create(req: any, body: any): Promise<{
        id: string;
        duration: number;
        createdAt: Date;
        updatedAt: Date;
        type: import("@prisma/client").$Enums.AppointmentType;
        dateTime: Date;
        status: import("@prisma/client").$Enums.AppointmentStatus;
        notes: string | null;
        patientId: string;
        professionalId: string;
    }>;
    findAll(req: any): Promise<({
        professional: {
            user: {
                id: string;
                email: string;
                password: string;
                firstName: string | null;
                lastName: string | null;
                role: import("@prisma/client").$Enums.Role;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            id: string;
            specialization: string | null;
            userId: string;
            type: import("@prisma/client").$Enums.ProfessionalType;
            bio: string | null;
        };
    } & {
        id: string;
        duration: number;
        createdAt: Date;
        updatedAt: Date;
        type: import("@prisma/client").$Enums.AppointmentType;
        dateTime: Date;
        status: import("@prisma/client").$Enums.AppointmentStatus;
        notes: string | null;
        patientId: string;
        professionalId: string;
    })[] | ({
        patient: {
            user: {
                id: string;
                email: string;
                password: string;
                firstName: string | null;
                lastName: string | null;
                role: import("@prisma/client").$Enums.Role;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            id: string;
            smokingStartDate: Date | null;
            dailyCigarettes: number | null;
            isSmokeFree: boolean;
            quitDate: Date | null;
            smokeFreeDays: number;
            assignedDoctorId: string | null;
            assignedPsychologistId: string | null;
            userId: string;
        };
    } & {
        id: string;
        duration: number;
        createdAt: Date;
        updatedAt: Date;
        type: import("@prisma/client").$Enums.AppointmentType;
        dateTime: Date;
        status: import("@prisma/client").$Enums.AppointmentStatus;
        notes: string | null;
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
        specialization: string | null;
        userId: string;
        type: import("@prisma/client").$Enums.ProfessionalType;
        bio: string | null;
    })[]>;
}
