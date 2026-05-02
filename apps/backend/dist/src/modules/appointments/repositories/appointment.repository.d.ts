import { PrismaService } from '../../../prisma/prisma.service';
import { BasePrismaRepository } from '../../../common/repositories/base.prisma.repository';
import { Appointment } from '@prisma/client';
export declare class AppointmentRepository extends BasePrismaRepository<Appointment> {
    constructor(prisma: PrismaService);
    findByUserId(userId: string, role: string): Promise<Appointment[]>;
}
