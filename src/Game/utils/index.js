import {
  createValidationResult,
  hasValue,
  isArray,
  isObject,
} from "../../utils";
import { gamePlayersValidationMessages } from "./constants";

const validateGamePlayers = (players) => {
  if (!hasValue(players)) {
    return createValidationResult(
      false,
      gamePlayersValidationMessages.invalid.required
    );
  }

  if (!isArray(players)) {
    return createValidationResult(
      false,
      gamePlayersValidationMessages.invalid.notAnArray
    );
  }

  if (players.length < 2) {
    return createValidationResult(
      false,
      gamePlayersValidationMessages.invalid.notAnArrayOfAtLeast2Elements
    );
  }

  if (!players.every((player) => isObject(player))) {
    return createValidationResult(
      false,
      gamePlayersValidationMessages.invalid.notAnArrayOfPlayerObjects
    );
  }

  return createValidationResult(
    true,
    gamePlayersValidationMessages.valid.default
  );
};

export const validateGameInputs = (players) => {
  const gamePlayersValidationResult = validateGamePlayers(players);
  if (!gamePlayersValidationResult.isValid) {
    return gamePlayersValidationResult;
  }

  return createValidationResult(
    true,
    gamePlayersValidationMessages.valid.default
  );
};
