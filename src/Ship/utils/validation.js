import { createValidationResult } from "../../utils";
import {
  shipLengthValidationMessages,
  shipNameValidationMessages,
} from "../../utils/constants";
import { validateShipLength, validateShipName } from "../../utils/ship";
import { shipInputsValidationMessages } from "./constants";

export const validateShipInputs = (length, name) => {
  const shipLengthValidationResult = validateShipLength(
    length,
    shipLengthValidationMessages
  );
  if (!shipLengthValidationResult.isValid) {
    return shipLengthValidationResult;
  }

  const shipNameValidationResult = validateShipName(
    name,
    shipNameValidationMessages
  );
  if (!shipNameValidationResult.isValid) {
    return shipNameValidationResult;
  }

  return createValidationResult(
    true,
    shipInputsValidationMessages.valid.default
  );
};
