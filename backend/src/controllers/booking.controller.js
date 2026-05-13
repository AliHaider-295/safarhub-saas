const { prisma } = require("../db/prisma");

// =========================================
// CREATE BOOKING
// =========================================
const createBooking = async (req, res) => {
  try {
    const {
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

    // VALIDATION
    if (
      !passengerName ||
      !phone ||
      !amount ||
      !journeyDate ||
      !busId ||
      !routeId
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // FIND BUS
    const bus = await prisma.bus.findUnique({
      where: {
        id: busId,
      },
    });

    if (!bus) {
      return res.status(404).json({
        success: false,
        message: "Bus not found",
      });
    }

    // TOTAL BOOKED SEATS
    const existingBookings =
      await prisma.booking.aggregate({
        where: {
          busId,
          journeyDate: new Date(journeyDate),
          status: {
            not: "CANCELLED",
          },
        },

        _sum: {
          seats: true,
        },
      });

    const bookedSeats =
      existingBookings._sum.seats || 0;

    const requestedSeats =
      Number(seats || 1);

    // CHECK AVAILABLE SEATS
    if (
      bookedSeats + requestedSeats >
      bus.totalSeats
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Not enough seats available",
      });
    }

    // AUTO BOOKING CODE
    const bookingCode = `BK-${Date.now()}`;

    // CREATE BOOKING
    const booking =
      await prisma.booking.create({
        data: {
          bookingCode,

          passengerName,

          phone,

          email,

          seats: requestedSeats,

          amount: Number(amount || 0),

          paymentMethod,

          status: status || "PENDING",

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
      message:
        "Booking created successfully",
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

// =========================================
// GET BOOKINGS
// =========================================
const getBookings = async (req, res) => {
  try {

    const {
      fromDate,
      toDate,
      status,
      busId,
      routeId,
      search,
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

      ...(search && {
        OR: [

          {
            passengerName: {
              contains: search,
              mode: "insensitive",
            },
          },

          {
            bookingCode: {
              contains: search,
              mode: "insensitive",
            },
          },

          {
            phone: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
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

    // TOTAL COUNT
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

// =========================================
// GET SINGLE BOOKING
// =========================================
const getBookingById =
  async (req, res) => {
    try {

      const booking =
        await prisma.booking.findFirst({
          where: {
            id: req.params.id,

            createdById:
              req.user.sub,
          },

          include: {
            bus: true,
            route: true,
          },
        });

      if (!booking) {
        return res.status(404).json({
          success: false,
          message:
            "Booking not found",
        });
      }

      res.json({
        success: true,
        data: booking,
      });

    } catch (error) {

      console.error(
        "Get Booking By ID Error:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Failed to fetch booking",
      });
    }
  };

// =========================================
// UPDATE BOOKING
// =========================================
const updateBooking =
  async (req, res) => {
    try {

      const booking =
        await prisma.booking.findFirst({
          where: {
            id: req.params.id,

            createdById:
              req.user.sub,
          },
        });

      if (!booking) {
        return res.status(404).json({
          success: false,
          message:
            "Booking not found",
        });
      }

      const updatedBooking =
        await prisma.booking.update({
          where: {
            id: req.params.id,
          },

          data: {
            ...req.body,

            amount: req.body.amount
              ? Number(req.body.amount)
              : undefined,

            seats: req.body.seats
              ? Number(req.body.seats)
              : undefined,

            journeyDate:
              req.body.journeyDate
                ? new Date(
                    req.body.journeyDate
                  )
                : undefined,
          },

          include: {
            bus: true,
            route: true,
          },
        });

      res.json({
        success: true,
        message:
          "Booking updated successfully",
        data: updatedBooking,
      });

    } catch (error) {

      console.error(
        "Update Booking Error:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Failed to update booking",
      });
    }
  };

// =========================================
// DELETE BOOKING
// =========================================
const deleteBooking =
  async (req, res) => {
    try {

      const booking =
        await prisma.booking.findFirst({
          where: {
            id: req.params.id,

            createdById:
              req.user.sub,
          },
        });

      if (!booking) {
        return res.status(404).json({
          success: false,
          message:
            "Booking not found",
        });
      }

      await prisma.booking.delete({
        where: {
          id: req.params.id,
        },
      });

      res.json({
        success: true,
        message:
          "Booking deleted successfully",
      });

    } catch (error) {

      console.error(
        "Delete Booking Error:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Failed to delete booking",
      });
    }
  };

// =========================================
// BOOKING SUMMARY + CHART DATA
// =========================================
const getBookingSummary =
  async (req, res) => {
    try {

      const bookings =
        await prisma.booking.findMany({
          where: {
            createdById:
              req.user.sub,
          },

          orderBy: {
            journeyDate: "asc",
          },
        });

      // COUNTS
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

      // REVENUE
      const totalRevenue =
        bookings.reduce(
          (sum, booking) =>
            sum + booking.amount,
          0
        );

      // MONTHLY CHART DATA
      const monthlyMap = {};

      bookings.forEach((booking) => {

        const month =
          new Date(
            booking.journeyDate
          ).toLocaleString("default", {
            month: "short",
          });

        if (!monthlyMap[month]) {

          monthlyMap[month] = {
            month,
            bookings: 0,
            revenue: 0,
          };
        }

        monthlyMap[month].bookings += 1;

        monthlyMap[month].revenue +=
          booking.amount;
      });

      const monthlyBookings =
        Object.values(monthlyMap).map(
          (item) => ({
            month: item.month,
            bookings: item.bookings,
          })
        );

      const monthlyRevenue =
        Object.values(monthlyMap).map(
          (item) => ({
            month: item.month,
            revenue: item.revenue,
          })
        );

      res.json({
        success: true,

        totalBookings,

        confirmedBookings,

        pendingBookings,

        cancelledBookings,

        totalRevenue,

        monthlyBookings,

        monthlyRevenue,
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

// =========================================
// EXPORT BOOKINGS
// =========================================
const exportBookings =
  async (req, res) => {
    try {

      const bookings =
        await prisma.booking.findMany({
          where: {
            createdById:
              req.user.sub,
          },

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
      });

    } catch (error) {

      console.error(
        "Export Booking Error:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Failed to export bookings",
      });
    }
  };

// =========================================
// EXPORTS
// =========================================
module.exports = {
  createBooking,
  getBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
  getBookingSummary,
  exportBookings,
};