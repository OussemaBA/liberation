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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const common_1 = require("@nestjs/common");
const payment_repository_1 = require("../repositories/payment.repository");
const client_1 = require("@prisma/client");
let PaymentService = class PaymentService {
    gateway;
    paymentRepository;
    constructor(gateway, paymentRepository) {
        this.gateway = gateway;
        this.paymentRepository = paymentRepository;
    }
    async initiateCheckout(userId, data) {
        const session = await this.gateway.createCheckoutSession({
            amount: data.amount,
            currency: 'TND',
            description: `Subscription Pack ${data.packId}`,
            successUrl: data.successUrl,
            cancelUrl: data.cancelUrl,
            metadata: { userId, packId: data.packId },
        });
        await this.paymentRepository.create({
            userId,
            amount: data.amount,
            currency: 'TND',
            status: client_1.TransactionStatus.PENDING,
            provider: 'SIMULATOR',
            providerReference: session.id,
        });
        return session;
    }
    async verifyTransaction(reference) {
        const isValid = await this.gateway.verifyPayment(reference);
        if (isValid) {
            const transaction = await this.paymentRepository.findByReference(reference);
            if (transaction) {
                await this.paymentRepository.update(transaction.id, {
                    status: client_1.TransactionStatus.COMPLETED,
                });
                return transaction;
            }
        }
        return null;
    }
};
exports.PaymentService = PaymentService;
exports.PaymentService = PaymentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('IPaymentGateway')),
    __metadata("design:paramtypes", [Object, payment_repository_1.PaymentRepository])
], PaymentService);
//# sourceMappingURL=payment.service.js.map