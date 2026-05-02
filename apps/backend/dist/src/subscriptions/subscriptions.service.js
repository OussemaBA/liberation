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
exports.SubscriptionsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let SubscriptionsService = class SubscriptionsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAllPacks() {
        return this.prisma.pack.findMany({
            orderBy: { duration: 'asc' },
        });
    }
    async createSubscription(userId, packId) {
        const pack = await this.prisma.pack.findUnique({ where: { id: packId } });
        if (!pack)
            throw new common_1.NotFoundException('Pack not found');
        const endDate = new Date();
        endDate.setMonth(endDate.getMonth() + pack.duration);
        return this.prisma.subscription.create({
            data: {
                userId: userId,
                packId: pack.id,
                status: client_1.SubscriptionStatus.ACTIVE,
                startDate: new Date(),
                endDate: endDate,
                amount: pack.price,
            },
        });
    }
    async getCurrentSubscription(userId) {
        return this.prisma.subscription.findFirst({
            where: {
                userId: userId,
                status: client_1.SubscriptionStatus.ACTIVE,
            },
            include: { pack: true },
            orderBy: { startDate: 'desc' },
        });
    }
};
exports.SubscriptionsService = SubscriptionsService;
exports.SubscriptionsService = SubscriptionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SubscriptionsService);
//# sourceMappingURL=subscriptions.service.js.map