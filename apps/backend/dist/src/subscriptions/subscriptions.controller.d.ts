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
        userId: string;
        status: import("@prisma/client").$Enums.SubscriptionStatus;
        startDate: Date;
        endDate: Date;
        amount: number;
        packId: string;
    }>;
    getCurrent(req: any): Promise<({
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
