const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateCarInput(data) {
  let errors = {};
  
  // Convert empty fields to an empty string so we can use validator functions
  data.user_id = !isEmpty(data.user_id) ? data.user_id : "";
  data.car_id = !isEmpty(data.car_id) ? data.car_id : "";
  data.content = !isEmpty(data.content) ? data.content : "";
  
  // User ID checks
  if (Validator.isEmpty(data.user_id)) {
    errors.user_id = "UserID field is required";
  }
  // Car ID checks
  if (Validator.isEmpty(data.car_id)) {
    errors.car_id = "CarID field is required";
  }
  // Comment content checks
  if (Validator.isEmpty(data.content)) {
    errors.content = "Comment content is required";
  }
  
  return {
    errors,
    isValid: isEmpty(errors)
  };
};