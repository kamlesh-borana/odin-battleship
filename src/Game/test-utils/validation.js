import { testInvalidPlayerTypeError } from "../../test-utils/player";
import { testIsNotAnArrayOfAtLeast2ElementsError } from "../../test-utils/validation";
import { PLAYER_TYPES } from "../../utils/constants";

export const testInvalidPlayersListError = (
  argumentName,
  callback,
  errorMessagesObj
) => {
  testIsNotAnArrayOfAtLeast2ElementsError(
    argumentName,
    callback,
    errorMessagesObj
  );

  it(`should throw an error if ${argumentName} is not an array of objects`, () => {
    expect(() => callback(["not an object", "not an object"])).toThrow(
      errorMessagesObj.notAnArrayOfObjects
    );
  });

  it(`should throw an error if ${argumentName} array contains objects with no id property`, () => {
    expect(() => callback([{}, {}])).toThrow(errorMessagesObj.noIdProperty);
  });

  it(`should throw an error if ${argumentName} array contains objects with no type property`, () => {
    expect(() => callback([{ id: "123" }, { id: "456" }])).toThrow(
      errorMessagesObj.noTypeProperty
    );
  });

  testInvalidPlayerTypeError(
    "type",
    (value) =>
      callback([
        { id: "123", type: value },
        { id: "456", type: value },
      ]),
    errorMessagesObj.playerType
  );

  it(`should throw an error if ${argumentName} array contains objects with no getShipAt method`, () => {
    expect(() =>
      callback([
        { id: "123", type: PLAYER_TYPES.REAL },
        { id: "456", type: PLAYER_TYPES.REAL },
      ])
    ).toThrow(errorMessagesObj.noGetShipAtMethod);
  });

  it(`should throw an error if ${argumentName} array contains objects with getShipAt method that is not a function`, () => {
    expect(() =>
      callback([
        { id: "123", type: PLAYER_TYPES.REAL, getShipAt: "not a function" },
        { id: "456", type: PLAYER_TYPES.REAL, getShipAt: "not a function" },
      ])
    ).toThrow(errorMessagesObj.getShipAtMethodNotAFunction);
  });

  it(`should throw an error if ${argumentName} array contains objects with no addShips method`, () => {
    expect(() =>
      callback([
        { id: "123", type: PLAYER_TYPES.REAL, getShipAt: () => {} },
        { id: "456", type: PLAYER_TYPES.REAL, getShipAt: () => {} },
      ])
    ).toThrow(errorMessagesObj.noAddShipsMethod);
  });

  it(`should throw an error if ${argumentName} array contains objects with addShips method that is not a function`, () => {
    expect(() =>
      callback([
        {
          id: "123",
          type: PLAYER_TYPES.REAL,
          getShipAt: () => {},
          addShips: "not a function",
        },
        {
          id: "456",
          type: PLAYER_TYPES.REAL,
          getShipAt: () => {},
          addShips: "not a function",
        },
      ])
    ).toThrow(errorMessagesObj.addShipsMethodNotAFunction);
  });

  it(`should throw an error if ${argumentName} array contains objects with no getBoard method`, () => {
    expect(() =>
      callback([
        {
          id: "123",
          type: PLAYER_TYPES.REAL,
          getShipAt: () => {},
          addShips: () => {},
        },
        {
          id: "456",
          type: PLAYER_TYPES.REAL,
          getShipAt: () => {},
          addShips: () => {},
        },
      ])
    ).toThrow(errorMessagesObj.noGetBoardMethod);
  });

  it(`should throw an error if ${argumentName} array contains objects with getBoard method that is not a function`, () => {
    expect(() =>
      callback([
        {
          id: "123",
          type: PLAYER_TYPES.REAL,
          getShipAt: () => {},
          addShips: () => {},
          getBoard: "not a function",
        },
        {
          id: "456",
          type: PLAYER_TYPES.REAL,
          getShipAt: () => {},
          addShips: () => {},
          getBoard: "not a function",
        },
      ])
    ).toThrow(errorMessagesObj.getBoardMethodNotAFunction);
  });
};
