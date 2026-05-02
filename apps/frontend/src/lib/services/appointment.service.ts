import { Appointment } from '@/types';

export class AppointmentService {
  static async findAll(token: string): Promise<Appointment[]> {
    console.log('[AppointmentService] Fetching all appointments...');
    const response = await fetch('/api/appointments', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[AppointmentService] Fetch failed with status ${response.status}:`, errorText);
      throw new Error(`Failed to fetch appointments: ${response.status}`);
    }
    
    const text = await response.text();
    if (!text) return [];
    return JSON.parse(text);
  }

  static async create(token: string, data: { professionalId: string; dateTime: string }): Promise<Appointment> {
    const response = await fetch('/api/appointments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to schedule session');
    return response.json();
  }

  static async findProfessionals(token: string): Promise<any[]> {
    const response = await fetch('/api/appointments/professionals', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!response.ok) throw new Error('Failed to fetch professionals');
    
    const text = await response.text();
    if (!text) return [];
    return JSON.parse(text);
  }
}
