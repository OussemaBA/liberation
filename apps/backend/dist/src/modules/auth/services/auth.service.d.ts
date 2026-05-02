import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../users/services/user.service';
import { PrismaService } from '../../../prisma/prisma.service';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    private readonly prisma;
    constructor(userService: UserService, jwtService: JwtService, prisma: PrismaService);
    register(registerDto: any): Promise<{
        access_token: string;
        user: {
            id: string;
            email: string;
            role: import("@prisma/client").$Enums.Role;
            firstName: string | null;
            lastName: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    login(user: any): Promise<{
        access_token: string;
        user: any;
    }>;
    validateUser(email: string, pass: string): Promise<any>;
}
