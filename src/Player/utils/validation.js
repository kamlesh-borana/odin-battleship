import { createValidationResult } from "../../utils";
import {
  gameboardValidationMessages,
  playerTypeValidationMessages,
} from "../../utils/constants";
import { validateGameboard } from "../../utils/gameboard";
import { validatePlayerType } from "../../utils/player";
import { playerInputsValidationMessages } from "./constants";

export const validatePlayerInputs = (type, gameboard) => {
  const playerTypeValidationResult = validatePlayerType(
    type,
    playerTypeValidationMessages
  );
  if (!playerTypeValidationResult.isValid) {
    return playerTypeValidationResult;
  }

  const gameboardValidationResult = validateGameboard(
    gameboard,
    gameboardValidationMessages
  );
  if (!gameboardValidationResult.isValid) {
    return gameboardValidationResult;
  }

  return createValidationResult(
    true,
    playerInputsValidationMessages.valid.default
  );
};
