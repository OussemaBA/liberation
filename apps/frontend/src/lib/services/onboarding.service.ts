import { AssessmentSubmission, AssessmentResult } from '@/types';

export class OnboardingService {
  static async submitAssessment(token: string, data: AssessmentSubmission): Promise<AssessmentResult> {
    const response = await fetch('/api/onboarding/assess', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        type: data.assessmentType,
        answers: data.answers,
        // Score calculation would ideally happen on the backend or a dedicated utility
        score: 0, 
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to submit assessment');
    }

    return response.json();
  }

  static async getHistory(token: string): Promise<AssessmentResult[]> {
    const response = await fetch('/api/onboarding/history', {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch assessment history');
    }

    return response.json();
  }
}
