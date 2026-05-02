import { Appointment } from '@/types';

export class AppointmentService {
  static async findAll(token: string): Promise<Appointment[]> {
    const response = await fetch('/api/appointments', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!response.ok) throw new Error('Failed to fetch appointments');
    return response.json();
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
    return response.json();
  }
}
