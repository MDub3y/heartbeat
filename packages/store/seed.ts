import { PrismaClient } from "./generated/prisma";

const prisma = new PrismaClient();

async function main() {
  const regions = [
    { name: "ap-south-1", code: "in" },
    { name: "us-east-1", code: "US" },
    { name: "eu-west-1", code: "EU" },
    { name: "ap-southeast-1", code: "AS" },
  ];

  for (const r of regions) {
    await prisma.region.upsert({
      where: { name: r.name },
      update: {},
      create: r,
    });
  }
  console.log("Regions seeded!");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());