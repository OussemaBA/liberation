import { VideoService } from '../services/video.service';
export declare class VideoController {
    private readonly videoService;
    constructor(videoService: VideoService);
    getToken(req: any, body: {
        appointmentId: string;
    }): Promise<{
        token: string;
        serverUrl: string | undefined;
    }>;
}
