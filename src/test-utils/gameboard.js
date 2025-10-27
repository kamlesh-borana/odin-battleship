import { createGameboardBoard } from "../utils";
import { DEFAULT_GAMEBOARD_DIMENSIONS } from "../utils/constants";
import {
  testIsNotAnArrayOfTwoIntegerNumbersError,
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
