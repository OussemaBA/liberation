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
        userId: string;
        status: import("@prisma/client").$Enums.SubscriptionStatus;
        startDate: Date;
        endDate: Date;
        amount: number;
        packId: string;
    }>;
    getCurrentSubscription(userId: string): Promise<({
        pack: {
            id: string;
            name: string;
            duration: number;
            price: number;
            description: string | null;
        };
    } & {
        id: string;
        userId: string;
        status: import("@prisma/client").$Enums.SubscriptionStatus;
        startDate: Date;
        endDate: Date;
        amount: number;
        packId: string;
    }) | null>;
}
