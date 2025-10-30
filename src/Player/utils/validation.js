import { createValidationResult } from "../../utils";
import {
  gameboardValidationMessages,
  playerTypeValidationMessages,
  shipsValidationMessages,
} from "../../utils/constants";
import { validateShips } from "../../utils/game";
import { validateGameboard } from "../../utils/gameboard";
import { validatePlayerType } from "../../utils/player";
import {
  playerAddShipsInputsValidationMessages,
  playerInputsValidationMessages,
} from "./constants";

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

export const validateAddShipsInputs = (ships) => {
  const shipsValidationResult = validateShips(ships, shipsValidationMessages);
  if (!shipsValidationResult.isValid) {
    return shipsValidationResult;
  }

  return createValidationResult(
    true,
    playerAddShipsInputsValidationMessages.valid.default
  );
};
