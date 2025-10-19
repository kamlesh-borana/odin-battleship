import {
  createConstructorCallback,
  createMethodCallback,
  testArrayOfTwoIntegerNumbersError,
  testArrayOfTwoPositiveIntegerNumbersError,
  testHasValueError,
  testNullError,
} from "../../test-utils";
import {
  gameboardCoordinatesValidationMessages,
  gameboardDimensionsValidationMessages,
  gameboardDirectionValidationMessages,
  gameboardShipValidationMessages,
} from "../utils/constants";
import { DEFAULT_OUT_OF_BOUNDS_COORDINATES } from "./constants";

export const createMockShip = (length, options = {}) => {
  const { hitReturnValue = true, isSunkReturnValue = false } = options;
  return {
    length,
    hit: jest.fn().mockReturnValue(hitReturnValue),
    isSunk: jest.fn().mockReturnValue(isSunkReturnValue),
  };
};

export const testInvalidDimensionsError = (
  Gameboard,
  additionalArgs = [],
  errorMessagesObj = gameboardDimensionsValidationMessages.invalid
) => {
  const callback = createConstructorCallback(Gameboard, additionalArgs);

  testNullError("dimensions", callback, errorMessagesObj);
  testArrayOfTwoPositiveIntegerNumbersError(
    "dimensions",
    callback,
    errorMessagesObj
  );
};

export const testInvalidCoordinatesError = (
  gameboard,
  method,
  additionalArgs = [],
  errorMessagesObj = gameboardCoordinatesValidationMessages.invalid
) => {
  const callback = createMethodCallback(gameboard, method, additionalArgs);

  testHasValueError("coordinates", callback, errorMessagesObj);
  testArrayOfTwoIntegerNumbersError("coordinates", callback, errorMessagesObj);
};

export const testOutOfBoundsCoordinatesError = (
  gameboard,
  method,
  additionalArgs = [],
  outOfBoundsCoordinatesList = DEFAULT_OUT_OF_BOUNDS_COORDINATES,
  errorMessage = gameboardCoordinatesValidationMessages.invalid.outOfBounds
) => {
  const callback = createMethodCallback(gameboard, method, additionalArgs);

  it.each(outOfBoundsCoordinatesList)(
    `should throw an error when the coordinates %s is out of bounds on a ${gameboard.dimensions[0]}x${gameboard.dimensions[1]} gameboard`,
    (coordinates) => {
      expect(() => callback(coordinates)).toThrow(errorMessage);
    }
  );
};

export const testInvalidShipError = (
  gameboard,
  method,
  additionalArgs = [],
  errorMessagesObj = gameboardShipValidationMessages.invalid
) => {
  const callback = createMethodCallback(gameboard, method, additionalArgs);

  testHasValueError("ship", callback, errorMessagesObj);
  it.each([
    ["ship is not an object", "not an object", errorMessagesObj.notAnObject],
    [
      "the ship object does not have a length property",
      {},
      errorMessagesObj.noLengthProperty,
    ],
    [
      "the ship object has a length property that is not a number",
      { length: "1" },
      errorMessagesObj.lengthNotANumber,
    ],
    [
      "the ship object has a length property that is NaN",
      { length: NaN },
      errorMessagesObj.lengthNotANumber,
    ],
    [
      "the ship object has a length property that is not a finite number",
      { length: Infinity },
      errorMessagesObj.lengthNotAFiniteNumber,
    ],
    [
      "the ship object has a length property that is not an integer number",
      { length: 1.5 },
      errorMessagesObj.lengthNotAnIntegerNumber,
    ],
    [
      "the ship object has a length property that is a negative number",
      { length: -1 },
      errorMessagesObj.lengthIsNegativeNumber,
    ],
    [
      "the ship object has a length property that is zero",
      { length: 0 },
      errorMessagesObj.lengthIsZero,
    ],
    [
      "the ship object does not have a hit method",
      { length: 1 },
      errorMessagesObj.noHitMethod,
    ],
    [
      "the ship object has a hit method that is not a function",
      { length: 1, hit: "not a function" },
      errorMessagesObj.hitMethodNotAFunction,
    ],
    [
      "the ship object does not have a isSunk method",
      { length: 1, hit: () => true },
      errorMessagesObj.noIsSunkMethod,
    ],
    [
      "the ship object has a isSunk method that is not a function",
      { length: 1, hit: () => true, isSunk: "not a function" },
      errorMessagesObj.isSunkMethodNotAFunction,
    ],
  ])("should throw an error if %s", (_, ship, errorMessage) => {
    expect(() => callback(ship)).toThrow(errorMessage);
  });
};

export const testInvalidDirectionError = (
  gameboard,
  method,
  additionalArgs = [],
  errorMessagesObj = gameboardDirectionValidationMessages.invalid
) => {
  const callback = createMethodCallback(gameboard, method, additionalArgs);

  testHasValueError("direction", callback, errorMessagesObj);
  it.each([
    ["direction is not a string", 1, errorMessagesObj.notAString],
    [
      "direction is not a valid direction",
      "not a valid direction",
      errorMessagesObj.notAValidDirection,
    ],
  ])("should throw an error if %s", (_, direction, errorMessage) => {
    expect(() => callback(direction)).toThrow(errorMessage);
  });
};
