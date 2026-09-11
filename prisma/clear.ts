import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Clearing demo data...");

  await prisma.transaction.deleteMany();
  await prisma.attendee.deleteMany();
  await prisma.customQuestion.deleteMany();
  await prisma.ticketType.deleteMany();
  await prisma.event.deleteMany();
  await prisma.user.deleteMany({ where: { role: "ORGANISER" } });

  console.log("Done. Admin account kept — everything else removed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });