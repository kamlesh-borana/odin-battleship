import { createValidationResult, hasProperty, isFunction } from ".";
import {
  shipHitsValidationMessages,
  shipLengthValidationMessages,
  shipValidationMessages,
} from "./constants";
import {
  validateIsNotANegativeIntegerNumber,
  validateIsObject,
  validateIsPositiveIntegerNumber,
} from "./validation";

export const validateShipLength = (
  length,
  validationMessagesObj = shipLengthValidationMessages
) => {
  const validationResult = validateIsPositiveIntegerNumber(
    length,
    validationMessagesObj
  );
  return validationResult;
};

export const validateShipHits = (
  hits,
  length,
  validationMessagesObj = shipHitsValidationMessages
) => {
  const isNegativeIntegerNumberValidationResult =
    validateIsNotANegativeIntegerNumber(hits, validationMessagesObj);
  if (!isNegativeIntegerNumberValidationResult.isValid) {
    return isNegativeIntegerNumberValidationResult;
  }

  if (hits > length) {
    return createValidationResult(
      false,
      validationMessagesObj.invalid.isGreaterThanLength
    );
  }

  return createValidationResult(true, validationMessagesObj.valid.default);
};

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

  if (!hasProperty(ship, "id")) {
    return createValidationResult(
      false,
      validationMessagesObj.invalid.noIdProperty
    );
  }

  if (!hasProperty(ship, "length")) {
    return createValidationResult(
      false,
      validationMessagesObj.invalid.noLengthProperty
    );
  }

  const lengthValidationResult = validateShipLength(
    ship.length,
    validationMessagesObj.length
  );
  if (!lengthValidationResult.isValid) {
    return lengthValidationResult;
  }

  if (!hasProperty(ship, "hits")) {
    return createValidationResult(
      false,
      validationMessagesObj.invalid.noHitsProperty
    );
  }

  const hitsValidationResult = validateShipHits(
    ship.hits,
    ship.length,
    validationMessagesObj.hits
  );
  if (!hitsValidationResult.isValid) {
    return hitsValidationResult;
  }

  if (!hasProperty(ship, "hit")) {
    return createValidationResult(
      false,
      validationMessagesObj.invalid.noHitMethod
    );
  }

  if (!isFunction(ship.hit)) {
    return createValidationResult(
      false,
      validationMessagesObj.invalid.hitMethodNotAFunction
    );
  }

  if (!hasProperty(ship, "isSunk")) {
    return createValidationResult(
      false,
      validationMessagesObj.invalid.noIsSunkMethod
    );
  }

  if (!isFunction(ship.isSunk)) {
    return createValidationResult(
      false,
      validationMessagesObj.invalid.isSunkMethodNotAFunction
    );
  }

  return createValidationResult(true, validationMessagesObj.valid.default);
};
