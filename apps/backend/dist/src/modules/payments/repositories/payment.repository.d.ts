import { PrismaService } from '../../../prisma/prisma.service';
import { BasePrismaRepository } from '../../../common/repositories/base.prisma.repository';
import { Transaction } from '@prisma/client';
export declare class PaymentRepository extends BasePrismaRepository<Transaction> {
    constructor(prisma: PrismaService);
    findByReference(providerReference: string): Promise<Transaction | null>;
    findByUserId(userId: string): Promise<Transaction[]>;
}
