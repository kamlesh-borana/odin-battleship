import { createUniqueId } from "../utils";
import { testIsNotAnObjectError } from "./validation";

export const createMockShip = (length, options = {}) => {
  const {
    id = createUniqueId(),
    hitReturnValue = true,
    isSunkReturnValue = false,
  } = options;
  return {
    id,
    length,
    hit: jest.fn().mockReturnValue(hitReturnValue),
    isSunk: jest.fn().mockReturnValue(isSunkReturnValue),
  };
};

export const testInvalidShipError = (
  argumentName,
  callback,
  errorMessagesObj
) => {
  testIsNotAnObjectError(argumentName, callback, errorMessagesObj);

  it.each([
    ["does not have an id property", {}, errorMessagesObj.noIdProperty],
    [
      "does not have a length property",
      { id: "123" },
      errorMessagesObj.noLengthProperty,
    ],
    [
      "has a length property that is not a number",
      { id: "123", length: "1" },
      errorMessagesObj.lengthNotANumber,
    ],
    [
      "has a length property that is NaN",
      { id: "123", length: NaN },
      errorMessagesObj.lengthNotANumber,
    ],
    [
      "has a length property that is not a finite number",
      { id: "123", length: Infinity },
      errorMessagesObj.lengthNotAFiniteNumber,
    ],
    [
      "has a length property that is not an integer number",
      { id: "123", length: 1.5 },
      errorMessagesObj.lengthNotAnIntegerNumber,
    ],
    [
      "has a length property that is a negative number",
      { id: "123", length: -1 },
      errorMessagesObj.lengthIsNegativeNumber,
    ],
    [
      "has a length property that is zero",
      { id: "123", length: 0 },
      errorMessagesObj.lengthIsZero,
    ],
    [
      "does not have a hit method",
      { id: "123", length: 1 },
      errorMessagesObj.noHitMethod,
    ],
    [
      "has a hit method that is not a function",
      { id: "123", length: 1, hit: "not a function" },
      errorMessagesObj.hitMethodNotAFunction,
    ],
    [
      "does not have a isSunk method",
      { id: "123", length: 1, hit: () => true },
      errorMessagesObj.noIsSunkMethod,
    ],
    [
      "has a isSunk method that is not a function",
      { id: "123", length: 1, hit: () => true, isSunk: "not a function" },
      errorMessagesObj.isSunkMethodNotAFunction,
    ],
  ])(
    `should throw an error if the ${argumentName} object %s`,
    (_, ship, errorMessage) => {
      expect(() => callback(ship)).toThrow(errorMessage);
    }
  );
};
