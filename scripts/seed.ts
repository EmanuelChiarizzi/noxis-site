import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hashed = await bcrypt.hash('johndoe123', 10);
  await prisma.user.upsert({
    where: { email: 'john@doe.com' },
    update: {},
    create: { email: 'john@doe.com', name: 'John Doe', password: hashed },
  });

  const products = [
    { slug: 'subzero', name: 'SUBZERO', price: 89.9, originalPrice: 129.9, description: 'Edição limitada Subzero. Streetwear oversize com estampa premium nas costas.', backImage: '/Subzero.jpeg', frontImage: '/Frente.jpeg', badge: 'EDIÇÃO LIMITADA' },
    { slug: 'tokyo', name: 'TOKYO', price: 89.9, originalPrice: 129.9, description: 'Inspirada em Tokyo Ghoul. Carregue Kaneki nas costas.', backImage: '/Tokyo.jpeg', frontImage: '/Frente.jpeg', badge: 'EDIÇÃO LIMITADA' },
    { slug: 'scorpion', name: 'SCORPION', price: 89.9, originalPrice: 129.9, description: 'Get over here. Estampa Scorpion Mortal Kombat.', backImage: '/Scorpion.jpeg', frontImage: '/Frente.jpeg', badge: 'EDIÇÃO LIMITADA' },
    { slug: 'noob', name: 'NOOB', price: 89.9, originalPrice: 129.9, description: 'Noob Saibot. A sombra que poucos compreendem.', backImage: '/Noob.jpeg', frontImage: '/Frente.jpeg', badge: 'EDIÇÃO LIMITADA' },
    { slug: 'eclipse', name: 'ECLIPSE', price: 89.9, originalPrice: 129.9, description: 'O eclipse silencioso. Conceito exclusivo Noxis.', backImage: '/Frente.jpeg', frontImage: '/Frente.jpeg', badge: 'EM BREVE' },
    { slug: 'void-walker', name: 'VOID WALKER', price: 89.9, originalPrice: 129.9, description: 'Caminhe pelo vazio. Apenas para quem entende.', backImage: '/Frente.jpeg', frontImage: '/Frente.jpeg', badge: 'EM BREVE' },
  ];

  for (const p of products) {
    await prisma.product.upsert({ where: { slug: p.slug }, update: p, create: p });
  }
  console.log('Seed completo');
}

main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
