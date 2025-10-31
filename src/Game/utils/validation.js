import {
  createValidationResult,
  hasProperty,
  isFunction,
  isObject,
} from "../../utils";
import { validatePlayerType } from "../../utils/player";
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

  for (const player of players) {
    if (!hasProperty(player, "id")) {
      return createValidationResult(
        false,
        validationMessagesObj.invalid.noIdProperty
      );
    }

    if (!hasProperty(player, "type")) {
      return createValidationResult(
        false,
        validationMessagesObj.invalid.noTypeProperty
      );
    }

    const playerTypeValidationResult = validatePlayerType(
      player.type,
      validationMessagesObj.playerType
    );
    if (!playerTypeValidationResult.isValid) {
      return playerTypeValidationResult;
    }

    if (!hasProperty(player, "getShipAt")) {
      return createValidationResult(
        false,
        validationMessagesObj.invalid.noGetShipAtMethod
      );
    }

    if (!isFunction(player.getShipAt)) {
      return createValidationResult(
        false,
        validationMessagesObj.invalid.getShipAtMethodNotAFunction
      );
    }

    if (!hasProperty(player, "addShip")) {
      return createValidationResult(
        false,
        validationMessagesObj.invalid.noAddShipMethod
      );
    }

    if (!isFunction(player.addShip)) {
      return createValidationResult(
        false,
        validationMessagesObj.invalid.addShipMethodNotAFunction
      );
    }

    if (!hasProperty(player, "addShips")) {
      return createValidationResult(
        false,
        validationMessagesObj.invalid.noAddShipsMethod
      );
    }

    if (!isFunction(player.addShips)) {
      return createValidationResult(
        false,
        validationMessagesObj.invalid.addShipsMethodNotAFunction
      );
    }

    if (!hasProperty(player, "receiveAttack")) {
      return createValidationResult(
        false,
        validationMessagesObj.invalid.noReceiveAttackMethod
      );
    }

    if (!isFunction(player.receiveAttack)) {
      return createValidationResult(
        false,
        validationMessagesObj.invalid.receiveAttackMethodNotAFunction
      );
    }

    if (!hasProperty(player, "getBoard")) {
      return createValidationResult(
        false,
        validationMessagesObj.invalid.noGetBoardMethod
      );
    }

    if (!isFunction(player.getBoard)) {
      return createValidationResult(
        false,
        validationMessagesObj.invalid.getBoardMethodNotAFunction
      );
    }
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
