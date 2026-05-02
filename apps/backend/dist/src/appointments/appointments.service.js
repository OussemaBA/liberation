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
exports.AppointmentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let AppointmentsService = class AppointmentsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        return this.prisma.appointment.create({
            data: {
                patientId: data.patientId,
                professionalId: data.professionalId,
                dateTime: new Date(data.dateTime),
                duration: data.duration ?? 30,
                type: data.type ?? client_1.AppointmentType.VISIO,
                notes: data.notes,
                status: client_1.AppointmentStatus.PENDING,
            },
        });
    }
    async findAllForUser(userId, role) {
        if (role === 'PATIENT') {
            const patient = await this.prisma.patientProfile.findUnique({
                where: { userId },
            });
            if (!patient)
                throw new common_1.NotFoundException('Patient profile not found');
            return this.prisma.appointment.findMany({
                where: { patientId: patient.id },
                include: { professional: { include: { user: true } } },
                orderBy: { dateTime: 'asc' },
            });
        }
        else if (role === 'PROFESSIONAL') {
            const professional = await this.prisma.professionalProfile.findUnique({
                where: { userId },
            });
            if (!professional)
                throw new common_1.NotFoundException('Professional profile not found');
            return this.prisma.appointment.findMany({
                where: { professionalId: professional.id },
                include: { patient: { include: { user: true } } },
                orderBy: { dateTime: 'asc' },
            });
        }
        return [];
    }
    async findAllProfessionals() {
        return this.prisma.professionalProfile.findMany({
            include: { user: { select: { firstName: true, lastName: true, email: true } } },
        });
    }
};
exports.AppointmentsService = AppointmentsService;
exports.AppointmentsService = AppointmentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AppointmentsService);
//# sourceMappingURL=appointments.service.js.map