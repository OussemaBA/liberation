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
exports.SubscriptionService = void 0;
const common_1 = require("@nestjs/common");
const subscription_repository_1 = require("../repositories/subscription.repository");
const prisma_service_1 = require("../../../prisma/prisma.service");
const client_1 = require("@prisma/client");
let SubscriptionService = class SubscriptionService {
    subscriptionRepository;
    prisma;
    constructor(subscriptionRepository, prisma) {
        this.subscriptionRepository = subscriptionRepository;
        this.prisma = prisma;
    }
    async findAllPacks() {
        return this.prisma.pack.findMany();
    }
    async createSubscription(userId, packId) {
        const pack = await this.prisma.pack.findUnique({ where: { id: packId } });
        if (!pack)
            throw new common_1.NotFoundException('Pack not found');
        const startDate = new Date();
        const endDate = new Date();
        endDate.setMonth(startDate.getMonth() + pack.duration);
        return this.subscriptionRepository.create({
            userId,
            packId: pack.id,
            startDate,
            endDate,
            status: client_1.SubscriptionStatus.ACTIVE,
            amount: pack.price,
        });
    }
    async getCurrentSubscription(userId) {
        return this.subscriptionRepository.findActiveByUserId(userId);
    }
};
exports.SubscriptionService = SubscriptionService;
exports.SubscriptionService = SubscriptionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [subscription_repository_1.SubscriptionRepository,
        prisma_service_1.PrismaService])
], SubscriptionService);
//# sourceMappingURL=subscription.service.js.map