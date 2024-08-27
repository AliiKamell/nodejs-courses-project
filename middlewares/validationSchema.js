const { body } = require("express-validator");


const validationSchema = () => {
  return [
    body("title")
      .notEmpty()
      .withMessage("title is required")
      .isLength({ min: 2 })
      .withMessage("title at least 2 charts"),
    body("price")
      .notEmpty()
      .withMessage("price is required")
      .isLength({ min: 1 })
      .withMessage("Price at least 2 charts"),
  ];
};
module.exports = {
  validationSchema,
};
