import { VideoService } from '../services/video.service';
export declare class VideoController {
    private readonly videoService;
    constructor(videoService: VideoService);
    getToken(req: any, body: {
        appointmentId: string;
    }): Promise<{
        token: Promise<string>;
        serverUrl: string | undefined;
    }>;
}
