import { PrismaService } from '../../../prisma/prisma.service';
import { BasePrismaRepository } from '../../../common/repositories/base.prisma.repository';
import { User } from '@prisma/client';
export declare class UserRepository extends BasePrismaRepository<User> {
    constructor(prisma: PrismaService);
    findByEmail(email: string): Promise<User | null>;
}
