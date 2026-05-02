export class VideoService {
  static async getToken(token: string, appointmentId: string): Promise<{ token: string; serverUrl: string }> {
    const response = await fetch('/api/video/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ appointmentId }),
    });

    if (!response.ok) {
      throw new Error('Failed to retrieve video access token');
    }

    return response.json();
  }
}
