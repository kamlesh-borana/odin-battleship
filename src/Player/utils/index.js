import {
  createValidationResult,
  hasValue,
  isObject,
  isString,
} from "../../utils";
import {
  playerGameboardValidationMessages,
  playerTypeValidationMessages,
  VALID_PLAYER_TYPES,
} from "./constants";

const validatePlayerType = (type) => {
  if (!hasValue(type)) {
    return createValidationResult(
      false,
      playerTypeValidationMessages.invalid.required
    );
  }

  if (!isString(type)) {
    return createValidationResult(
      false,
      playerTypeValidationMessages.invalid.notAString
    );
  }

  if (!VALID_PLAYER_TYPES.includes(type)) {
    return createValidationResult(
      false,
      playerTypeValidationMessages.invalid.notAValidType
    );
  }

  return createValidationResult(
    true,
    playerTypeValidationMessages.valid.default
  );
};

const validatePlayerGameboard = (gameboard) => {
  if (!hasValue(gameboard)) {
    return createValidationResult(
      false,
      playerGameboardValidationMessages.invalid.required
    );
  }

  if (!isObject(gameboard)) {
    return createValidationResult(
      false,
      playerGameboardValidationMessages.invalid.notAnObject
    );
  }

  return createValidationResult(
    true,
    playerGameboardValidationMessages.valid.default
  );
};

export const validatePlayerInputs = (type, gameboard) => {
  const playerTypeValidationResult = validatePlayerType(type);
  if (!playerTypeValidationResult.isValid) {
    return playerTypeValidationResult;
  }

  const playerGameboardValidationResult = validatePlayerGameboard(gameboard);
  if (!playerGameboardValidationResult.isValid) {
    return playerGameboardValidationResult;
  }

  return createValidationResult(
    true,
    playerTypeValidationMessages.valid.default
  );
};
