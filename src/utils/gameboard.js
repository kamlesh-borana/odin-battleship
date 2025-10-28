import { createValidationResult, hasProperty, isFunction } from ".";
import {
  gameboardCoordinatesValidationMessages,
  gameboardDimensionsValidationMessages,
  gameboardDirectionValidationMessages,
  gameboardValidationMessages,
  VALID_GAMEBOARD_DIRECTIONS,
} from "./constants";
import {
  validateIsArrayOfTwoIntegerNumbers,
  validateIsArrayOfTwoPositiveIntegerNumbers,
  validateIsObject,
  validateIsString,
} from "./validation";

export const validateGameboardCoordinates = (
  coordinates,
  dimensions,
  validationMessagesObj = gameboardCoordinatesValidationMessages
) => {
  const isArrayOfTwoIntegerNumbersValidationResult =
    validateIsArrayOfTwoIntegerNumbers(coordinates, validationMessagesObj);
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
      validationMessagesObj.invalid.outOfBounds
    );
  }

  return createValidationResult(true, validationMessagesObj.valid.default);
};

export const validateGameboardDirection = (
  direction,
  validationMessagesObj = gameboardDirectionValidationMessages
) => {
  const isStringValidationResult = validateIsString(
    direction,
    validationMessagesObj
  );
  if (!isStringValidationResult.isValid) {
    return isStringValidationResult;
  }

  const lowerCaseDirection = direction.toLowerCase();
  if (!VALID_GAMEBOARD_DIRECTIONS.includes(lowerCaseDirection)) {
    return createValidationResult(
      false,
      validationMessagesObj.invalid.notAValidDirection
    );
  }

  return createValidationResult(true, validationMessagesObj.valid.default);
};

export const validateGameboardDimensions = (
  dimensions,
  validationMessagesObj = gameboardDimensionsValidationMessages
) => {
  const validationResult = validateIsArrayOfTwoPositiveIntegerNumbers(
    dimensions,
    validationMessagesObj
  );
  return validationResult;
};

export const validateGameboard = (
  gameboard,
  validationMessagesObj = gameboardValidationMessages
) => {
  const isObjectValidationResult = validateIsObject(
    gameboard,
    validationMessagesObj
  );
  if (!isObjectValidationResult.isValid) {
    return isObjectValidationResult;
  }

  if (!hasProperty(gameboard, "dimensions")) {
    return createValidationResult(
      false,
      validationMessagesObj.invalid.noDimensionsProperty
    );
  }

  const gameboardDimensionsValidationResult = validateGameboardDimensions(
    gameboard.dimensions,
    validationMessagesObj.gameboardDimensions
  );
  if (!gameboardDimensionsValidationResult.isValid) {
    return gameboardDimensionsValidationResult;
  }

  if (!hasProperty(gameboard, "placeShip")) {
    return createValidationResult(
      false,
      validationMessagesObj.invalid.noPlaceShipMethod
    );
  }

  if (!isFunction(gameboard.placeShip)) {
    return createValidationResult(
      false,
      validationMessagesObj.invalid.placeShipMethodNotAFunction
    );
  }

  if (!hasProperty(gameboard, "getShipAt")) {
    return createValidationResult(
      false,
      validationMessagesObj.invalid.noGetShipAtMethod
    );
  }

  if (!isFunction(gameboard.getShipAt)) {
    return createValidationResult(
      false,
      validationMessagesObj.invalid.getShipAtMethodNotAFunction
    );
  }

  if (!hasProperty(gameboard, "getBoard")) {
    return createValidationResult(
      false,
      validationMessagesObj.invalid.noGetBoardMethod
    );
  }

  if (!isFunction(gameboard.getBoard)) {
    return createValidationResult(
      false,
      validationMessagesObj.invalid.getBoardMethodNotAFunction
    );
  }

  return createValidationResult(true, validationMessagesObj.valid.default);
};
