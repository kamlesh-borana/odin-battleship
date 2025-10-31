import { createGameboardBoard, createUniqueId } from "../utils";
import { DEFAULT_GAMEBOARD_DIMENSIONS } from "../utils/constants";
import { testIsNotAStringError } from "./validation";

export const createMockPlayer = (type, options = {}) => {
  const {
    id = createUniqueId(),
    getShipAtReturnValue = null,
    addShipReturnValue = true,
    addShipsReturnValue = true,
    getBoardReturnValue = createGameboardBoard(DEFAULT_GAMEBOARD_DIMENSIONS),
  } = options;
  return {
    id,
    type,
    getShipAt: jest.fn().mockReturnValue(getShipAtReturnValue),
    addShip: jest.fn().mockReturnValue(addShipReturnValue),
    addShips: jest.fn().mockReturnValue(addShipsReturnValue),
    getBoard: jest.fn().mockReturnValue(getBoardReturnValue),
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
