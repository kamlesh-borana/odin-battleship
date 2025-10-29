import { createUniqueId } from "../utils";
import {
  testIsAnEmptyStringError,
  testIsNegativeIntegerNumberError,
  testIsNotAnObjectError,
  testIsNotAPositiveIntegerNumberError,
} from "./validation";

export const createMockShip = (length, options = {}) => {
  const {
    id = createUniqueId(),
    name = "Mock Ship",
    hits = 0,
    hitMethodReturnValue = true,
    isSunkMethodReturnValue = false,
    getInfoMethodReturnValue = {
      id,
      name,
      length,
      hits,
      isSunk: isSunkMethodReturnValue,
    },
  } = options;
  return {
    id,
    name,
    length,
    hits,
    hit: jest.fn().mockReturnValue(hitMethodReturnValue),
    isSunk: jest.fn().mockReturnValue(isSunkMethodReturnValue),
    getInfo: jest.fn().mockReturnValue(getInfoMethodReturnValue),
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

export const testInvalidShipNameError = (
  argumentName,
  callback,
  errorMessagesObj,
  isOptional = false
) => {
  testIsAnEmptyStringError(
    argumentName,
    callback,
    errorMessagesObj,
    isOptional
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

  it(`should throw an error if the ${argumentName} object does not have a name property`, () => {
    expect(() => callback({ id: "123", length: 1 })).toThrow(
      errorMessagesObj.noNameProperty
    );
  });

  testInvalidShipNameError(
    "name",
    (value) => callback({ id: "123", length: 1, name: value }),
    errorMessagesObj.name
  );

  it(`should throw an error if the ${argumentName} object does not have a hits property`, () => {
    expect(() => callback({ id: "123", length: 1, name: "Mock Ship" })).toThrow(
      errorMessagesObj.noHitsProperty
    );
  });

  testInvalidShipHitsError(
    "hits",
    (value) =>
      callback({ id: "123", length: 1, name: "Mock Ship", hits: value }),
    1,
    errorMessagesObj.hits
  );

  it.each([
    [
      "does not have a hit method",
      { id: "123", length: 1, name: "Mock Ship", hits: 0 },
      errorMessagesObj.noHitMethod,
    ],
    [
      "has a hit method that is not a function",
      {
        id: "123",
        length: 1,
        name: "Mock Ship",
        hits: 0,
        hit: "not a function",
      },
      errorMessagesObj.hitMethodNotAFunction,
    ],
    [
      "does not have a isSunk method",
      { id: "123", length: 1, name: "Mock Ship", hits: 0, hit: () => true },
      errorMessagesObj.noIsSunkMethod,
    ],
    [
      "has a isSunk method that is not a function",
      {
        id: "123",
        length: 1,
        name: "Mock Ship",
        hits: 0,
        hit: () => true,
        isSunk: "not a function",
      },
      errorMessagesObj.isSunkMethodNotAFunction,
    ],
    [
      "does not have a getInfo method",
      {
        id: "123",
        length: 1,
        name: "Mock Ship",
        hits: 0,
        hit: () => true,
        isSunk: () => false,
      },
      errorMessagesObj.noGetInfoMethod,
    ],
    [
      "has a getInfo method that is not a function",
      {
        id: "123",
        length: 1,
        name: "Mock Ship",
        hits: 0,
        hit: () => true,
        isSunk: () => false,
        getInfo: "not a function",
      },
      errorMessagesObj.getInfoMethodNotAFunction,
    ],
  ])(
    `should throw an error if the ${argumentName} object %s`,
    (_, ship, errorMessage) => {
      expect(() => callback(ship)).toThrow(errorMessage);
    }
  );
};
