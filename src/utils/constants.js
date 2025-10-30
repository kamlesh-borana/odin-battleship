export const SHIP_NAMES = {
  AIRCRAFT_CARRIER: "Aircraft Carrier",
  BATTLESHIP: "Battleship",
  CRUISER: "Cruiser",
  DESTROYER: "Destroyer",
  SUBMARINE: "Submarine",
  PATROL_BOAT: "Patrol Boat",
  DEFAULT: "Ship",
};

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

export const shipNameValidationMessages = {
  valid: {
    default: "Ship name is valid",
  },
  invalid: {
    default: "Invalid ship name",
    required: "Ship name is required. It cannot be null or undefined.",
    isUndefined: "Ship name is required. It cannot be null or undefined.",
    isNull: "Ship name is required. It cannot be null or undefined.",
    notAString: "Ship name must be a string.",
    isEmptyString: "Ship name cannot be an empty string.",
  },
};

export const shipHitsValidationMessages = {
  valid: {
    default: "Ship hits is valid",
  },
  invalid: {
    default: "Invalid ship hits",
    required: "Ship hits is required. It cannot be null or undefined.",
    isUndefined: "Ship hits is required. It cannot be null or undefined.",
    isNull: "Ship hits is required. It cannot be null or undefined.",
    notANumber: "Ship hits must be a number.",
    notAFiniteNumber: "Ship hits must be a finite number.",
    notAnIntegerNumber: "Ship hits must be an integer number.",
    isNegativeNumber: "Ship hits must be a non-negative integer number.",
    isGreaterThanLength:
      "Ship hits must be less than or equal to the ship's length.",
  },
};

export const shipValidationMessages = {
  valid: {
    default: "Ship is valid",
    length: shipLengthValidationMessages.valid,
    name: shipNameValidationMessages.valid,
    hits: shipHitsValidationMessages.valid,
  },
  invalid: {
    default: "Invalid ship",
    required: "Ship is required. It cannot be null or undefined.",
    isUndefined: "Ship is required. It cannot be null or undefined.",
    isNull: "Ship is required. It cannot be null or undefined.",
    notAnObject: "Ship must be an object.",
    noIdProperty: "Ship must have an id property.",
    noLengthProperty: "Ship must have a length property.",
    length: shipLengthValidationMessages.invalid,
    noNameProperty: "Ship must have a name property.",
    name: shipNameValidationMessages.invalid,
    noHitsProperty: "Ship must have a hits property.",
    hits: shipHitsValidationMessages.invalid,
    noHitMethod: "Ship must have a hit method.",
    hitMethodNotAFunction: "Ship's hit method must be a function.",
    noIsSunkMethod: "Ship must have an isSunk method.",
    isSunkMethodNotAFunction: "Ship's isSunk method must be a function.",
    noGetInfoMethod: "Ship must have a getInfo method.",
    getInfoMethodNotAFunction: "Ship's getInfo method must be a function.",
  },
  length: shipLengthValidationMessages,
  name: shipNameValidationMessages,
  hits: shipHitsValidationMessages,
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
    dimensions: gameboardDimensionsValidationMessages.valid,
  },
  invalid: {
    default: "Invalid gameboard",
    required: "Gameboard is required. It cannot be null or undefined.",
    isUndefined: "Gameboard is required. It cannot be null or undefined.",
    isNull: "Gameboard is required. It cannot be null or undefined.",
    notAnObject: "Gameboard must be an object.",
    noIdProperty: "Gameboard must have an id property.",
    noDimensionsProperty: "Gameboard must have a dimensions property.",
    dimensions: gameboardDimensionsValidationMessages.invalid,
    noGetShipAtMethod: "Gameboard must have a getShipAt method.",
    getShipAtMethodNotAFunction:
      "Gameboard getShipAt method must be a function.",
    noIsCellHitMethod: "Gameboard must have an isCellHit method.",
    isCellHitMethodNotAFunction:
      "Gameboard isCellHit method must be a function.",
    noIsCellMissHitMethod: "Gameboard must have an isCellMissHit method.",
    isCellMissHitMethodNotAFunction:
      "Gameboard isCellMissHit method must be a function.",
    noPlaceShipMethod: "Gameboard must have a placeShip method.",
    placeShipMethodNotAFunction:
      "Gameboard placeShip method must be a function.",
    noReceiveAttackMethod: "Gameboard must have a receiveAttack method.",
    receiveAttackMethodNotAFunction:
      "Gameboard receiveAttack method must be a function.",
    noAllShipsSunkMethod: "Gameboard must have an allShipsSunk method.",
    allShipsSunkMethodNotAFunction:
      "Gameboard allShipsSunk method must be a function.",
    noGetBoardMethod: "Gameboard must have a getBoard method.",
    getBoardMethodNotAFunction: "Gameboard getBoard method must be a function.",
  },
  dimensions: gameboardDimensionsValidationMessages,
};

export const shipsValidationMessages = {
  valid: {
    default: "Ships are valid",
    ship: shipValidationMessages.valid,
    gameboardCoordinates: gameboardCoordinatesValidationMessages.valid,
    gameboardDirection: gameboardDirectionValidationMessages.valid,
  },
  invalid: {
    default: "Invalid ships",
    required: "Ships are required. It cannot be null or undefined.",
    isUndefined: "Ships are required. It cannot be null or undefined.",
    isNull: "Ships are required. It cannot be null or undefined.",
    notAnArray: "Ships must be an array.",
    notAnArrayOfAtLeast1Element:
      "Ships must be an array of at least 1 element.",
    notAnArrayOfObjects: "Ships must be an array of objects.",
    noShipPropertyInObject: "Ships array objects must have a ship property.",
    noCoordinatesPropertyInObject:
      "Ships array objects must have a coordinates property.",
    noDirectionPropertyInObject:
      "Ships array objects must have a direction property.",
    notAnArrayOfShipPlacementInfoObjects:
      "Ships must be an array of ship placement information objects.",
    noShipPropertyInShipPlacementInfoObject:
      "Ships must have a ship property in their ship placement information objects.",
    noCoordinatesPropertyInShipPlacementInfoObject:
      "Ships must have a coordinates property in their ship placement information objects.",
    noDirectionPropertyInShipPlacementInfoObject:
      "Ships must have a direction property in their ship placement information objects.",
    ship: shipValidationMessages.invalid,
    gameboardCoordinates: gameboardCoordinatesValidationMessages.invalid,
    gameboardDirection: gameboardDirectionValidationMessages.invalid,
  },
  ship: shipValidationMessages,
  gameboardCoordinates: gameboardCoordinatesValidationMessages,
  gameboardDirection: gameboardDirectionValidationMessages,
};
