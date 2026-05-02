import { Injectable, Inject } from '@nestjs/common';
import type { IPaymentGateway } from '../interfaces/payment-gateway.interface';
import { PaymentRepository } from '../repositories/payment.repository';
import { TransactionStatus } from '@prisma/client';

@Injectable()
export class PaymentService {
  constructor(
    @Inject('IPaymentGateway') private readonly gateway: IPaymentGateway,
    private readonly paymentRepository: PaymentRepository,
  ) {}

  async initiateCheckout(userId: string, data: { packId: string; amount: number; successUrl: string; cancelUrl: string }) {
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
      status: TransactionStatus.PENDING,
      provider: 'SIMULATOR',
      providerReference: session.id,
    });

    return session;
  }

  async verifyTransaction(reference: string) {
    const isValid = await this.gateway.verifyPayment(reference);
    if (isValid) {
      const transaction = await this.paymentRepository.findByReference(reference);
      if (transaction) {
        await this.paymentRepository.update(transaction.id, {
          status: TransactionStatus.COMPLETED,
        });
        return transaction;
      }
    }
    return null;
  }
}
