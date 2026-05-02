import { OnboardingService } from '../services/onboarding.service';
export declare class OnboardingController {
    private readonly onboardingService;
    constructor(onboardingService: OnboardingService);
    submit(req: any, body: any): Promise<{
        id: string;
        patientId: string;
        testType: string;
        score: number | null;
        data: import("@prisma/client/runtime/client").JsonValue;
        createdAt: Date;
    }>;
    getHistory(req: any): Promise<{
        id: string;
        patientId: string;
        testType: string;
        score: number | null;
        data: import("@prisma/client/runtime/client").JsonValue;
        createdAt: Date;
    }[]>;
}
