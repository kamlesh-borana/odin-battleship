import { createGameboardBoard, createUniqueId } from "../utils";
import { DEFAULT_GAMEBOARD_DIMENSIONS } from "../utils/constants";
import {
  testIsNotAnArrayOfTwoIntegerNumbersError,
  testIsNotAnArrayOfTwoPositiveIntegerNumbersError,
  testIsNotAnObjectError,
  testIsNotAStringError,
} from "./validation";

export const createMockGameboard = (options = {}) => {
  const {
    id = createUniqueId(),
    dimensions = DEFAULT_GAMEBOARD_DIMENSIONS,
    getShipAtReturnValue = null,
    isCellHitReturnValue = false,
    isCellMissHitReturnValue = false,
    placeShipReturnValue = true,
    receiveAttackReturnValue = true,
    allShipsSunkReturnValue = false,
    getBoardReturnValue = createGameboardBoard(dimensions),
  } = options;
  return {
    id,
    dimensions: [...dimensions],
    getShipAt: jest.fn().mockReturnValue(getShipAtReturnValue),
    isCellHit: jest.fn().mockReturnValue(isCellHitReturnValue),
    isCellMissHit: jest.fn().mockReturnValue(isCellMissHitReturnValue),
    placeShip: jest.fn().mockReturnValue(placeShipReturnValue),
    receiveAttack: jest.fn().mockReturnValue(receiveAttackReturnValue),
    allShipsSunk: jest.fn().mockReturnValue(allShipsSunkReturnValue),
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

  it(`should throw an error if ${argumentName} object does not have an id property`, () => {
    expect(() => callback({})).toThrow(errorMessagesObj.noIdProperty);
  });

  it(`should throw an error if ${argumentName} object does not have a dimensions property`, () => {
    expect(() => callback({ id: "123" })).toThrow(
      errorMessagesObj.noDimensionsProperty
    );
  });

  testInvalidGameboardDimensionsError(
    "dimensions",
    (value) => callback({ id: "123", dimensions: value }),
    errorMessagesObj.dimensions
  );

  it.each([
    [
      "does not have a getShipAt method",
      { id: "123", dimensions: [1, 2] },
      errorMessagesObj.noGetShipAtMethod,
    ],
    [
      "has a getShipAt method that is not a function",
      { id: "123", dimensions: [1, 2], getShipAt: "not a function" },
      errorMessagesObj.getShipAtMethodNotAFunction,
    ],
    [
      "does not have an isCellHit method",
      { id: "123", dimensions: [1, 2], getShipAt: () => {} },
      errorMessagesObj.noIsCellHitMethod,
    ],
    [
      "has an isCellHit method that is not a function",
      {
        id: "123",
        dimensions: [1, 2],
        getShipAt: () => {},
        isCellHit: "not a function",
      },
      errorMessagesObj.isCellHitMethodNotAFunction,
    ],
    [
      "does not have an isCellMissHit method",
      {
        id: "123",
        dimensions: [1, 2],
        getShipAt: () => {},
        isCellHit: () => {},
      },
      errorMessagesObj.noIsCellMissHitMethod,
    ],
    [
      "has an isCellMissHit method that is not a function",
      {
        id: "123",
        dimensions: [1, 2],
        getShipAt: () => {},
        isCellHit: () => {},
        isCellMissHit: "not a function",
      },
      errorMessagesObj.isCellMissHitMethodNotAFunction,
    ],
    [
      "does not have a placeShip method",
      {
        id: "123",
        dimensions: [1, 2],
        getShipAt: () => {},
        isCellHit: () => {},
        isCellMissHit: () => {},
      },
      errorMessagesObj.noPlaceShipMethod,
    ],
    [
      "has a placeShip method that is not a function",
      {
        id: "123",
        dimensions: [1, 2],
        getShipAt: () => {},
        isCellHit: () => {},
        isCellMissHit: () => {},
        placeShip: "not a function",
      },
      errorMessagesObj.placeShipMethodNotAFunction,
    ],
    [
      "does not have a receiveAttack method",
      {
        id: "123",
        dimensions: [1, 2],
        getShipAt: () => {},
        isCellHit: () => {},
        isCellMissHit: () => {},
        placeShip: () => {},
      },
      errorMessagesObj.noReceiveAttackMethod,
    ],
    [
      "has a receiveAttack method that is not a function",
      {
        id: "123",
        dimensions: [1, 2],
        getShipAt: () => {},
        isCellHit: () => {},
        isCellMissHit: () => {},
        placeShip: () => {},
        receiveAttack: "not a function",
      },
      errorMessagesObj.receiveAttackMethodNotAFunction,
    ],
    [
      "does not have an allShipsSunk method",
      {
        id: "123",
        dimensions: [1, 2],
        getShipAt: () => {},
        isCellHit: () => {},
        isCellMissHit: () => {},
        placeShip: () => {},
        receiveAttack: () => {},
      },
      errorMessagesObj.noAllShipsSunkMethod,
    ],
    [
      "has an allShipsSunk method that is not a function",
      {
        id: "123",
        dimensions: [1, 2],
        getShipAt: () => {},
        isCellHit: () => {},
        isCellMissHit: () => {},
        placeShip: () => {},
        receiveAttack: () => {},
        allShipsSunk: "not a function",
      },
      errorMessagesObj.allShipsSunkMethodNotAFunction,
    ],
    [
      "does not have a getBoard method",
      {
        id: "123",
        dimensions: [1, 2],
        getShipAt: () => {},
        isCellHit: () => {},
        isCellMissHit: () => {},
        placeShip: () => {},
        receiveAttack: () => {},
        allShipsSunk: () => {},
      },
      errorMessagesObj.noGetBoardMethod,
    ],
    [
      "has a getBoard method that is not a function",
      {
        id: "123",
        dimensions: [1, 2],
        getShipAt: () => {},
        isCellHit: () => {},
        isCellMissHit: () => {},
        placeShip: () => {},
        receiveAttack: () => {},
        allShipsSunk: () => {},
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
