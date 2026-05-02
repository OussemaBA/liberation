import { PrismaService } from '../prisma/prisma.service';
export declare class SubscriptionsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAllPacks(): Promise<{
        id: string;
        name: string;
        duration: number;
        price: number;
        description: string | null;
    }[]>;
    createSubscription(userId: string, packId: string): Promise<{
        id: string;
        startDate: Date;
        endDate: Date;
        status: import("@prisma/client").$Enums.SubscriptionStatus;
        amount: number;
        userId: string;
        packId: string;
    }>;
    getCurrentSubscription(userId: string): Promise<{
        id: string;
        startDate: Date;
        endDate: Date;
        status: import("@prisma/client").$Enums.SubscriptionStatus;
        amount: number;
        userId: string;
        packId: string;
    } | null>;
}
