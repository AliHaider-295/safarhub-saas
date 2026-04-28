const { prisma } = require("./src/db/prisma");
const bcrypt = require("bcryptjs");

async function main() {
  console.log("🌱 Seeding started...");

  // ✅ 1. Create User
  const hashed = await bcrypt.hash("123456", 10);

  const user = await prisma.user.create({
    data: {
      companyName: "Safar Travels",
      email: "admin@safar.com",
      password: hashed,
    },
  });

  console.log("👤 User created:", user.id);

  // ✅ 2. Create Buses
  const buses = await prisma.bus.createMany({
    data: [
      {
        busNumber: "BUS-101",
        type: "AC",
        capacity: 50,
        status: "ACTIVE",
        driverName: "Ali",
        userId: user.id,
      },
      {
        busNumber: "BUS-102",
        type: "Non-AC",
        capacity: 45,
        status: "MAINTENANCE",
        driverName: "Ahmed",
        userId: user.id,
      },
      {
        busNumber: "BUS-103",
        type: "AC",
        capacity: 60,
        status: "INACTIVE",
        driverName: "Usman",
        userId: user.id,
      },
    ],
  });

  console.log("🚌 Buses added");

  // ✅ 3. Create Routes
  const routes = await prisma.route.createMany({
    data: [
      {
        name: "Karachi → Lahore",
        distance: 1200,
        userId: user.id,
      },
      {
        name: "Lahore → Islamabad",
        distance: 380,
        userId: user.id,
      },
      {
        name: "Karachi → Hyderabad",
        distance: 150,
        userId: user.id,
      },
    ],
  });

  console.log("🛣 Routes added");

  // ✅ 4. Create Trips
  const trips = await prisma.trip.createMany({
    data: [
      {
        income: 50000,
        expense: 20000,
        day: "Mon",
        userId: user.id,
      },
      {
        income: 60000,
        expense: 25000,
        day: "Tue",
        userId: user.id,
      },
      {
        income: 45000,
        expense: 18000,
        day: "Wed",
        userId: user.id,
      },
    ],
  });

  console.log("📊 Trips added");

  console.log("✅ Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });