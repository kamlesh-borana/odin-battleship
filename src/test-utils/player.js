import { createGameboardBoard, createUniqueId } from "../utils";
import { DEFAULT_GAMEBOARD_DIMENSIONS, PLAYER_TYPES } from "../utils/constants";
import { testIsNotAnObjectError, testIsNotAStringError } from "./validation";

export const createMockPlayer = (type, options = {}) => {
  const {
    id = createUniqueId(),
    getShipAtReturnValue = null,
    addShipReturnValue = true,
    addShipsReturnValue = true,
    receiveAttackReturnValue = true,
    getBoardReturnValue = createGameboardBoard(DEFAULT_GAMEBOARD_DIMENSIONS),
    allShipsSunkReturnValue = false,
  } = options;
  return {
    id,
    type,
    getShipAt: jest.fn().mockReturnValue(getShipAtReturnValue),
    addShip: jest.fn().mockReturnValue(addShipReturnValue),
    addShips: jest.fn().mockReturnValue(addShipsReturnValue),
    receiveAttack: jest.fn().mockReturnValue(receiveAttackReturnValue),
    getBoard: jest.fn().mockReturnValue(getBoardReturnValue),
    allShipsSunk: jest.fn().mockReturnValue(allShipsSunkReturnValue),
  };
};

export const testInvalidPlayerTypeError = (
  argumentName,
  callback,
  errorMessagesObj
) => {
  testIsNotAStringError(argumentName, callback, errorMessagesObj);

  it(`should throw an error if ${argumentName} is not a valid type`, () => {
    expect(() => callback("not a valid type")).toThrow(
      errorMessagesObj.notAValidType
    );
  });
};

export const testInvalidPlayerError = (
  argumentName,
  callback,
  errorMessagesObj
) => {
  testIsNotAnObjectError(argumentName, callback, errorMessagesObj);

  it(`should throw an error if ${argumentName} object does not have an id property`, () => {
    expect(() => callback({})).toThrow(errorMessagesObj.noIdProperty);
  });

  it(`should throw an error if ${argumentName} object does not have a type property`, () => {
    expect(() => callback({ id: "123" })).toThrow(
      errorMessagesObj.noTypeProperty
    );
  });

  testInvalidPlayerTypeError(
    "type",
    (value) => callback({ id: "123", type: value }),
    errorMessagesObj.type
  );

  it(`should throw an error if ${argumentName} object does not have a getShipAt method`, () => {
    expect(() => callback({ id: "123", type: PLAYER_TYPES.REAL })).toThrow(
      errorMessagesObj.noGetShipAtMethod
    );
  });

  it(`should throw an error if ${argumentName} object has a getShipAt method that is not a function`, () => {
    expect(() =>
      callback({
        id: "123",
        type: PLAYER_TYPES.REAL,
        getShipAt: "not a function",
      })
    ).toThrow(errorMessagesObj.getShipAtMethodNotAFunction);
  });

  it(`should throw an error if ${argumentName} object does not have an addShip method`, () => {
    expect(() =>
      callback({ id: "123", type: PLAYER_TYPES.REAL, getShipAt: () => {} })
    ).toThrow(errorMessagesObj.noAddShipMethod);
  });

  it(`should throw an error if ${argumentName} object has an addShip method that is not a function`, () => {
    expect(() =>
      callback({
        id: "123",
        type: PLAYER_TYPES.REAL,
        getShipAt: () => {},
        addShip: "not a function",
      })
    ).toThrow(errorMessagesObj.addShipMethodNotAFunction);
  });

  it(`should throw an error if ${argumentName} object does not have an addShips method`, () => {
    expect(() =>
      callback({
        id: "123",
        type: PLAYER_TYPES.REAL,
        getShipAt: () => {},
        addShip: () => {},
      })
    ).toThrow(errorMessagesObj.noAddShipsMethod);
  });

  it(`should throw an error if ${argumentName} object has an addShips method that is not a function`, () => {
    expect(() =>
      callback({
        id: "123",
        type: PLAYER_TYPES.REAL,
        getShipAt: () => {},
        addShip: () => {},
        addShips: "not a function",
      })
    ).toThrow(errorMessagesObj.addShipsMethodNotAFunction);
  });

  it(`should throw an error if ${argumentName} object does not have an receiveAttack method`, () => {
    expect(() =>
      callback({
        id: "123",
        type: PLAYER_TYPES.REAL,
        getShipAt: () => {},
        addShip: () => {},
        addShips: () => {},
      })
    ).toThrow(errorMessagesObj.noReceiveAttackMethod);
  });

  it(`should throw an error if ${argumentName} object has an receiveAttack method that is not a function`, () => {
    expect(() =>
      callback({
        id: "123",
        type: PLAYER_TYPES.REAL,
        getShipAt: () => {},
        addShip: () => {},
        addShips: () => {},
        receiveAttack: "not a function",
      })
    ).toThrow(errorMessagesObj.receiveAttackMethodNotAFunction);
  });

  it(`should throw an error if ${argumentName} object does not have a getBoard method`, () => {
    expect(() =>
      callback({
        id: "123",
        type: PLAYER_TYPES.REAL,
        getShipAt: () => {},
        addShip: () => {},
        addShips: () => {},
        receiveAttack: () => {},
      })
    ).toThrow(errorMessagesObj.noGetBoardMethod);
  });

  it(`should throw an error if ${argumentName} object has a getBoard method that is not a function`, () => {
    expect(() =>
      callback({
        id: "123",
        type: PLAYER_TYPES.REAL,
        getShipAt: () => {},
        addShip: () => {},
        addShips: () => {},
        receiveAttack: () => {},
        getBoard: "not a function",
      })
    ).toThrow(errorMessagesObj.getBoardMethodNotAFunction);
  });

  it(`should throw an error if ${argumentName} object does not have an allShipsSunk method`, () => {
    expect(() =>
      callback({
        id: "123",
        type: PLAYER_TYPES.REAL,
        getShipAt: () => {},
        addShip: () => {},
        addShips: () => {},
        receiveAttack: () => {},
        getBoard: () => {},
      })
    ).toThrow(errorMessagesObj.noAllShipsSunkMethod);
  });

  it(`should throw an error if ${argumentName} object has an allShipsSunk method that is not a function`, () => {
    expect(() =>
      callback({
        id: "123",
        type: PLAYER_TYPES.REAL,
        getShipAt: () => {},
        addShip: () => {},
        addShips: () => {},
        receiveAttack: () => {},
        getBoard: () => {},
        allShipsSunk: "not a function",
      })
    ).toThrow(errorMessagesObj.allShipsSunkMethodNotAFunction);
  });
};
