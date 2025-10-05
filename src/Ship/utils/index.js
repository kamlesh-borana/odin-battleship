import {
  createValidationResult,
  hasValue,
  isFiniteNumber,
  isIntegerNumber,
  isNegativeNumber,
  isNumber,
  isZero,
} from "../../utils";
import { shipLengthValidationMessages } from "./constants";

const validateShipLength = (length) => {
  if (!hasValue(length)) {
    return createValidationResult(
      false,
      shipLengthValidationMessages.invalid.required
    );
  }

  if (!isNumber(length)) {
    return createValidationResult(
      false,
      shipLengthValidationMessages.invalid.notANumber
    );
  }

  if (!isFiniteNumber(length)) {
    return createValidationResult(
      false,
      shipLengthValidationMessages.invalid.notAFiniteNumber
    );
  }

  if (!isIntegerNumber(length)) {
    return createValidationResult(
      false,
      shipLengthValidationMessages.invalid.notAnIntegerNumber
    );
  }

  if (isNegativeNumber(length)) {
    return createValidationResult(
      false,
      shipLengthValidationMessages.invalid.isNegativeNumber
    );
  }

  if (isZero(length)) {
    return createValidationResult(
      false,
      shipLengthValidationMessages.invalid.isZero
    );
  }

  return createValidationResult(
    true,
    shipLengthValidationMessages.valid.default
  );
};

export const validateShipInputs = (length) => {
  const shipLengthValidationResult = validateShipLength(length);
  if (!shipLengthValidationResult.isValid) {
    return shipLengthValidationResult;
  }

  return createValidationResult(
    true,
    shipLengthValidationMessages.valid.default
  );
};
