import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seed() {
  const user = await prisma.user.create({
    data: {
      name: 'Takahashi',
      email: 'sample@email.com',
    },
  })
  console.log(`User created: ${user.name} (ID: ${user.id})`)
}

seed()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
