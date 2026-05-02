import { Module } from '@nestjs/common';
import { VideoService } from './services/video.service';
import { VideoController } from './controllers/video.controller';

@Module({
  providers: [VideoService],
  controllers: [VideoController],
})
export class VideoModule {}
