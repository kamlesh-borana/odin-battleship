import { createValidationResult, hasProperty, isFunction } from ".";
import {
  playerTypeValidationMessages,
  playerValidationMessages,
  VALID_PLAYER_TYPES,
} from "./constants";
import { validateIsObject, validateIsString } from "./validation";

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

export const validatePlayer = (
  player,
  validationMessagesObj = playerValidationMessages
) => {
  const isObjectValidationResult = validateIsObject(
    player,
    validationMessagesObj
  );
  if (!isObjectValidationResult.isValid) {
    return isObjectValidationResult;
  }

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
    validationMessagesObj.type
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

  if (!hasProperty(player, "allShipsSunk")) {
    return createValidationResult(
      false,
      validationMessagesObj.invalid.noAllShipsSunkMethod
    );
  }

  if (!isFunction(player.allShipsSunk)) {
    return createValidationResult(
      false,
      validationMessagesObj.invalid.allShipsSunkMethodNotAFunction
    );
  }

  return createValidationResult(true, validationMessagesObj.valid.default);
};
