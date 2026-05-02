import { Module } from '@nestjs/common';
import { PaymentService } from './services/payment.service';
import { PaymentController } from './controllers/payment.controller';
import { PaymentRepository } from './repositories/payment.repository';
import { SimulatorGateway } from './gateways/simulator.gateway';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  providers: [
    PaymentService,
    PaymentRepository,
    PrismaService,
    {
      provide: 'IPaymentGateway',
      useClass: SimulatorGateway,
    },
  ],
  controllers: [PaymentController],
})
export class PaymentsModule {}
