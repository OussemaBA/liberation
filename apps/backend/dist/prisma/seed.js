"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const adapter_pg_1 = require("@prisma/adapter-pg");
const pg_1 = __importDefault(require("pg"));
require("dotenv/config");
const connectionString = process.env.DATABASE_URL;
const pool = new pg_1.default.Pool({ connectionString });
const adapter = new adapter_pg_1.PrismaPg(pool);
const prisma = new client_1.PrismaClient({ adapter });
async function main() {
    const packs = [
        {
            name: 'Pack 1 Mois',
            duration: 1,
            price: 49.0,
            description: 'Accompagnement intensif pour le premier mois crucial.',
        },
        {
            name: 'Pack 3 Mois',
            duration: 3,
            price: 119.0,
            description: 'Le choix le plus populaire pour un sevrage durable.',
        },
        {
            name: 'Pack 6 Mois',
            duration: 6,
            price: 199.0,
            description: 'Accompagnement complet pour une liberté totale.',
        },
    ];
    for (const pack of packs) {
        const id = pack.name.replace(/\s+/g, '-').toLowerCase();
        await prisma.pack.upsert({
            where: { id: id },
            update: {
                name: pack.name,
                duration: pack.duration,
                price: pack.price,
                description: pack.description,
            },
            create: {
                id: id,
                name: pack.name,
                duration: pack.duration,
                price: pack.price,
                description: pack.description,
            },
        });
    }
    console.log('Seed: Created packs');
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
//# sourceMappingURL=seed.js.map