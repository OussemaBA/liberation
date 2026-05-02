"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnboardingService = void 0;
const common_1 = require("@nestjs/common");
const onboarding_repository_1 = require("../repositories/onboarding.repository");
const prisma_service_1 = require("../../../prisma/prisma.service");
let OnboardingService = class OnboardingService {
    onboardingRepository;
    prisma;
    constructor(onboardingRepository, prisma) {
        this.onboardingRepository = onboardingRepository;
        this.prisma = prisma;
    }
    async submitAssessment(userId, data) {
        const patient = await this.prisma.patientProfile.findUnique({
            where: { userId },
        });
        if (!patient) {
            throw new common_1.NotFoundException('Patient profile not found.');
        }
        return this.onboardingRepository.create({
            patientId: patient.id,
            testType: data.type,
            score: data.score,
            data: data.answers,
        });
    }
    async getPatientAssessments(userId) {
        const patient = await this.prisma.patientProfile.findUnique({
            where: { userId },
        });
        if (!patient) {
            throw new common_1.NotFoundException('Patient profile not found.');
        }
        return this.onboardingRepository.findByPatientId(patient.id);
    }
};
exports.OnboardingService = OnboardingService;
exports.OnboardingService = OnboardingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [onboarding_repository_1.OnboardingRepository,
        prisma_service_1.PrismaService])
], OnboardingService);
//# sourceMappingURL=onboarding.service.js.map