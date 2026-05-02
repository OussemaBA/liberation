import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { BasePrismaRepository } from '../../../common/repositories/base.prisma.repository';
import { TestResult } from '@prisma/client';

@Injectable()
export class OnboardingRepository extends BasePrismaRepository<TestResult> {
  constructor(prisma: PrismaService) {
    super(prisma, 'testResult');
  }

  async findByPatientId(patientId: string): Promise<TestResult[]> {
    return this.prisma.testResult.findMany({
      where: { patientId },
      orderBy: { createdAt: 'desc' },
    });
  }
}
