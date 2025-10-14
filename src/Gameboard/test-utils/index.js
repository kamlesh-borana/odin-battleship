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

const createConstructorCallback = (ClassName, additionalArgs) => {
  if (additionalArgs.length > 0) {
    return (value) => new ClassName(...additionalArgs, value);
  }
  return (value) => new ClassName(value);
};

const createMethodCallback = (instanceObject, methodName, additionalArgs) => {
  if (additionalArgs.length > 0) {
    return (value) => instanceObject[methodName](...additionalArgs, value);
  }
  return (value) => instanceObject[methodName](value);
};

const testUndefinedError = (argumentName, callback, errorMessagesObj) => {
  it.each([
    ["not provided", , errorMessagesObj.required],
    ["undefined", undefined, errorMessagesObj.undefined],
  ])(
    `should throw an error if ${argumentName} is %s`,
    (_, value, errorMessage) => {
      expect(() => callback(value)).toThrow(errorMessage);
    }
  );
};

const testNullError = (argumentName, callback, errorMessagesObj) => {
  it(`should throw an error if ${argumentName} is null`, () => {
    expect(() => callback(null)).toThrow(errorMessagesObj.null);
  });
};

const testHasValueError = (argumentName, callback, errorMessagesObj) => {
  testUndefinedError(argumentName, callback, errorMessagesObj);
  testNullError(argumentName, callback, errorMessagesObj);
};

const testArrayOfTwoIntegerNumbersError = (
  argumentName,
  callback,
  errorMessagesObj
) => {
  it.each([
    ["is not an array", "not an array", errorMessagesObj.notAnArray],
    ["array is empty", [], errorMessagesObj.notAnArrayOfTwoElements],
    [
      "array length is greater than 2",
      [1, 2, 3],
      errorMessagesObj.notAnArrayOfTwoElements,
    ],
    [
      "array length is less than 2",
      [1],
      errorMessagesObj.notAnArrayOfTwoElements,
    ],
    [
      "array elements are not numbers",
      [1, "2"],
      errorMessagesObj.notAnArrayOfTwoNumbers,
    ],
    [
      "array elements contain NaN",
      [1, NaN],
      errorMessagesObj.notAnArrayOfTwoNumbers,
    ],
    [
      "array elements are not finite numbers",
      [1, Infinity],
      errorMessagesObj.notAnArrayOfTwoFiniteNumbers,
    ],
    [
      "array elements are not integer numbers",
      [1, 1.5],
      errorMessagesObj.notAnArrayOfTwoIntegerNumbers,
    ],
  ])(
    `should throw an error if ${argumentName} %s`,
    (_, value, errorMessage) => {
      expect(() => callback(value)).toThrow(errorMessage);
    }
  );
};

const testArrayOfTwoPositiveIntegerNumbersError = (
  argumentName,
  callback,
  errorMessagesObj
) => {
  testArrayOfTwoIntegerNumbersError(argumentName, callback, errorMessagesObj);
  it.each([
    [
      "array elements contain negative numbers",
      [-1, 1],
      errorMessagesObj.notAnArrayOfTwoPositiveIntegerNumbers,
    ],
    [
      "array elements contain zero",
      [0, 1],
      errorMessagesObj.notAnArrayOfTwoPositiveIntegerNumbers,
    ],
  ])(
    `should throw an error if ${argumentName} %s`,
    (_, value, errorMessage) => {
      expect(() => callback(value)).toThrow(errorMessage);
    }
  );
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
