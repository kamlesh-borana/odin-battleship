import { createValidationResult } from "../../utils";
import { shipLengthValidationMessages } from "../../utils/constants";
import { validateShipLength } from "../../utils/ship";
import { shipInputsValidationMessages } from "./constants";

export const validateShipInputs = (length) => {
  const shipLengthValidationResult = validateShipLength(
    length,
    shipLengthValidationMessages
  );
  if (!shipLengthValidationResult.isValid) {
    return shipLengthValidationResult;
  }

  return createValidationResult(
    true,
    shipInputsValidationMessages.valid.default
  );
};
