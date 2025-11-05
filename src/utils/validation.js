import {
  createValidationResult,
  isArray,
  isBoolean,
  isEmptyString,
  isFiniteNumber,
  isFunction,
  isIntegerNumber,
  isNegativeNumber,
  isNull,
  isNumber,
  isObject,
  isPositiveNumber,
  isString,
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

export const validateIsArray = (value, validationMessagesObj) => {
  const hasValueValidationResult = validateHasValue(
    value,
    validationMessagesObj
  );
  if (!hasValueValidationResult.isValid) {
    return hasValueValidationResult;
  }

  if (!isArray(value)) {
    return createValidationResult(
      false,
      validationMessagesObj.invalid.notAnArray
    );
  }

  return createValidationResult(true, validationMessagesObj.valid.default);
};

export const validateIsArrayOfTwoElements = (value, validationMessagesObj) => {
  const isArrayValidationResult = validateIsArray(value, validationMessagesObj);
  if (!isArrayValidationResult.isValid) {
    return isArrayValidationResult;
  }

  if (value.length !== 2) {
    return createValidationResult(
      false,
      validationMessagesObj.invalid.notAnArrayOfTwoElements
    );
  }

  return createValidationResult(true, validationMessagesObj.valid.default);
};

export const validateIsArrayOfTwoNumbers = (value, validationMessagesObj) => {
  const isArrayOfTwoElementsValidationResult = validateIsArrayOfTwoElements(
    value,
    validationMessagesObj
  );
  if (!isArrayOfTwoElementsValidationResult.isValid) {
    return isArrayOfTwoElementsValidationResult;
  }

  if (!value.every((element) => isNumber(element))) {
    return createValidationResult(
      false,
      validationMessagesObj.invalid.notAnArrayOfTwoNumbers
    );
  }

  return createValidationResult(true, validationMessagesObj.valid.default);
};

export const validateIsArrayOfTwoFiniteNumbers = (
  value,
  validationMessagesObj
) => {
  const isArrayOfTwoNumbersValidationResult = validateIsArrayOfTwoNumbers(
    value,
    validationMessagesObj
  );
  if (!isArrayOfTwoNumbersValidationResult.isValid) {
    return isArrayOfTwoNumbersValidationResult;
  }

  if (!value.every((element) => isFiniteNumber(element))) {
    return createValidationResult(
      false,
      validationMessagesObj.invalid.notAnArrayOfTwoFiniteNumbers
    );
  }

  return createValidationResult(true, validationMessagesObj.valid.default);
};

export const validateIsArrayOfTwoIntegerNumbers = (
  value,
  validationMessagesObj
) => {
  const isArrayOfTwoFiniteNumbersValidationResult =
    validateIsArrayOfTwoFiniteNumbers(value, validationMessagesObj);
  if (!isArrayOfTwoFiniteNumbersValidationResult.isValid) {
    return isArrayOfTwoFiniteNumbersValidationResult;
  }

  if (!value.every((element) => isIntegerNumber(element))) {
    return createValidationResult(
      false,
      validationMessagesObj.invalid.notAnArrayOfTwoIntegerNumbers
    );
  }

  return createValidationResult(true, validationMessagesObj.valid.default);
};

export const validateIsArrayOfTwoPositiveIntegerNumbers = (
  value,
  validationMessagesObj
) => {
  const isArrayOfTwoIntegerNumbersValidationResult =
    validateIsArrayOfTwoIntegerNumbers(value, validationMessagesObj);
  if (!isArrayOfTwoIntegerNumbersValidationResult.isValid) {
    return isArrayOfTwoIntegerNumbersValidationResult;
  }

  if (!value.every((element) => isPositiveNumber(element))) {
    return createValidationResult(
      false,
      validationMessagesObj.invalid.notAnArrayOfTwoPositiveIntegerNumbers
    );
  }

  return createValidationResult(true, validationMessagesObj.valid.default);
};

export const validateIsObject = (value, validationMessagesObj) => {
  const hasValueValidationResult = validateHasValue(
    value,
    validationMessagesObj
  );
  if (!hasValueValidationResult.isValid) {
    return hasValueValidationResult;
  }

  if (!isObject(value)) {
    return createValidationResult(
      false,
      validationMessagesObj.invalid.notAnObject
    );
  }

  return createValidationResult(true, validationMessagesObj.valid.default);
};

export const validateIsString = (value, validationMessagesObj) => {
  const hasValueValidationResult = validateHasValue(
    value,
    validationMessagesObj
  );
  if (!hasValueValidationResult.isValid) {
    return hasValueValidationResult;
  }

  if (!isString(value)) {
    return createValidationResult(
      false,
      validationMessagesObj.invalid.notAString
    );
  }

  return createValidationResult(true, validationMessagesObj.valid.default);
};

export const validateIsNotAnEmptyString = (value, validationMessagesObj) => {
  const isStringValidationResult = validateIsString(
    value,
    validationMessagesObj
  );
  if (!isStringValidationResult.isValid) {
    return isStringValidationResult;
  }

  if (isEmptyString(value)) {
    return createValidationResult(
      false,
      validationMessagesObj.invalid.isEmptyString
    );
  }

  return createValidationResult(true, validationMessagesObj.valid.default);
};

export const validateIsArrayOfAtLeast1Elements = (
  value,
  validationMessagesObj
) => {
  const isArrayValidationResult = validateIsArray(value, validationMessagesObj);
  if (!isArrayValidationResult.isValid) {
    return isArrayValidationResult;
  }

  if (value.length < 1) {
    return createValidationResult(
      false,
      validationMessagesObj.invalid.notAnArrayOfAtLeast1Element
    );
  }

  return createValidationResult(true, validationMessagesObj.valid.default);
};

export const validateIsArrayOfAtLeast2Elements = (
  value,
  validationMessagesObj
) => {
  const isArrayValidationResult = validateIsArray(value, validationMessagesObj);
  if (!isArrayValidationResult.isValid) {
    return isArrayValidationResult;
  }

  if (value.length < 2) {
    return createValidationResult(
      false,
      validationMessagesObj.invalid.notAnArrayOfAtLeast2Elements
    );
  }

  return createValidationResult(true, validationMessagesObj.valid.default);
};

export const validateIsBoolean = (value, validationMessagesObj) => {
  const hasValueValidationResult = validateHasValue(
    value,
    validationMessagesObj
  );
  if (!hasValueValidationResult.isValid) {
    return hasValueValidationResult;
  }

  if (!isBoolean(value)) {
    return createValidationResult(
      false,
      validationMessagesObj.invalid.notABoolean
    );
  }

  return createValidationResult(true, validationMessagesObj.valid.default);
};

export const validateIsFunction = (value, validationMessagesObj) => {
  const hasValueValidationResult = validateHasValue(
    value,
    validationMessagesObj
  );
  if (!hasValueValidationResult.isValid) {
    return hasValueValidationResult;
  }

  if (!isFunction(value)) {
    return createValidationResult(
      false,
      validationMessagesObj.invalid.notAFunction
    );
  }

  return createValidationResult(true, validationMessagesObj.valid.default);
};
