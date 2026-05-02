import { PrismaService } from '../../../prisma/prisma.service';
import { BasePrismaRepository } from '../../../common/repositories/base.prisma.repository';
import { Subscription } from '@prisma/client';
export declare class SubscriptionRepository extends BasePrismaRepository<Subscription> {
    constructor(prisma: PrismaService);
    findActiveByUserId(userId: string): Promise<Subscription | null>;
}
