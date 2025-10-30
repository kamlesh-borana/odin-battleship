import { createValidationResult } from ".";
import { playerTypeValidationMessages, VALID_PLAYER_TYPES } from "./constants";
import { validateIsString } from "./validation";

export const validatePlayerType = (
  type,
  validationMessagesObj = playerTypeValidationMessages
) => {
  const isStringValidationResult = validateIsString(
    type,
    validationMessagesObj
  );
  if (!isStringValidationResult.isValid) {
    return isStringValidationResult;
  }

  const lowerCaseType = type.toLowerCase();
  if (!VALID_PLAYER_TYPES.includes(lowerCaseType)) {
    return createValidationResult(
      false,
      validationMessagesObj.invalid.notAValidType
    );
  }

  return createValidationResult(true, validationMessagesObj.valid.default);
};
