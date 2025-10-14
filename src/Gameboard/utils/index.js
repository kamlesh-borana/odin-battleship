import {
  createValidationResult,
  hasValue,
  isArray,
  isFiniteNumber,
  isFunction,
  isIntegerNumber,
  isNegativeNumber,
  isNull,
  isNumber,
  isObject,
  isString,
  isUndefined,
  isZero,
} from "../../utils";
import {
  DIRECTIONS,
  gameboardCoordinatesValidationMessages,
  gameboardDimensionsValidationMessages,
  gameboardDirectionValidationMessages,
  gameboardPlaceShipValidationMessages,
  gameboardReceiveAttackValidationMessages,
  gameboardShipValidationMessages,
  VALID_GAMEBOARD_DIRECTIONS,
} from "./constants";

const validateGameboardDimensions = (dimensions) => {
  if (isUndefined(dimensions)) {
    return createValidationResult(
      true,
      gameboardDimensionsValidationMessages.valid.default
    );
  }

  if (isNull(dimensions)) {
    return createValidationResult(
      false,
      gameboardDimensionsValidationMessages.invalid.null
    );
  }

  if (!isArray(dimensions)) {
    return createValidationResult(
      false,
      gameboardDimensionsValidationMessages.invalid.notAnArray
    );
  }

  if (dimensions.length !== 2) {
    return createValidationResult(
      false,
      gameboardDimensionsValidationMessages.invalid.notAnArrayOfTwoElements
    );
  }

  if (!isNumber(dimensions[0]) || !isNumber(dimensions[1])) {
    return createValidationResult(
      false,
      gameboardDimensionsValidationMessages.invalid.notAnArrayOfTwoNumbers
    );
  }

  if (!isFiniteNumber(dimensions[0]) || !isFiniteNumber(dimensions[1])) {
    return createValidationResult(
      false,
      gameboardDimensionsValidationMessages.invalid.notAnArrayOfTwoFiniteNumbers
    );
  }

  if (!isIntegerNumber(dimensions[0]) || !isIntegerNumber(dimensions[1])) {
    return createValidationResult(
      false,
      gameboardDimensionsValidationMessages.invalid
        .notAnArrayOfTwoIntegerNumbers
    );
  }

  if (isNegativeNumber(dimensions[0]) || isNegativeNumber(dimensions[1])) {
    return createValidationResult(
      false,
      gameboardDimensionsValidationMessages.invalid
        .notAnArrayOfTwoPositiveIntegerNumbers
    );
  }

  if (isZero(dimensions[0]) || isZero(dimensions[1])) {
    return createValidationResult(
      false,
      gameboardDimensionsValidationMessages.invalid
        .notAnArrayOfTwoPositiveIntegerNumbers
    );
  }

  return createValidationResult(
    true,
    gameboardDimensionsValidationMessages.valid.default
  );
};

export const validateGameboardInputs = (dimensions) => {
  const gameboardDimensionsValidationResult =
    validateGameboardDimensions(dimensions);
  if (!gameboardDimensionsValidationResult.isValid) {
    return gameboardDimensionsValidationResult;
  }

  return createValidationResult(
    true,
    gameboardDimensionsValidationMessages.valid.default
  );
};

const validateGameboardCoordinates = (coordinates, dimensions) => {
  if (!hasValue(coordinates)) {
    return createValidationResult(
      false,
      gameboardCoordinatesValidationMessages.invalid.required
    );
  }

  if (!isArray(coordinates)) {
    return createValidationResult(
      false,
      gameboardCoordinatesValidationMessages.invalid.notAnArray
    );
  }

  if (coordinates.length !== 2) {
    return createValidationResult(
      false,
      gameboardCoordinatesValidationMessages.invalid.notAnArrayOfTwoElements
    );
  }

  const [row, column] = coordinates;

  if (!isNumber(row) || !isNumber(column)) {
    return createValidationResult(
      false,
      gameboardCoordinatesValidationMessages.invalid.notAnArrayOfTwoNumbers
    );
  }

  if (!isFiniteNumber(row) || !isFiniteNumber(column)) {
    return createValidationResult(
      false,
      gameboardCoordinatesValidationMessages.invalid
        .notAnArrayOfTwoFiniteNumbers
    );
  }

  if (!isIntegerNumber(row) || !isIntegerNumber(column)) {
    return createValidationResult(
      false,
      gameboardCoordinatesValidationMessages.invalid
        .notAnArrayOfTwoIntegerNumbers
    );
  }

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
    gameboardCoordinatesValidationMessages.valid.default
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
    gameboardCoordinatesValidationMessages.valid.default
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
    gameboardCoordinatesValidationMessages.valid.default
  );
};

export const validateGameboardShip = (ship) => {
  if (!hasValue(ship)) {
    return createValidationResult(
      false,
      gameboardShipValidationMessages.invalid.required
    );
  }

  if (!isObject(ship)) {
    return createValidationResult(
      false,
      gameboardShipValidationMessages.invalid.notAnObject
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

const validateGameboardDirection = (direction) => {
  if (!hasValue(direction)) {
    return createValidationResult(
      false,
      gameboardDirectionValidationMessages.invalid.required
    );
  }

  if (!isString(direction)) {
    return createValidationResult(
      false,
      gameboardDirectionValidationMessages.invalid.notAString
    );
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

export const createGameboardBoard = (dimensions) => {
  const [rows, columns] = dimensions;
  return Array.from({ length: rows }, () =>
    Array.from({ length: columns }, () => ({ hit: false, ship: null }))
  );
};
