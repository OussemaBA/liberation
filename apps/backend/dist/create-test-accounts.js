"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const adapter_pg_1 = require("@prisma/adapter-pg");
const pg_1 = require("pg");
const bcrypt = __importStar(require("bcrypt"));
const dotenv = __importStar(require("dotenv"));
const path = __importStar(require("path"));
dotenv.config({ path: path.join(__dirname, '.env') });
const pool = new pg_1.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new adapter_pg_1.PrismaPg(pool);
const prisma = new client_1.PrismaClient({ adapter });
async function main() {
    console.log('--- Creating Test Accounts ---');
    const hashedPassword = await bcrypt.hash('password123', 10);
    const doctorUser = await prisma.user.upsert({
        where: { email: 'doctor@test.com' },
        update: {},
        create: {
            email: 'doctor@test.com',
            password: hashedPassword,
            firstName: 'Dr. Ahmed',
            lastName: 'Hassen',
            role: client_1.Role.PROFESSIONAL,
        },
    });
    const doctorProfile = await prisma.professionalProfile.upsert({
        where: { userId: doctorUser.id },
        update: {},
        create: {
            userId: doctorUser.id,
            type: client_1.ProfessionalType.DOCTOR,
            specialization: 'Addictology',
            bio: 'Expert in clinical tobacco cessation.',
        },
    });
    console.log('✅ Created Doctor: doctor@test.com / password123');
    const patientUser = await prisma.user.upsert({
        where: { email: 'patient@test.com' },
        update: {},
        create: {
            email: 'patient@test.com',
            password: hashedPassword,
            firstName: 'Sami',
            lastName: 'Patient',
            role: client_1.Role.PATIENT,
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
    const appointmentId = 'test-meeting-room-001';
    await prisma.appointment.upsert({
        where: { id: appointmentId },
        update: {
            dateTime: new Date(Date.now() + 3600000),
        },
        create: {
            id: appointmentId,
            patientId: patientProfile.id,
            professionalId: doctorProfile.id,
            dateTime: new Date(Date.now() + 3600000),
            duration: 60,
            status: client_1.AppointmentStatus.CONFIRMED,
            type: client_1.AppointmentType.VISIO,
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
//# sourceMappingURL=create-test-accounts.js.map