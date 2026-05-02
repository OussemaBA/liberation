import { SubscriptionsService } from './subscriptions.service';
export declare class SubscriptionsController {
    private subscriptionsService;
    constructor(subscriptionsService: SubscriptionsService);
    findAllPacks(): Promise<{
        id: string;
        name: string;
        duration: number;
        price: number;
        description: string | null;
    }[]>;
    subscribe(req: any, packId: string): Promise<{
        id: string;
        startDate: Date;
        endDate: Date;
        status: import("@prisma/client").$Enums.SubscriptionStatus;
        amount: number;
        userId: string;
        packId: string;
    }>;
    getCurrent(req: any): Promise<{
        id: string;
        startDate: Date;
        endDate: Date;
        status: import("@prisma/client").$Enums.SubscriptionStatus;
        amount: number;
        userId: string;
        packId: string;
    } | null>;
}
