const { prisma } = require("../db/prisma");

// =========================================
// CREATE BOOKING
// =========================================
const createBooking = async (req, res) => {
  try {
    const {
      passengerName,
      routeId,
      busId,
      seats,
      amount,
      paymentMethod,
      status,
      journeyDate,
    } = req.body;

    // VALIDATION
    if (
      !passengerName ||
      !routeId ||
      !busId ||
      seats === undefined ||
      !amount ||
      !journeyDate
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // FIND BUS
    const bus = await prisma.bus.findUnique({
      where: { id: busId },
    });

    if (!bus) {
      return res.status(404).json({
        success: false,
        message: "Bus not found",
      });
    }

    // CHECK BOOKED SEATS
    const existingBookings = await prisma.booking.aggregate({
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

    const bookedSeats = existingBookings._sum.seats || 0;
    const requestedSeats = Number(seats);

    // SEAT CHECK
    if (bookedSeats + requestedSeats > bus.totalSeats) {
      return res.status(400).json({
        success: false,
        message: "Not enough seats available",
      });
    }

    // BOOKING CODE
    const bookingCode = `BK-${Date.now()}`;

    // CREATE BOOKING
    const booking = await prisma.booking.create({
      data: {
        bookingCode,
        passengerName,
        routeId,
        busId,
        seats: requestedSeats,
        amount: Number(amount),
        paymentMethod,
        status: status || "PENDING",
        journeyDate: new Date(journeyDate),
        createdById: req.user.sub,
      },
      include: {
        bus: true,
        route: true,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: booking,
    });

  } catch (error) {
    console.error("Create Booking Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create booking",
    });
  }
};

// =========================================
// GET BOOKINGS
// =========================================
const getBookings = async (req, res) => {
  try {
    const clean = (value) => {
      if (!value) return undefined;
    
      if (
        value === "" ||
        value === "null" ||
        value === "undefined"
      ) {
        return undefined;
      }
    
      return value;
    };
    const fromDate = clean(req.query.fromDate);
    const toDate = clean(req.query.toDate);
    const status = clean(req.query.status);
    const busId = clean(req.query.busId);
    const routeId = clean(req.query.routeId);
    const search = clean(req.query.search);

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
              ...(fromDate && !isNaN(new Date(fromDate))
                ? { gte: new Date(fromDate) }
                : {}),
              ...(toDate && !isNaN(new Date(toDate))
                ? { lte: new Date(
                  new Date(toDate).setHours(23, 59, 59, 999)
                ) }
                : {}),
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
const getBookingSummary = async (req, res) => {
  try {
    const clean = (value) => {
      if (!value) return undefined;

      if (
        ([_, value]) =>
          value !== "" &&
          value !== null &&
          value !== undefined
      ) {
        return undefined;
      }

      return value;
    };

    // QUERY PARAMS
    const fromDate = clean(req.query.fromDate);
    const toDate = clean(req.query.toDate);
    const status = clean(req.query.status);
    const busId = clean(req.query.busId);
    const routeId = clean(req.query.routeId);
    const search = clean(req.query.search);

    // FILTERS
    const where = {
      createdById: req.user.sub,

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
              ...(fromDate &&
              !isNaN(new Date(fromDate))
                ? {
                    gte: new Date(fromDate),
                  }
                : {}),

              ...(toDate &&
              !isNaN(new Date(toDate))
                ? {
                    lte: new Date(toDate),
                  }
                : {}),
            },
          }
        : {}),
    };

    // BOOKINGS
    const bookings =
      await prisma.booking.findMany({
        where,

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
          b.status === "CONFIRMED"
      ).length;

    const pendingBookings =
      bookings.filter(
        (b) =>
          b.status === "PENDING"
      ).length;

    const cancelledBookings =
      bookings.filter(
        (b) =>
          b.status === "CANCELLED"
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

  const month = new Date(
    booking.journeyDate
  ).toLocaleString("default", {
    month: "short",
  });

  if (!monthlyMap[month]) {

    monthlyMap[month] = {
      month,
      confirmed: 0,
      pending: 0,
      cancelled: 0,
      revenue: 0,
    };
  }

  if (booking.status === "CONFIRMED") {
    monthlyMap[month].confirmed += 1;
  }

  if (booking.status === "PENDING") {
    monthlyMap[month].pending += 1;
  }

  if (booking.status === "CANCELLED") {
    monthlyMap[month].cancelled += 1;
  }

  monthlyMap[month].revenue += booking.amount;
});

    const monthlyBookings =
    Object.values(monthlyMap)
    
    
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

      bookingChart:
        monthlyBookings,

      revenueChart:
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