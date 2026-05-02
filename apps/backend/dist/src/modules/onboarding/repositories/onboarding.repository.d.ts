import { PrismaService } from '../../../prisma/prisma.service';
import { BasePrismaRepository } from '../../../common/repositories/base.prisma.repository';
import { TestResult } from '@prisma/client';
export declare class OnboardingRepository extends BasePrismaRepository<TestResult> {
    constructor(prisma: PrismaService);
    findByPatientId(patientId: string): Promise<TestResult[]>;
}
