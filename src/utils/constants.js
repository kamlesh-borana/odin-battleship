export const DEFAULT_GAMEBOARD_DIMENSIONS = [10, 10];

export const DIRECTIONS = {
  HORIZONTAL: "horizontal",
  VERTICAL: "vertical",
};
export const VALID_GAMEBOARD_DIRECTIONS = [
  DIRECTIONS.HORIZONTAL,
  DIRECTIONS.VERTICAL,
];

export const PLAYER_TYPES = {
  REAL: "real",
  COMPUTER: "computer",
};
export const VALID_PLAYER_TYPES = [PLAYER_TYPES.REAL, PLAYER_TYPES.COMPUTER];

export const gameboardCoordinatesValidationMessages = {
  valid: {
    default: "Gameboard coordinates are valid",
  },
  invalid: {
    default: "Invalid gameboard coordinates",
    required:
      "Gameboard coordinates are required. It cannot be null or undefined.",
    isUndefined:
      "Gameboard coordinates are required. It cannot be null or undefined.",
    isNull:
      "Gameboard coordinates are required. It cannot be null or undefined.",
    notAnArray: "Gameboard coordinates must be an array.",
    notAnArrayOfTwoElements:
      "Gameboard coordinates must be an array of two elements.",
    notAnArrayOfTwoNumbers:
      "Gameboard coordinates must be an array of two numbers.",
    notAnArrayOfTwoFiniteNumbers:
      "Gameboard coordinates must be an array of two finite numbers.",
    notAnArrayOfTwoIntegerNumbers:
      "Gameboard coordinates must be an array of two integer numbers.",
    outOfBounds: "Gameboard coordinates are out of bounds.",
  },
};

export const shipValidationMessages = {
  valid: {
    default: "Ship is valid",
  },
  invalid: {
    default: "Invalid ship",
    required: "Ship is required. It cannot be null or undefined.",
    isUndefined: "Ship is required. It cannot be null or undefined.",
    isNull: "Ship is required. It cannot be null or undefined.",
    notAnObject: "Ship must be an object.",
    noIdProperty: "Ship must have an id property.",
    noLengthProperty: "Ship must have a length property.",
    lengthNotANumber: "Ship length must be a number.",
    lengthNotAFiniteNumber: "Ship length must be a finite number.",
    lengthNotAnIntegerNumber: "Ship length must be an integer number.",
    lengthIsNegativeNumber: "Ship length must be a positive number.",
    lengthIsZero: "Ship length must be a positive number. It cannot be zero.",
    noHitsProperty: "Ship must have a hits property.",
    hitsNotANumber: "Ship hits must be a number.",
    hitsNotAFiniteNumber: "Ship hits must be a finite number.",
    hitsNotAnIntegerNumber: "Ship hits must be an integer number.",
    hitsIsNegativeNumber: "Ship hits must be a non-negative number.",
    hitsIsGreaterThanLength:
      "Ship hits must be less than or equal to the length.",
    noHitMethod: "Ship must have a hit method.",
    hitMethodNotAFunction: "Ship's hit method must be a function.",
    hitMethodReturnsNonBooleanValue:
      "Ship's hit method must return a boolean value.",
    noIsSunkMethod: "Ship must have an isSunk method.",
    isSunkMethodNotAFunction: "Ship's isSunk method must be a function.",
    isSunkMethodReturnsNonBooleanValue:
      "Ship's isSunk method must return a boolean value.",
  },
};

export const gameboardDirectionValidationMessages = {
  valid: {
    default: "Gameboard direction is valid",
  },
  invalid: {
    default: "Invalid gameboard direction",
    required:
      "Gameboard direction is required. It cannot be null or undefined.",
    isUndefined:
      "Gameboard direction is required. It cannot be null or undefined.",
    isNull: "Gameboard direction is required. It cannot be null or undefined.",
    notAString: "Gameboard direction must be a string.",
    notAValidDirection:
      "Gameboard direction must be a valid direction. Valid directions are: " +
      VALID_GAMEBOARD_DIRECTIONS.join(", "),
  },
};

export const playerTypeValidationMessages = {
  valid: {
    default: "Player type is valid",
  },
  invalid: {
    default: "Invalid player type",
    required: "Player type is required. It cannot be null or undefined.",
    isUndefined: "Player type is required. It cannot be null or undefined.",
    isNull: "Player type is required. It cannot be null or undefined.",
    notAString: "Player type must be a string.",
    notAValidType:
      "Player type must be a valid type. Valid types are: " +
      VALID_PLAYER_TYPES.join(", "),
  },
};

export const gameboardDimensionsValidationMessages = {
  valid: {
    default: "Gameboard dimensions are valid",
  },
  invalid: {
    default: "Invalid gameboard dimensions",
    required:
      "Gameboard dimensions are required. It cannot be null or undefined.",
    isUndefined:
      "Gameboard dimensions are required. It cannot be null or undefined.",
    isNull: "Gameboard dimensions must be an array. It cannot be null.",
    notAnArray: "Gameboard dimensions must be an array.",
    notAnArrayOfTwoElements:
      "Gameboard dimensions must be an array of two elements.",
    notAnArrayOfTwoNumbers:
      "Gameboard dimensions must be an array of two numbers.",
    notAnArrayOfTwoFiniteNumbers:
      "Gameboard dimensions must be an array of two finite numbers.",
    notAnArrayOfTwoIntegerNumbers:
      "Gameboard dimensions must be an array of two integer numbers.",
    notAnArrayOfTwoPositiveIntegerNumbers:
      "Gameboard dimensions must be an array of two positive integer numbers (Greater than zero).",
  },
};

export const gameboardValidationMessages = {
  valid: {
    default: "Gameboard is valid",
    gameboardDimensions: gameboardDimensionsValidationMessages.valid,
  },
  invalid: {
    default: "Invalid gameboard",
    required: "Gameboard is required. It cannot be null or undefined.",
    isUndefined: "Gameboard is required. It cannot be null or undefined.",
    isNull: "Gameboard is required. It cannot be null or undefined.",
    notAnObject: "Gameboard must be an object.",
    noDimensionsProperty: "Gameboard must have a dimensions property.",
    gameboardDimensions: gameboardDimensionsValidationMessages.invalid,
    noPlaceShipMethod: "Gameboard must have a placeShip method.",
    placeShipMethodNotAFunction:
      "Gameboard placeShip method must be a function.",
    noGetShipAtMethod: "Gameboard must have a getShipAt method.",
    getShipAtMethodNotAFunction:
      "Gameboard getShipAt method must be a function.",
    noGetBoardMethod: "Gameboard must have a getBoard method.",
    getBoardMethodNotAFunction: "Gameboard getBoard method must be a function.",
  },
  gameboardDimensions: gameboardDimensionsValidationMessages,
};
