import { z } from 'zod';

/**
 * IDENTITY & ACCESS DOMAIN
 */

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

/**
 * CLINICAL ONBOARDING DOMAIN
 */

export const AssessmentTypeSchema = z.enum(['FAGERSTROM', 'MOTIVATION', 'PROFILE', 'INTAKE']);
export type AssessmentType = z.infer<typeof AssessmentTypeSchema>;

export const AssessmentQuestionSchema = z.object({
  id: z.string(),
  text: z.string(),
  options: z.array(z.object({
    label: z.string(),
    value: z.any(),
    score: z.number().optional(),
  })),
});

export type AssessmentQuestion = z.infer<typeof AssessmentQuestionSchema>;

export const AssessmentSubmissionSchema = z.object({
  assessmentType: AssessmentTypeSchema,
  answers: z.record(z.string(), z.any()), // key: questionId, value: selectedValue
});

export type AssessmentSubmission = z.infer<typeof AssessmentSubmissionSchema>;

export interface AssessmentResult {
  id: string;
  patientId: string;
  type: AssessmentType;
  score: number;
  data: any;
  createdAt: string;
}

/**
 * CLINICAL SESSIONS DOMAIN
 */

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
  patient?: {
    user: User;
  };
}

/**
 * MONETIZATION & BILLING DOMAIN
 */

export const PaymentStatusSchema = z.enum(['PENDING', 'COMPLETED', 'FAILED', 'REFUNDED']);
export type PaymentStatus = z.infer<typeof PaymentStatusSchema>;

export interface Pack {
  id: string;
  name: string;
  duration: number; // in months
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

export interface Transaction {
  id: string;
  userId: string;
  subscriptionId?: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  provider: string; // 'STRIPE', 'FLOUCI', 'SIMULATOR'
  providerReference?: string;
  createdAt: string;
}

export interface CheckoutSession {
  id: string;
  url: string;
}
