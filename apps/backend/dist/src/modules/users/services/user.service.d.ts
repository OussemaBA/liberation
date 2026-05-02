import { UserRepository } from '../repositories/user.repository';
import { User } from '@prisma/client';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
    create(data: any): Promise<User>;
}
