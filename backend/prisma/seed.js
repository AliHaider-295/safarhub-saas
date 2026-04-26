const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {

  // 👤 Create User
  const user = await prisma.user.create({
    data: {
      companyName: "Safar Travels",
      email: "admin@safarhub.com",
      password: "hashedpassword",
    },
  });

  // 🚌 Create Buses
  const buses = await prisma.bus.createMany({
    data: [
      {
        busNumber: "BUS-101",
        type: "AC",
        capacity: 50,
        status: "ACTIVE",
        driverName: "Ali Khan",
        userId: user.id,
      },
      {
        busNumber: "BUS-102",
        type: "Non-AC",
        capacity: 45,
        status: "MAINTENANCE",
        driverName: "Ahmed Raza",
        userId: user.id,
      },
      {
        busNumber: "BUS-103",
        type: "AC",
        capacity: 40,
        status: "INACTIVE",
        driverName: "Usman Ali",
        userId: user.id,
      },

      // 👉 Generate more buses automatically
      ...Array.from({ length: 20 }).map((_, i) => ({
        busNumber: `BUS-${200 + i}`,
        type: i % 2 === 0 ? "AC" : "Non-AC",
        capacity: 40 + (i % 3) * 5,
        status: ["ACTIVE", "INACTIVE", "MAINTENANCE"][i % 3],
        driverName: `Driver ${i}`,
        userId: user.id,
      })),
    ],
  });

  // 🛣️ Routes
  const routes = await prisma.route.createMany({
    data: [
      { from: "Karachi", to: "Lahore", distance: 1200, userId: user.id },
      { from: "Lahore", to: "Islamabad", distance: 380, userId: user.id },
      { from: "Multan", to: "Faisalabad", distance: 250, userId: user.id },
      { from: "Peshawar", to: "Quetta", distance: 900, userId: user.id },

      ...Array.from({ length: 10 }).map((_, i) => ({
        from: `City ${i}`,
        to: `City ${i + 1}`,
        distance: 100 + i * 20,
        userId: user.id,
      })),
    ],
  });

  // 📊 Trips (for charts)
  const allBuses = await prisma.bus.findMany();
  const allRoutes = await prisma.route.findMany();

  const tripsData = [];

  for (let i = 0; i < 50; i++) {
    tripsData.push({
      date: new Date(Date.now() - i * 86400000),
      income: Math.floor(Math.random() * 50000) + 10000,
      expense: Math.floor(Math.random() * 20000) + 5000,
      busId: allBuses[i % allBuses.length].id,
      routeId: allRoutes[i % allRoutes.length].id,
      userId: user.id,
    });
  }

  await prisma.trip.createMany({
    data: tripsData,
  });

  console.log("✅ Seed Data Inserted Successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });