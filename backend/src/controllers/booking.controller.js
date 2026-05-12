const { prisma } = require("../db/prisma");

// ==============================
// CREATE BOOKING
// ==============================
const createBooking = async (req, res) => {
  try {

    const {
      bookingCode,
      passengerName,
      phone,
      email,
      seats,
      amount,
      paymentMethod,
      status,
      journeyDate,
      note,
      busId,
      routeId,
    } = req.body;

    const booking =
      await prisma.booking.create({
        data: {

          bookingCode,

          passengerName,

          phone,

          email,

          seats: Number(seats || 1),

          amount: Number(amount),

          paymentMethod,

          status,

          journeyDate:
            new Date(journeyDate),
 
          note,

          busId,

          routeId,

          createdById:
            req.user.sub,
        },

        include: {
          bus: true,
          route: true,
        },
      });

    res.status(201).json({
      success: true,
      data: booking,
    });

  } catch (error) {

    console.error(
      "Create Booking Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to create booking",
    });
  }
};

// ==============================
// GET BOOKINGS
// ==============================
const getBookings = async (req, res) => {
  try {

    const {
      fromDate,
      toDate,
      status,
      busId,
      routeId,
    } = req.query;

    // PAGINATION
    const page =
      Number(req.query.page) || 1;

    const limit =
      Number(req.query.limit) || 10;

    const skip =
      (page - 1) * limit;

    // FILTERS
    const where = {

      createdById:
        req.user.sub,

      ...(status && {
        status,
      }),

      ...(busId && {
        busId,
      }),

      ...(routeId && {
        routeId,
      }),

      ...(fromDate || toDate
        ? {
            journeyDate: {

              ...(fromDate && {
                gte: new Date(fromDate),
              }),

              ...(toDate && {
                lte: new Date(toDate),
              }),
            },
          }
        : {}),
    };

    // TOTAL
    const total =
      await prisma.booking.count({
        where,
      });

    // BOOKINGS
    const bookings =
      await prisma.booking.findMany({
        where,

        skip,

        take: limit,

        include: {
          bus: true,
          route: true,
        },

        orderBy: {
          createdAt: "desc",
        },
      });

    res.json({
      success: true,

      data: bookings,

      pagination: {
        total,
        page,
        limit,

        totalPages: Math.ceil(
          total / limit
        ),

        hasNextPage:
          page <
          Math.ceil(total / limit),

        hasPrevPage:
          page > 1,
      },
    });

  } catch (error) {

    console.error(
      "Get Bookings Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch bookings",
    });
  }
};

// ==============================
// BOOKING SUMMARY
// ==============================
const getBookingSummary =
  async (req, res) => {
    try {

      const bookings =
        await prisma.booking.findMany({
          where: {
            createdById:
              req.user.sub,
          },
        });

      const totalBookings =
        bookings.length;

      const confirmedBookings =
        bookings.filter(
          (b) =>
            b.status ===
            "CONFIRMED"
        ).length;

      const pendingBookings =
        bookings.filter(
          (b) =>
            b.status === "PENDING"
        ).length;

      const cancelledBookings =
        bookings.filter(
          (b) =>
            b.status ===
            "CANCELLED"
        ).length;

      const totalRevenue =
        bookings.reduce(
          (sum, booking) =>
            sum + booking.amount,
          0
        );

      res.json({
        success: true,

        totalBookings,

        confirmedBookings,

        pendingBookings,

        cancelledBookings,

        totalRevenue,
      });

    } catch (error) {

      console.error(
        "Booking Summary Error:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Failed to fetch booking summary",
      });
    }
  };

// ==============================
// EXPORTS
// ==============================
module.exports = {
  createBooking,
  getBookings,
  getBookingSummary,
};