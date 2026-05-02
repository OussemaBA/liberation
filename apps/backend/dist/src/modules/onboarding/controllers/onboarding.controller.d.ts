import { OnboardingService } from '../services/onboarding.service';
export declare class OnboardingController {
    private readonly onboardingService;
    constructor(onboardingService: OnboardingService);
    submit(req: any, body: any): Promise<{
        id: string;
        createdAt: Date;
        data: import("@prisma/client/runtime/client").JsonValue;
        patientId: string;
        testType: string;
        score: number | null;
    }>;
    getHistory(req: any): Promise<{
        id: string;
        createdAt: Date;
        data: import("@prisma/client/runtime/client").JsonValue;
        patientId: string;
        testType: string;
        score: number | null;
    }[]>;
}
