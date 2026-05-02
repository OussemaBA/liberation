import { OnboardingService } from '../services/onboarding.service';
export declare class OnboardingController {
    private readonly onboardingService;
    constructor(onboardingService: OnboardingService);
    submit(req: any, body: any): Promise<{
        id: string;
        createdAt: Date;
        patientId: string;
        data: import("@prisma/client/runtime/client").JsonValue;
        testType: string;
        score: number | null;
    }>;
    getHistory(req: any): Promise<{
        id: string;
        createdAt: Date;
        patientId: string;
        data: import("@prisma/client/runtime/client").JsonValue;
        testType: string;
        score: number | null;
    }[]>;
}
