import { createUniqueId } from "../utils";
import {
  testIsNegativeIntegerNumberError,
  testIsNotAnObjectError,
  testIsNotAPositiveIntegerNumberError,
} from "./validation";

export const createMockShip = (length, options = {}) => {
  const {
    id = createUniqueId(),
    hits = 0,
    hitMethodReturnValue = true,
    isSunkMethodReturnValue = false,
  } = options;
  return {
    id,
    length,
    hits,
    hit: jest.fn().mockReturnValue(hitMethodReturnValue),
    isSunk: jest.fn().mockReturnValue(isSunkMethodReturnValue),
  };
};

export const testInvalidShipLengthError = (
  argumentName,
  callback,
  errorMessagesObj
) => {
  testIsNotAPositiveIntegerNumberError(
    argumentName,
    callback,
    errorMessagesObj
  );
};

export const testInvalidShipHitsError = (
  argumentName,
  callback,
  length,
  errorMessagesObj
) => {
  testIsNegativeIntegerNumberError(argumentName, callback, errorMessagesObj);

  it(`should throw an error if ${argumentName} is greater than the ship's length`, () => {
    expect(() => callback(length + 1)).toThrow(
      errorMessagesObj.isGreaterThanLength
    );
  });
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
  ])(
    `should throw an error if the ${argumentName} object %s`,
    (_, ship, errorMessage) => {
      expect(() => callback(ship)).toThrow(errorMessage);
    }
  );

  testInvalidShipLengthError(
    "length",
    (value) => callback({ id: "123", length: value }),
    errorMessagesObj.length
  );

  it(`should throw an error if the ${argumentName} object does not have a hits property`, () => {
    expect(() => callback({ id: "123", length: 1 })).toThrow(
      errorMessagesObj.noHitsProperty
    );
  });

  testInvalidShipHitsError(
    "hits",
    (value) => callback({ id: "123", length: 1, hits: value }),
    1,
    errorMessagesObj.hits
  );

  it.each([
    [
      "does not have a hit method",
      { id: "123", length: 1, hits: 0 },
      errorMessagesObj.noHitMethod,
    ],
    [
      "has a hit method that is not a function",
      { id: "123", length: 1, hits: 0, hit: "not a function" },
      errorMessagesObj.hitMethodNotAFunction,
    ],
    [
      "does not have a isSunk method",
      { id: "123", length: 1, hits: 0, hit: () => true },
      errorMessagesObj.noIsSunkMethod,
    ],
    [
      "has a isSunk method that is not a function",
      {
        id: "123",
        length: 1,
        hits: 0,
        hit: () => true,
        isSunk: "not a function",
      },
      errorMessagesObj.isSunkMethodNotAFunction,
    ],
  ])(
    `should throw an error if the ${argumentName} object %s`,
    (_, ship, errorMessage) => {
      expect(() => callback(ship)).toThrow(errorMessage);
    }
  );
};
