const { check } = require("express-validator");

exports.createBookingValidationRules = [
  check("date_time")
    .trim()
    .notEmpty()
    .isISO8601()
    .withMessage({ message: "date_time must be a date and not Empty" })
    .toDate()
    .custom((val) => {
      const dateNow = new Date(Date.now() + 2 * 60 * 60 * 1000);
      const dateAfter30Days = new Date(
        Date.now() + 2 * 60 * 60 * 1000 + 30 * 24 * 60 * 60 * 1000
      );

      if (val < dateNow) {
        throw new Error("date_time must be in the future.");
      }

      if (val > dateAfter30Days) {
        throw new Error("You can book only in 30 days next");
      }
      return true;
    }),
  check("totalPerson")
    .trim()
    .isNumeric()
    .isInt()
    .withMessage("totalPerson must be an integer number")
    .custom((val) => {
      if (val < 1) {
        throw new Error("totalPerson must be at least 1");
      }
      if (val > 10) {
        throw new Error("totalPerson can't be more than 10");
      }
      return true;
    }),
];

exports.statusValidationRules = (allowedStatuses) => {
  return [
    check("status")
      .trim()
      .notEmpty()
      .custom((val) => {
        console.log(`val = ${val}`);
        console.log(`baseStauts = ${allowedStatuses}`);
        if (!allowedStatuses.includes(val)) {
          throw new Error(
            `you can convert ${val} to ${allowedStatuses} in this case`
          );
        }
      }),
  ];
};
