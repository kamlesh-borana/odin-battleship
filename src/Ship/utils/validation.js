import { createValidationResult } from "../../utils";
import { validateIsPositiveIntegerNumber } from "../../utils/validation";
import {
  shipInputsValidationMessages,
  shipLengthValidationMessages,
} from "./constants";

const validateShipLength = (length) => {
  const validationResult = validateIsPositiveIntegerNumber(
    length,
    shipLengthValidationMessages
  );
  return validationResult;
};

export const validateShipInputs = (length) => {
  const shipLengthValidationResult = validateShipLength(length);
  if (!shipLengthValidationResult.isValid) {
    return shipLengthValidationResult;
  }

  return createValidationResult(
    true,
    shipInputsValidationMessages.valid.default
  );
};
