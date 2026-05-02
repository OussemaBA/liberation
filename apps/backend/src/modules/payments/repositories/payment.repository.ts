import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { BasePrismaRepository } from '../../../common/repositories/base.prisma.repository';
import { Transaction } from '@prisma/client';

@Injectable()
export class PaymentRepository extends BasePrismaRepository<Transaction> {
  constructor(prisma: PrismaService) {
    super(prisma, 'transaction');
  }

  async findByReference(providerReference: string): Promise<Transaction | null> {
    return this.prisma.transaction.findUnique({ where: { providerReference } });
  }

  async findByUserId(userId: string): Promise<Transaction[]> {
    return this.prisma.transaction.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }
}
