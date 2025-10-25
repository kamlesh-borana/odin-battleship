export const shipInputsValidationMessages = {
  valid: {
    default: "Ship inputs are valid",
  },
  invalid: {
    default: "Invalid ship inputs",
  },
};

export const shipLengthValidationMessages = {
  valid: {
    default: "Ship length is valid",
  },
  invalid: {
    default: "Invalid ship length",
    required: "Ship length is required. It cannot be null or undefined.",
    isUndefined: "Ship length is required. It cannot be null or undefined.",
    isNull: "Ship length is required. It cannot be null or undefined.",
    notANumber: "Ship length must be a number.",
    notAFiniteNumber: "Ship length must be a finite number.",
    notAnIntegerNumber: "Ship length must be an integer number.",
    isNegativeNumber: "Ship length must be a positive number.",
    isZero: "Ship length must be a positive number. It cannot be zero.",
  },
};

export const shipHitValidationMessages = {
  valid: {
    default: "Ship hit is valid",
  },
  invalid: {
    default: "Invalid ship hit",
    isSunk: "Ship is already sunk. You cannot hit it again.",
  },
};
