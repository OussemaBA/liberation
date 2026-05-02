import { AppointmentService } from '../services/appointment.service';
export declare class AppointmentController {
    private readonly appointmentService;
    constructor(appointmentService: AppointmentService);
    create(req: any, body: any): Promise<{
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
    findAll(req: any): Promise<{
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
        userId: string;
        type: import("@prisma/client").$Enums.ProfessionalType;
        specialization: string | null;
        bio: string | null;
    })[]>;
}
