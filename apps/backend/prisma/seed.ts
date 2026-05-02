import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import 'dotenv/config';

const connectionString = process.env.DATABASE_URL;
const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

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
