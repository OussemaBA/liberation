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
exports.AppointmentRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
const base_prisma_repository_1 = require("../../../common/repositories/base.prisma.repository");
let AppointmentRepository = class AppointmentRepository extends base_prisma_repository_1.BasePrismaRepository {
    constructor(prisma) {
        super(prisma, 'appointment');
    }
    async findByUserId(userId, role) {
        if (role === 'PATIENT') {
            const patient = await this.prisma.patientProfile.findUnique({
                where: { userId },
            });
            if (!patient)
                return [];
            return this.prisma.appointment.findMany({
                where: { patientId: patient.id },
                include: { professional: { include: { user: true } } },
                orderBy: { dateTime: 'asc' },
            });
        }
        else {
            const professional = await this.prisma.professionalProfile.findUnique({
                where: { userId },
            });
            if (!professional)
                return [];
            return this.prisma.appointment.findMany({
                where: { professionalId: professional.id },
                include: { patient: { include: { user: true } } },
                orderBy: { dateTime: 'asc' },
            });
        }
    }
};
exports.AppointmentRepository = AppointmentRepository;
exports.AppointmentRepository = AppointmentRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AppointmentRepository);
//# sourceMappingURL=appointment.repository.js.map