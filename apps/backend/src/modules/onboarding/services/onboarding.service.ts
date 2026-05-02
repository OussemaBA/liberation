import { Injectable, NotFoundException } from '@nestjs/common';
import { OnboardingRepository } from '../repositories/onboarding.repository';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class OnboardingService {
  constructor(
    private readonly onboardingRepository: OnboardingRepository,
    private readonly prisma: PrismaService,
  ) {}

  async submitAssessment(userId: string, data: { type: string; score: number; answers: any }) {
    const patient = await this.prisma.patientProfile.findUnique({
      where: { userId },
    });

    if (!patient) {
      throw new NotFoundException('Patient profile not found.');
    }

    return this.onboardingRepository.create({
      patientId: patient.id,
      testType: data.type,
      score: data.score,
      data: data.answers,
    });
  }

  async getPatientAssessments(userId: string) {
    const patient = await this.prisma.patientProfile.findUnique({
      where: { userId },
    });

    if (!patient) {
      throw new NotFoundException('Patient profile not found.');
    }

    return this.onboardingRepository.findByPatientId(patient.id);
  }
}
