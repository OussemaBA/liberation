import { PrismaService } from '../../../prisma/prisma.service';
export declare class VideoService {
    private readonly prisma;
    private readonly apiKey;
    private readonly apiSecret;
    constructor(prisma: PrismaService);
    generateToken(userId: string, appointmentId: string): Promise<{
        token: Promise<string>;
        serverUrl: string | undefined;
    }>;
}
