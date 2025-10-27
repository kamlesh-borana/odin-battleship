import { createValidationResult } from ".";
import {
  gameboardCoordinatesValidationMessages,
  gameboardDirectionValidationMessages,
  VALID_GAMEBOARD_DIRECTIONS,
} from "./constants";
import {
  validateIsArrayOfTwoIntegerNumbers,
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
