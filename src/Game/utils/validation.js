import { createValidationResult, isObject } from "../../utils";
import { validateIsArrayOfAtLeast2Elements } from "../../utils/validation";
import {
  gameInputsValidationMessages,
  playersListValidationMessages,
} from "./constants";

const validatePlayersList = (
  players,
  validationMessagesObj = playersListValidationMessages
) => {
  const isArrayOfAtLeast2ElementsValidationResult =
    validateIsArrayOfAtLeast2Elements(players, validationMessagesObj);
  if (!isArrayOfAtLeast2ElementsValidationResult.isValid) {
    return isArrayOfAtLeast2ElementsValidationResult;
  }

  if (!players.every((player) => isObject(player))) {
    return createValidationResult(
      false,
      validationMessagesObj.invalid.notAnArrayOfObjects
    );
  }

  return createValidationResult(true, validationMessagesObj.valid.default);
};

export const validateGameInputs = (players) => {
  const playersListValidationResult = validatePlayersList(
    players,
    playersListValidationMessages
  );
  if (!playersListValidationResult.isValid) {
    return playersListValidationResult;
  }

  return createValidationResult(
    true,
    gameInputsValidationMessages.valid.default
  );
};
