const { check } = require("express-validator");
exports.createBookingValidationRules = [
  check("date_time")
    .trim()
    .notEmpty()
    .isISO8601()
    .withMessage({ message: "date_time must be a date and not Empty" }),
  check("date_time")
    .trim()
    .toDate()
    .custom((val) => {
      const dateNow = new Date(Date.now() + 2 * 60 * 60 * 1000);
      const dateAfter30Days = new Date(Date.now() +2*60*60*1000 + 30*24*60*60*1000 );

      if (val < dateNow) {
        throw new Error("date_time must be in the future.");
      }
      
      if (val > dateAfter30Days) {
        throw new Error("You can book only in 30 days next");
      }
      return true;
    })
];
