import { createGameboardBoard } from "../utils";
import { DEFAULT_GAMEBOARD_DIMENSIONS } from "../utils/constants";
import {
  testIsNotAnArrayOfTwoIntegerNumbersError,
  testIsNotAnArrayOfTwoPositiveIntegerNumbersError,
  testIsNotAnObjectError,
  testIsNotAStringError,
} from "./validation";

export const createMockGameboard = (options = {}) => {
  const {
    dimensions = DEFAULT_GAMEBOARD_DIMENSIONS,
    placeShipReturnValue,
    getShipAtReturnValue = null,
    getBoardReturnValue = createGameboardBoard(dimensions),
  } = options;
  return {
    dimensions: [...dimensions],
    placeShip: jest.fn().mockReturnValue(placeShipReturnValue),
    getShipAt: jest.fn().mockReturnValue(getShipAtReturnValue),
    getBoard: jest.fn().mockReturnValue(getBoardReturnValue),
  };
};

export const testInvalidGameboardCoordinatesError = (
  argumentName,
  callback,
  errorMessagesObj,
  options = {}
) => {
  testIsNotAnArrayOfTwoIntegerNumbersError(
    argumentName,
    callback,
    errorMessagesObj
  );

  const {
    checkCoordinatesOutOfBoundsError = false,
    outOfBoundsCoordinatesList,
  } = options;

  if (checkCoordinatesOutOfBoundsError) {
    describe("out of bounds coordinates", () => {
      testGameboardCoordinatesOutOfBoundsError(
        argumentName,
        callback,
        errorMessagesObj,
        outOfBoundsCoordinatesList
      );
    });
  }
};

export const testGameboardCoordinatesOutOfBoundsError = (
  argumentName,
  callback,
  errorMessagesObj,
  outOfBoundsCoordinatesList
) => {
  it.each(outOfBoundsCoordinatesList)(
    `should throw an error when the ${argumentName} %s is out of bounds on a %ix%i gameboard`,
    (coordinates) => {
      expect(() => callback(coordinates)).toThrow(errorMessagesObj.outOfBounds);
    }
  );
};

export const testInvalidGameboardDirectionError = (
  argumentName,
  callback,
  errorMessagesObj
) => {
  testIsNotAStringError(argumentName, callback, errorMessagesObj);

  it(`should throw an error if ${argumentName} is not a valid direction`, () => {
    expect(() => callback("not a valid direction")).toThrow(
      errorMessagesObj.notAValidDirection
    );
  });
};

export const testInvalidGameboardDimensionsError = (
  argumentName,
  callback,
  errorMessagesObj,
  isOptional = false
) => {
  testIsNotAnArrayOfTwoPositiveIntegerNumbersError(
    argumentName,
    callback,
    errorMessagesObj,
    isOptional
  );
};

export const testInvalidGameboardError = (
  argumentName,
  callback,
  errorMessagesObj
) => {
  testIsNotAnObjectError(argumentName, callback, errorMessagesObj);

  it(`should throw an error if ${argumentName} object does not have a dimensions property`, () => {
    expect(() => callback({})).toThrow(errorMessagesObj.noDimensionsProperty);
  });

  testInvalidGameboardDimensionsError(
    "dimensions",
    (value) => callback({ dimensions: value }),
    errorMessagesObj.gameboardDimensions
  );

  it.each([
    [
      "does not have a placeShip method",
      { dimensions: [1, 2] },
      errorMessagesObj.noPlaceShipMethod,
    ],
    [
      "has a placeShip method that is not a function",
      { dimensions: [1, 2], placeShip: "not a function" },
      errorMessagesObj.placeShipMethodNotAFunction,
    ],
    [
      "does not have a getShipAt method",
      { dimensions: [1, 2], placeShip: () => {} },
      errorMessagesObj.noGetShipAtMethod,
    ],
    [
      "has a getShipAt method that is not a function",
      { dimensions: [1, 2], placeShip: () => {}, getShipAt: "not a function" },
      errorMessagesObj.getShipAtMethodNotAFunction,
    ],
    [
      "does not have a getBoard method",
      { dimensions: [1, 2], placeShip: () => {}, getShipAt: () => {} },
      errorMessagesObj.noGetBoardMethod,
    ],
    [
      "has a getBoard method that is not a function",
      {
        dimensions: [1, 2],
        placeShip: () => {},
        getShipAt: () => {},
        getBoard: "not a function",
      },
      errorMessagesObj.getBoardMethodNotAFunction,
    ],
  ])(
    `should throw an error if ${argumentName} object %s`,
    (_, value, errorMessage) => {
      expect(() => callback(value)).toThrow(errorMessage);
    }
  );
};
