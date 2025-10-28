import { createValidationResult, hasProperty, isObject } from ".";
import { shipsValidationMessages } from "./constants";
import {
  validateGameboardCoordinates,
  validateGameboardDirection,
} from "./gameboard";
import { validateShip } from "./ship";
import { validateIsArrayOfAtLeast1Elements } from "./validation";

export const validateShips = (
  ships,
  dimensions,
  validationMessagesObj = shipsValidationMessages
) => {
  const isArrayOfAtLeast1ElementsValidationResult =
    validateIsArrayOfAtLeast1Elements(ships, validationMessagesObj);
  if (!isArrayOfAtLeast1ElementsValidationResult.isValid) {
    return isArrayOfAtLeast1ElementsValidationResult;
  }

  for (const shipPlacementInfo of ships) {
    if (!isObject(shipPlacementInfo)) {
      return createValidationResult(
        false,
        validationMessagesObj.invalid.notAnArrayOfObjects
      );
    }

    // Validate ship
    if (!hasProperty(shipPlacementInfo, "ship")) {
      return createValidationResult(
        false,
        validationMessagesObj.invalid.noShipPropertyInObject
      );
    }

    const shipValidationResult = validateShip(
      shipPlacementInfo.ship,
      validationMessagesObj.ship
    );
    if (!shipValidationResult.isValid) {
      return shipValidationResult;
    }

    // Validate coordinates
    if (!hasProperty(shipPlacementInfo, "coordinates")) {
      return createValidationResult(
        false,
        validationMessagesObj.invalid.noCoordinatesPropertyInObject
      );
    }

    const gameboardCoordinatesValidationResult = validateGameboardCoordinates(
      shipPlacementInfo.coordinates,
      dimensions,
      validationMessagesObj.gameboardCoordinates
    );
    if (!gameboardCoordinatesValidationResult.isValid) {
      return gameboardCoordinatesValidationResult;
    }

    // Validate direction
    if (!hasProperty(shipPlacementInfo, "direction")) {
      return createValidationResult(
        false,
        validationMessagesObj.invalid.noDirectionPropertyInObject
      );
    }

    const gameboardDirectionValidationResult = validateGameboardDirection(
      shipPlacementInfo.direction,
      validationMessagesObj.gameboardDirection
    );
    if (!gameboardDirectionValidationResult.isValid) {
      return gameboardDirectionValidationResult;
    }
  }

  return createValidationResult(true, validationMessagesObj.valid.default);
};
