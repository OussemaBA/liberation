import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../../users/services/user.service';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async register(registerDto: any) {
    const { email, password, firstName, lastName, role, professionalType, specialization } = registerDto;
    
    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        role,
      },
    });

    if (role === 'PATIENT') {
      await this.prisma.patientProfile.create({
        data: { userId: user.id },
      });
    } else if (role === 'PROFESSIONAL') {
      await this.prisma.professionalProfile.create({
        data: { 
          userId: user.id,
          type: professionalType,
          specialization,
        },
      });
    }

    const { password: _, ...result } = user;
    return {
      access_token: this.jwtService.sign({ sub: user.id, email: user.email, role: user.role }),
      user: result,
    };
  }

  async login(user: any) {
    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
