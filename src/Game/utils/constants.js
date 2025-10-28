export const gameInputsValidationMessages = {
  valid: {
    default: "Game inputs are valid",
  },
  invalid: {
    default: "Invalid game inputs",
  },
};

export const playersListValidationMessages = {
  valid: {
    default: "Players list is valid",
  },
  invalid: {
    default: "Invalid players list",
    required: "Players list is required. It cannot be null or undefined.",
    isUndefined: "Players list is required. It cannot be null or undefined.",
    isNull: "Players list is required. It cannot be null or undefined.",
    notAnArray: "Players list must be an array.",
    notAnArrayOfAtLeast2Elements:
      "Players list must be an array of at least 2 elements.",
    notAnArrayOfObjects: "Players list must be an array of objects.",
  },
};
