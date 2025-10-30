import { createValidationResult, hasProperty, isObject } from ".";
import { shipsValidationMessages } from "./constants";
import { validateIsArrayOfAtLeast1Elements } from "./validation";

export const validateShips = (
  ships,
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

    if (!hasProperty(shipPlacementInfo, "ship")) {
      return createValidationResult(
        false,
        validationMessagesObj.invalid.noShipPropertyInObject
      );
    }

    if (!hasProperty(shipPlacementInfo, "coordinates")) {
      return createValidationResult(
        false,
        validationMessagesObj.invalid.noCoordinatesPropertyInObject
      );
    }

    if (!hasProperty(shipPlacementInfo, "direction")) {
      return createValidationResult(
        false,
        validationMessagesObj.invalid.noDirectionPropertyInObject
      );
    }
  }

  return createValidationResult(true, validationMessagesObj.valid.default);
};
