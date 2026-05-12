const validateBooking = (
    req,
    res,
    next
  ) => {
  
    const {
      passengerName,
      amount,
      seats,
      routeId,
    } = req.body;
  
    if (!passengerName) {
      return res.status(400).json({
        message:
          "Passenger name is required",
      });
    }
  
    if (!amount || amount <= 0) {
      return res.status(400).json({
        message:
          "Valid amount is required",
      });
    }
  
    if (!seats || seats <= 0) {
      return res.status(400).json({
        message:
          "Seats must be greater than 0",
      });
    }
  
    if (!routeId) {
      return res.status(400).json({
        message:
          "Route is required",
      });
    }
  
    next();
  };
  
  module.exports = {
    validateBooking,
  };