export const DEFAULT_GAMEBOARD_DIMENSIONS = [10, 10];

export const DIRECTIONS = {
  HORIZONTAL: "horizontal",
  VERTICAL: "vertical",
};
export const VALID_GAMEBOARD_DIRECTIONS = [
  DIRECTIONS.HORIZONTAL,
  DIRECTIONS.VERTICAL,
];

export const gameboardDimensionsValidationMessages = {
  valid: {
    default: "Gameboard dimensions are valid",
  },
  invalid: {
    default: "Invalid gameboard dimensions",
    required:
      "Gameboard dimensions are required. It cannot be null or undefined.",
    undefined:
      "Gameboard dimensions are required. It cannot be null or undefined.",
    null: "Gameboard dimensions must be an array. It cannot be null.",
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

export const gameboardCoordinatesValidationMessages = {
  valid: {
    default: "Gameboard coordinates are valid",
  },
  invalid: {
    default: "Invalid gameboard coordinates",
    required:
      "Gameboard coordinates are required. It cannot be null or undefined.",
    undefined:
      "Gameboard coordinates are required. It cannot be null or undefined.",
    null: "Gameboard coordinates are required. It cannot be null or undefined.",
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

export const gameboardShipValidationMessages = {
  valid: {
    default: "Gameboard ship is valid",
  },
  invalid: {
    default: "Invalid gameboard ship",
    required: "Gameboard ship is required. It cannot be null or undefined.",
    undefined: "Gameboard ship is required. It cannot be null or undefined.",
    null: "Gameboard ship is required. It cannot be null or undefined.",
    notAnObject: "Gameboard ship must be an object.",
    notAShipInstanceObject:
      "Gameboard ship must be an instance of the Ship class.",
    noIdProperty: "Gameboard ship must have an id property.",
    noLengthProperty: "Gameboard ship must have a length property.",
    lengthNotANumber: "Gameboard ship length must be a number.",
    lengthNotAFiniteNumber: "Gameboard ship length must be a finite number.",
    lengthNotAnIntegerNumber:
      "Gameboard ship length must be an integer number.",
    lengthIsNegativeNumber: "Gameboard ship length must be a positive number.",
    lengthIsZero:
      "Gameboard ship length must be a positive number. It cannot be zero.",
    noHitsProperty: "Gameboard ship must have a hits property.",
    hitsNotANumber: "Gameboard ship hits must be a number.",
    hitsNotAFiniteNumber: "Gameboard ship hits must be a finite number.",
    hitsNotAnIntegerNumber: "Gameboard ship hits must be an integer number.",
    hitsIsNegativeNumber: "Gameboard ship hits must be a non-negative number.",
    hitsIsGreaterThanLength:
      "Gameboard ship hits must be less than or equal to the length.",
    noHitMethod: "Gameboard ship must have a hit method.",
    hitMethodNotAFunction: "Gameboard ship hit method must be a function.",
    hitMethodReturnsNonBooleanValue:
      "Gameboard ship hit method must return a boolean value.",
    noIsSunkMethod: "Gameboard ship must have a isSunk method.",
    isSunkMethodNotAFunction:
      "Gameboard ship isSunk method must be a function.",
    isSunkMethodReturnsNonBooleanValue:
      "Gameboard ship isSunk method must return a boolean value.",
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
    undefined:
      "Gameboard direction is required. It cannot be null or undefined.",
    null: "Gameboard direction is required. It cannot be null or undefined.",
    notAString: "Gameboard direction must be a string.",
    notAValidDirection:
      "Gameboard direction must be a valid direction. Valid directions are: " +
      VALID_GAMEBOARD_DIRECTIONS.join(", "),
  },
};

export const gameboardPlaceShipValidationMessages = {
  valid: {
    default: "Ship placed successfully",
  },
  invalid: {
    default: "Failed to place ship",
    alreadyOccupied: "Cannot place ship on a cell that is already occupied.",
    overlapsWithAnotherShip:
      "Cannot place ship that overlaps with another ship.",
    outOfBounds: "Cannot place ship that is out of bounds.",
  },
};

export const gameboardReceiveAttackValidationMessages = {
  valid: {
    default: "Attack received successfully",
  },
  invalid: {
    default: "Failed to receive attack",
    noShipsPlaced: "Cannot receive attack on a gameboard with no ships placed.",
    alreadyHit: "Cannot receive attack on a cell that is already hit.",
    alreadyMissed: "Cannot receive attack on a cell that is already missed.",
  },
};
