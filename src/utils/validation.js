import {
  createValidationResult,
  isFiniteNumber,
  isIntegerNumber,
  isNegativeNumber,
  isNull,
  isNumber,
  isUndefined,
  isZero,
} from "../utils";

export const validateHasValue = (value, validationMessagesObj) => {
  if (isUndefined(value)) {
    return createValidationResult(
      false,
      validationMessagesObj.invalid.isUndefined
    );
  }

  if (isNull(value)) {
    return createValidationResult(false, validationMessagesObj.invalid.isNull);
  }

  return createValidationResult(true, validationMessagesObj.valid.default);
};

export const validateIsNumber = (value, validationMessagesObj) => {
  const hasValueValidationResult = validateHasValue(
    value,
    validationMessagesObj
  );
  if (!hasValueValidationResult.isValid) {
    return hasValueValidationResult;
  }

  if (!isNumber(value)) {
    return createValidationResult(
      false,
      validationMessagesObj.invalid.notANumber
    );
  }

  return createValidationResult(true, validationMessagesObj.valid.default);
};

export const validateIsFiniteNumber = (value, validationMessagesObj) => {
  const isNumberValidationResult = validateIsNumber(
    value,
    validationMessagesObj
  );
  if (!isNumberValidationResult.isValid) {
    return isNumberValidationResult;
  }

  if (!isFiniteNumber(value)) {
    return createValidationResult(
      false,
      validationMessagesObj.invalid.notAFiniteNumber
    );
  }

  return createValidationResult(true, validationMessagesObj.valid.default);
};

export const validateIsIntegerNumber = (value, validationMessagesObj) => {
  const isFiniteNumberValidationResult = validateIsFiniteNumber(
    value,
    validationMessagesObj
  );
  if (!isFiniteNumberValidationResult.isValid) {
    return isFiniteNumberValidationResult;
  }

  if (!isIntegerNumber(value)) {
    return createValidationResult(
      false,
      validationMessagesObj.invalid.notAnIntegerNumber
    );
  }

  return createValidationResult(true, validationMessagesObj.valid.default);
};

export const validateIsNotANegativeIntegerNumber = (
  value,
  validationMessagesObj
) => {
  const isIntegerNumberValidationResult = validateIsIntegerNumber(
    value,
    validationMessagesObj
  );
  if (!isIntegerNumberValidationResult.isValid) {
    return isIntegerNumberValidationResult;
  }

  if (isNegativeNumber(value)) {
    return createValidationResult(
      false,
      validationMessagesObj.invalid.isNegativeNumber
    );
  }

  return createValidationResult(true, validationMessagesObj.valid.default);
};

export const validateIsPositiveIntegerNumber = (
  value,
  validationMessagesObj
) => {
  const isNotANegativeIntegerNumberValidationResult =
    validateIsNotANegativeIntegerNumber(value, validationMessagesObj);
  if (!isNotANegativeIntegerNumberValidationResult.isValid) {
    return isNotANegativeIntegerNumberValidationResult;
  }

  if (isZero(value)) {
    return createValidationResult(false, validationMessagesObj.invalid.isZero);
  }

  return createValidationResult(true, validationMessagesObj.valid.default);
};
