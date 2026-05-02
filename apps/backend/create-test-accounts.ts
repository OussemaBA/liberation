import { PrismaClient, Role, ProfessionalType, AppointmentStatus, AppointmentType } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables
dotenv.config({ path: path.join(__dirname, '.env') });

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('--- Creating Test Accounts ---');

  const hashedPassword = await bcrypt.hash('password123', 10);

  // 1. Create Doctor Account
  const doctorUser = await prisma.user.upsert({
    where: { email: 'doctor@test.com' },
    update: {},
    create: {
      email: 'doctor@test.com',
      password: hashedPassword,
      firstName: 'Dr. Ahmed',
      lastName: 'Hassen',
      role: Role.PROFESSIONAL,
    },
  });

  const doctorProfile = await prisma.professionalProfile.upsert({
    where: { userId: doctorUser.id },
    update: {},
    create: {
      userId: doctorUser.id,
      type: ProfessionalType.DOCTOR,
      specialization: 'Addictology',
      bio: 'Expert in clinical tobacco cessation.',
    },
  });

  console.log('✅ Created Doctor: doctor@test.com / password123');

  // 2. Create Patient Account
  const patientUser = await prisma.user.upsert({
    where: { email: 'patient@test.com' },
    update: {},
    create: {
      email: 'patient@test.com',
      password: hashedPassword,
      firstName: 'Sami',
      lastName: 'Patient',
      role: Role.PATIENT,
    },
  });

  const patientProfile = await prisma.patientProfile.upsert({
    where: { userId: patientUser.id },
    update: {},
    create: {
      userId: patientUser.id,
      dailyCigarettes: 20,
    },
  });

  console.log('✅ Created Patient: patient@test.com / password123');

  // 3. Create Shared Appointment for Testing
  const appointmentId = 'test-meeting-room-001';
  await prisma.appointment.upsert({
    where: { id: appointmentId },
    update: {
      dateTime: new Date(Date.now() + 3600000), // 1 hour from now
    },
    create: {
      id: appointmentId,
      patientId: patientProfile.id,
      professionalId: doctorProfile.id,
      dateTime: new Date(Date.now() + 3600000),
      duration: 60,
      status: AppointmentStatus.CONFIRMED,
      type: AppointmentType.VISIO,
      notes: 'Initial clinical testing session',
    },
  });

  console.log(`✅ Created Test Appointment ID: ${appointmentId}`);
  console.log('\n--- SETUP COMPLETE ---');
  console.log('Instructions:');
  console.log('1. Login as patient@test.com on one browser.');
  console.log('2. Login as doctor@test.com on another browser (or incognito).');
  console.log('3. Both can now join the meeting with ID: ' + appointmentId);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
