import { OnboardingRepository } from '../repositories/onboarding.repository';
import { PrismaService } from '../../../prisma/prisma.service';
export declare class OnboardingService {
    private readonly onboardingRepository;
    private readonly prisma;
    constructor(onboardingRepository: OnboardingRepository, prisma: PrismaService);
    submitAssessment(userId: string, data: {
        type: string;
        score: number;
        answers: any;
    }): Promise<{
        id: string;
        patientId: string;
        testType: string;
        score: number | null;
        data: import("@prisma/client/runtime/client").JsonValue;
        createdAt: Date;
    }>;
    getPatientAssessments(userId: string): Promise<{
        id: string;
        patientId: string;
        testType: string;
        score: number | null;
        data: import("@prisma/client/runtime/client").JsonValue;
        createdAt: Date;
    }[]>;
}
