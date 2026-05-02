import { SubscriptionRepository } from '../repositories/subscription.repository';
import { PrismaService } from '../../../prisma/prisma.service';
export declare class SubscriptionService {
    private readonly subscriptionRepository;
    private readonly prisma;
    constructor(subscriptionRepository: SubscriptionRepository, prisma: PrismaService);
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
        packId: string;
        startDate: Date;
        endDate: Date;
        amount: number;
    }>;
    getCurrentSubscription(userId: string): Promise<{
        id: string;
        userId: string;
        status: import("@prisma/client").$Enums.SubscriptionStatus;
        packId: string;
        startDate: Date;
        endDate: Date;
        amount: number;
    } | null>;
}
