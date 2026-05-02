import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { VideoService } from '../services/video.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Controller('video')
@UseGuards(JwtAuthGuard)
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post('token')
  async getToken(@Request() req: any, @Body() body: { appointmentId: string }) {
    return this.videoService.generateToken(req.user.userId, body.appointmentId);
  }
}
