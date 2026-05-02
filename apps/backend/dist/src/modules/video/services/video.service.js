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
exports.VideoService = void 0;
const common_1 = require("@nestjs/common");
const livekit_server_sdk_1 = require("livekit-server-sdk");
const prisma_service_1 = require("../../../prisma/prisma.service");
let VideoService = class VideoService {
    prisma;
    apiKey;
    apiSecret;
    constructor(prisma) {
        this.prisma = prisma;
        this.apiKey = process.env.LIVEKIT_API_KEY || '';
        this.apiSecret = process.env.LIVEKIT_API_SECRET || '';
    }
    async generateToken(userId, appointmentId) {
        const appointment = await this.prisma.appointment.findUnique({
            where: { id: appointmentId },
            include: {
                patient: { select: { userId: true } },
                professional: { select: { userId: true } },
            },
        });
        if (!appointment) {
            throw new common_1.UnauthorizedException('Appointment not found');
        }
        const isPatient = appointment.patient.userId === userId;
        const isProfessional = appointment.professional.userId === userId;
        if (!isPatient && !isProfessional) {
            throw new common_1.UnauthorizedException('Unauthorized access to this session');
        }
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        const identity = userId;
        if (!this.apiKey || !this.apiSecret) {
            console.error('LIVEKIT_API_KEY or LIVEKIT_API_SECRET is missing');
            throw new Error('Video configuration error');
        }
        const at = new livekit_server_sdk_1.AccessToken(this.apiKey, this.apiSecret, {
            identity: identity,
            name: `${user?.firstName} ${user?.lastName}`,
            ttl: '2h',
        });
        at.addGrant({
            roomJoin: true,
            room: appointmentId,
            canPublish: true,
            canSubscribe: true,
        });
        const token = await at.toJwt();
        console.log(`Token generated for user ${userId} in room ${appointmentId}`);
        console.log(`API Key Length: ${this.apiKey.length}, API Secret Length: ${this.apiSecret.length}`);
        return {
            token,
            serverUrl: process.env.LIVEKIT_URL,
        };
    }
};
exports.VideoService = VideoService;
exports.VideoService = VideoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], VideoService);
//# sourceMappingURL=video.service.js.map