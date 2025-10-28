import { createValidationResult } from "../../utils";
import {
  gameboardCoordinatesValidationMessages,
  gameboardValidationMessages,
  playerTypeValidationMessages,
  shipsValidationMessages,
} from "../../utils/constants";
import { validateShips } from "../../utils/game";
import {
  validateGameboard,
  validateGameboardCoordinates,
} from "../../utils/gameboard";
import { validatePlayerType } from "../../utils/player";
import {
  playerAddShipsInputsValidationMessages,
  playerGetShipAtInputsValidationMessages,
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

export const validateGetShipAtInputs = (coordinates, dimensions) => {
  const gameboardCoordinatesValidationResult = validateGameboardCoordinates(
    coordinates,
    dimensions,
    gameboardCoordinatesValidationMessages
  );
  if (!gameboardCoordinatesValidationResult.isValid) {
    return gameboardCoordinatesValidationResult;
  }

  return createValidationResult(
    true,
    playerGetShipAtInputsValidationMessages.valid.default
  );
};

export const validateAddShipsInputs = (ships, dimensions) => {
  const shipsValidationResult = validateShips(
    ships,
    dimensions,
    shipsValidationMessages
  );
  if (!shipsValidationResult.isValid) {
    return shipsValidationResult;
  }

  return createValidationResult(
    true,
    playerAddShipsInputsValidationMessages.valid.default
  );
};
