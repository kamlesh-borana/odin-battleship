export const PLAYER_TYPES = {
  REAL: "real",
  COMPUTER: "computer",
};
export const VALID_PLAYER_TYPES = [PLAYER_TYPES.REAL, PLAYER_TYPES.COMPUTER];

export const playerTypeValidationMessages = {
  valid: {
    default: "Player type is valid",
  },
  invalid: {
    default: "Invalid player type",
    required: "Player type is required. It cannot be null or undefined.",
    undefined: "Player type is required. It cannot be null or undefined.",
    null: "Player type is required. It cannot be null or undefined.",
    notAString: "Player type must be a string.",
    notAValidType:
      "Player type must be a valid type. Valid types are: " +
      VALID_PLAYER_TYPES.join(", "),
  },
};

export const playerGameboardValidationMessages = {
  valid: {
    default: "Player gameboard is valid",
  },
  invalid: {
    default: "Invalid player gameboard",
    required: "Player gameboard is required. It cannot be null or undefined.",
    undefined: "Player gameboard is required. It cannot be null or undefined.",
    null: "Player gameboard is required. It cannot be null or undefined.",
    notAnObject: "Player gameboard must be an object.",
  },
};
