import { z } from 'zod';

export const UserRoleSchema = z.enum(['ADMIN', 'PROFESSIONAL', 'PATIENT', 'AMBASSADOR']);
export type UserRole = z.infer<typeof UserRoleSchema>;

export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
  role: UserRoleSchema,
});

export type User = z.infer<typeof UserSchema>;

export const LoginDtoSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type LoginDto = z.infer<typeof LoginDtoSchema>;

export const RegisterDtoSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  role: UserRoleSchema,
});

export type RegisterDto = z.infer<typeof RegisterDtoSchema>;

export interface Appointment {
  id: string;
  patientId: string;
  professionalId: string;
  dateTime: string;
  duration: number;
  status: string;
  type: string;
  professional?: {
    user: User;
  };
}

export interface Pack {
  id: string;
  name: string;
  duration: number;
  price: number;
  description?: string;
}

export interface Subscription {
  id: string;
  userId: string;
  packId: string;
  startDate: string;
  endDate: string;
  status: string;
  amount: number;
  pack?: Pack;
}
