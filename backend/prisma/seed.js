const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // get first user
  const user = await prisma.user.findFirst();

  if (!user) {
    console.log("❌ No user found. Create a user first.");
    return;
  }

  // Create Buses
  const bus1 = await prisma.bus.create({
    data: {
      number: "BUS-101",
      capacity: 50,
      userId: user.id,
    },
  });

  const bus2 = await prisma.bus.create({
    data: {
      number: "BUS-202",
      capacity: 45,
      userId: user.id,
    },
  });

  // Create Routes
  const route1 = await prisma.route.create({
    data: {
      from: "Lahore",
      to: "Islamabad",
      distance: 380,
      userId: user.id,
    },
  });

  const route2 = await prisma.route.create({
    data: {
      from: "Karachi",
      to: "Hyderabad",
      distance: 150,
      userId: user.id,
    },
  });

  // Create Trips
  await prisma.trip.createMany({
    data: [
      {
        date: new Date(),
        income: 1200,
        expense: 400,
        busId: bus1.id,
        routeId: route1.id,
        userId: user.id,
      },
      {
        date: new Date(),
        income: 900,
        expense: 300,
        busId: bus2.id,
        routeId: route2.id,
        userId: user.id,
      },
    ],
  });

  console.log("✅ Seed data inserted");
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());