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
exports.AppointmentService = void 0;
const common_1 = require("@nestjs/common");
const appointment_repository_1 = require("../repositories/appointment.repository");
const prisma_service_1 = require("../../../prisma/prisma.service");
const client_1 = require("@prisma/client");
let AppointmentService = class AppointmentService {
    appointmentRepository;
    prisma;
    constructor(appointmentRepository, prisma) {
        this.appointmentRepository = appointmentRepository;
        this.prisma = prisma;
    }
    async create(data) {
        const patient = await this.prisma.patientProfile.findUnique({
            where: { userId: data.userId },
        });
        if (!patient) {
            throw new common_1.NotFoundException('Patient profile not found.');
        }
        return this.appointmentRepository.create({
            patientId: patient.id,
            professionalId: data.professionalId,
            dateTime: new Date(data.dateTime),
            duration: data.duration ?? 30,
            type: data.type ?? client_1.AppointmentType.VISIO,
            notes: data.notes,
            status: client_1.AppointmentStatus.PENDING,
        });
    }
    async findAllForUser(userId, role) {
        return this.appointmentRepository.findByUserId(userId, role);
    }
    async findAllProfessionals() {
        return this.prisma.professionalProfile.findMany({
            include: { user: { select: { firstName: true, lastName: true, email: true } } },
        });
    }
};
exports.AppointmentService = AppointmentService;
exports.AppointmentService = AppointmentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [appointment_repository_1.AppointmentRepository,
        prisma_service_1.PrismaService])
], AppointmentService);
//# sourceMappingURL=appointment.service.js.map