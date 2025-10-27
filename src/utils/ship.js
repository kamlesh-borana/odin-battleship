import {
  createValidationResult,
  hasValue,
  isFiniteNumber,
  isFunction,
  isIntegerNumber,
  isNegativeNumber,
  isNumber,
  isZero,
} from ".";
import { shipValidationMessages } from "./constants";
import { validateIsObject } from "./validation";

export const validateShip = (
  ship,
  validationMessagesObj = shipValidationMessages
) => {
  const isObjectValidationResult = validateIsObject(
    ship,
    validationMessagesObj
  );
  if (!isObjectValidationResult.isValid) {
    return isObjectValidationResult;
  }

  if (!hasValue(ship.id)) {
    return createValidationResult(
      false,
      shipValidationMessages.invalid.noIdProperty
    );
  }

  if (!hasValue(ship.length)) {
    return createValidationResult(
      false,
      shipValidationMessages.invalid.noLengthProperty
    );
  }

  if (!isNumber(ship.length)) {
    return createValidationResult(
      false,
      shipValidationMessages.invalid.lengthNotANumber
    );
  }

  if (!isFiniteNumber(ship.length)) {
    return createValidationResult(
      false,
      shipValidationMessages.invalid.lengthNotAFiniteNumber
    );
  }

  if (!isIntegerNumber(ship.length)) {
    return createValidationResult(
      false,
      shipValidationMessages.invalid.lengthNotAnIntegerNumber
    );
  }

  if (isNegativeNumber(ship.length)) {
    return createValidationResult(
      false,
      shipValidationMessages.invalid.lengthIsNegativeNumber
    );
  }

  if (isZero(ship.length)) {
    return createValidationResult(
      false,
      shipValidationMessages.invalid.lengthIsZero
    );
  }

  if (!hasValue(ship.hit)) {
    return createValidationResult(
      false,
      shipValidationMessages.invalid.noHitMethod
    );
  }

  if (!isFunction(ship.hit)) {
    return createValidationResult(
      false,
      shipValidationMessages.invalid.hitMethodNotAFunction
    );
  }

  if (!hasValue(ship.isSunk)) {
    return createValidationResult(
      false,
      shipValidationMessages.invalid.noIsSunkMethod
    );
  }

  if (!isFunction(ship.isSunk)) {
    return createValidationResult(
      false,
      shipValidationMessages.invalid.isSunkMethodNotAFunction
    );
  }

  return createValidationResult(true, shipValidationMessages.valid.default);
};
