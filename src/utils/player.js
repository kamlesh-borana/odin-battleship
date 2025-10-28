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

  if (!VALID_PLAYER_TYPES.includes(type)) {
    return createValidationResult(
      false,
      validationMessagesObj.invalid.notAValidType
    );
  }

  return createValidationResult(true, validationMessagesObj.valid.default);
};
