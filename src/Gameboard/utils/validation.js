import {
  createValidationResult,
  hasValue,
  isFiniteNumber,
  isFunction,
  isIntegerNumber,
  isNegativeNumber,
  isNumber,
  isZero,
} from "../../utils";
import {
  validateIsArrayOfTwoIntegerNumbers,
  validateIsArrayOfTwoPositiveIntegerNumbers,
  validateIsObject,
  validateIsString,
} from "../../utils/validation";
import {
  DIRECTIONS,
  gameboardCoordinatesValidationMessages,
  gameboardDimensionsValidationMessages,
  gameboardDirectionValidationMessages,
  gameboardGetShipAtValidationMessages,
  gameboardInputsValidationMessages,
  gameboardIsCellHitValidationMessages,
  gameboardIsCellMissValidationMessages,
  gameboardPlaceShipValidationMessages,
  gameboardReceiveAttackValidationMessages,
  gameboardShipValidationMessages,
  VALID_GAMEBOARD_DIRECTIONS,
} from "./constants";

const validateGameboardDimensions = (dimensions) => {
  const validationResult = validateIsArrayOfTwoPositiveIntegerNumbers(
    dimensions,
    gameboardDimensionsValidationMessages
  );
  return validationResult;
};

export const validateGameboardInputs = (dimensions) => {
  const gameboardDimensionsValidationResult =
    validateGameboardDimensions(dimensions);
  if (!gameboardDimensionsValidationResult.isValid) {
    return gameboardDimensionsValidationResult;
  }

  return createValidationResult(
    true,
    gameboardInputsValidationMessages.valid.default
  );
};

const validateGameboardCoordinates = (coordinates, dimensions) => {
  const isArrayOfTwoIntegerNumbersValidationResult =
    validateIsArrayOfTwoIntegerNumbers(
      coordinates,
      gameboardCoordinatesValidationMessages
    );
  if (!isArrayOfTwoIntegerNumbersValidationResult.isValid) {
    return isArrayOfTwoIntegerNumbersValidationResult;
  }

  const [row, column] = coordinates;
  if (
    row < 0 ||
    column < 0 ||
    row >= dimensions[0] ||
    column >= dimensions[1]
  ) {
    return createValidationResult(
      false,
      gameboardCoordinatesValidationMessages.invalid.outOfBounds
    );
  }

  return createValidationResult(
    true,
    gameboardCoordinatesValidationMessages.valid.default
  );
};

export const validateGetShipAtInputs = (coordinates, dimensions) => {
  const gameboardCoordinatesValidationResult = validateGameboardCoordinates(
    coordinates,
    dimensions
  );
  if (!gameboardCoordinatesValidationResult.isValid) {
    return gameboardCoordinatesValidationResult;
  }

  return createValidationResult(
    true,
    gameboardGetShipAtValidationMessages.valid.default
  );
};

export const validateIsCellHitInputs = (coordinates, dimensions) => {
  const gameboardCoordinatesValidationResult = validateGameboardCoordinates(
    coordinates,
    dimensions
  );
  if (!gameboardCoordinatesValidationResult.isValid) {
    return gameboardCoordinatesValidationResult;
  }

  return createValidationResult(
    true,
    gameboardIsCellHitValidationMessages.valid.default
  );
};

export const validateIsCellMissInputs = (coordinates, dimensions) => {
  const gameboardCoordinatesValidationResult = validateGameboardCoordinates(
    coordinates,
    dimensions
  );
  if (!gameboardCoordinatesValidationResult.isValid) {
    return gameboardCoordinatesValidationResult;
  }

  return createValidationResult(
    true,
    gameboardIsCellMissValidationMessages.valid.default
  );
};

const validateGameboardDirection = (direction) => {
  const isStringValidationResult = validateIsString(
    direction,
    gameboardDirectionValidationMessages
  );
  if (!isStringValidationResult.isValid) {
    return isStringValidationResult;
  }

  const lowerCaseDirection = direction.toLowerCase();
  if (!VALID_GAMEBOARD_DIRECTIONS.includes(lowerCaseDirection)) {
    return createValidationResult(
      false,
      gameboardDirectionValidationMessages.invalid.notAValidDirection
    );
  }

  return createValidationResult(
    true,
    gameboardDirectionValidationMessages.valid.default
  );
};

const validateGameboardShip = (ship) => {
  const isObjectValidationResult = validateIsObject(
    ship,
    gameboardShipValidationMessages
  );
  if (!isObjectValidationResult.isValid) {
    return isObjectValidationResult;
  }

  if (!hasValue(ship.id)) {
    return createValidationResult(
      false,
      gameboardShipValidationMessages.invalid.noIdProperty
    );
  }

  if (!hasValue(ship.length)) {
    return createValidationResult(
      false,
      gameboardShipValidationMessages.invalid.noLengthProperty
    );
  }

  if (!isNumber(ship.length)) {
    return createValidationResult(
      false,
      gameboardShipValidationMessages.invalid.lengthNotANumber
    );
  }

  if (!isFiniteNumber(ship.length)) {
    return createValidationResult(
      false,
      gameboardShipValidationMessages.invalid.lengthNotAFiniteNumber
    );
  }

  if (!isIntegerNumber(ship.length)) {
    return createValidationResult(
      false,
      gameboardShipValidationMessages.invalid.lengthNotAnIntegerNumber
    );
  }

  if (isNegativeNumber(ship.length)) {
    return createValidationResult(
      false,
      gameboardShipValidationMessages.invalid.lengthIsNegativeNumber
    );
  }

  if (isZero(ship.length)) {
    return createValidationResult(
      false,
      gameboardShipValidationMessages.invalid.lengthIsZero
    );
  }

  if (!hasValue(ship.hit)) {
    return createValidationResult(
      false,
      gameboardShipValidationMessages.invalid.noHitMethod
    );
  }

  if (!isFunction(ship.hit)) {
    return createValidationResult(
      false,
      gameboardShipValidationMessages.invalid.hitMethodNotAFunction
    );
  }

  if (!hasValue(ship.isSunk)) {
    return createValidationResult(
      false,
      gameboardShipValidationMessages.invalid.noIsSunkMethod
    );
  }

  if (!isFunction(ship.isSunk)) {
    return createValidationResult(
      false,
      gameboardShipValidationMessages.invalid.isSunkMethodNotAFunction
    );
  }

  return createValidationResult(
    true,
    gameboardShipValidationMessages.valid.default
  );
};

export const validatePlaceShipInputs = (
  ship,
  coordinates,
  dimensions,
  direction,
  board
) => {
  const gameboardShipValidationResult = validateGameboardShip(ship);
  if (!gameboardShipValidationResult.isValid) {
    return gameboardShipValidationResult;
  }

  const gameboardCoordinatesValidationResult = validateGameboardCoordinates(
    coordinates,
    dimensions
  );
  if (!gameboardCoordinatesValidationResult.isValid) {
    return gameboardCoordinatesValidationResult;
  }

  const gameboardDirectionValidationResult =
    validateGameboardDirection(direction);
  if (!gameboardDirectionValidationResult.isValid) {
    return gameboardDirectionValidationResult;
  }

  const [row, column] = coordinates;
  const lowerCaseDirection = direction.toLowerCase();

  if (board[row][column].ship) {
    return createValidationResult(
      false,
      gameboardPlaceShipValidationMessages.invalid.alreadyOccupied
    );
  }

  if (lowerCaseDirection === DIRECTIONS.HORIZONTAL) {
    if (column + ship.length > dimensions[1]) {
      return createValidationResult(
        false,
        gameboardPlaceShipValidationMessages.invalid.outOfBounds
      );
    }
  } else if (lowerCaseDirection === DIRECTIONS.VERTICAL) {
    if (row + ship.length > dimensions[0]) {
      return createValidationResult(
        false,
        gameboardPlaceShipValidationMessages.invalid.outOfBounds
      );
    }
  }

  for (let i = 0; i < ship.length; i++) {
    if (lowerCaseDirection === DIRECTIONS.HORIZONTAL) {
      if (board[row][column + i].ship) {
        return createValidationResult(
          false,
          gameboardPlaceShipValidationMessages.invalid.overlapsWithAnotherShip
        );
      }
    } else if (lowerCaseDirection === DIRECTIONS.VERTICAL) {
      if (board[row + i][column].ship) {
        return createValidationResult(
          false,
          gameboardPlaceShipValidationMessages.invalid.overlapsWithAnotherShip
        );
      }
    }
  }

  return createValidationResult(
    true,
    gameboardPlaceShipValidationMessages.valid.default
  );
};

export const validateReceiveAttackInputs = (
  coordinates,
  dimensions,
  board,
  placedShipsCount
) => {
  const gameboardCoordinatesValidationResult = validateGameboardCoordinates(
    coordinates,
    dimensions
  );
  if (!gameboardCoordinatesValidationResult.isValid) {
    return gameboardCoordinatesValidationResult;
  }

  if (placedShipsCount <= 0) {
    return createValidationResult(
      false,
      gameboardReceiveAttackValidationMessages.invalid.noShipsPlaced
    );
  }

  const [row, column] = coordinates;
  const cell = board[row][column];

  if (cell.hit) {
    if (cell.ship) {
      return createValidationResult(
        false,
        gameboardReceiveAttackValidationMessages.invalid.alreadyHit
      );
    }

    return createValidationResult(
      false,
      gameboardReceiveAttackValidationMessages.invalid.alreadyMissed
    );
  }

  return createValidationResult(
    true,
    gameboardReceiveAttackValidationMessages.valid.default
  );
};
