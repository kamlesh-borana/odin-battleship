import { createUniqueId } from "../utils";
import { createMockShip } from "./ship";
import { testIsNotAnArrayOfAtLeast1ElementError } from "./validation";

export const testInvalidShipsError = (
  argumentName,
  callback,
  errorMessagesObj
) => {
  testIsNotAnArrayOfAtLeast1ElementError(
    argumentName,
    callback,
    errorMessagesObj
  );

  describe("ship placement information objects", () => {
    it(`should throw an error if the ${argumentName} array contains elements that are not objects`, () => {
      expect(() => callback(["not an object"])).toThrow(
        errorMessagesObj.notAnArrayOfObjects
      );
    });

    it(`should throw an error if the ${argumentName} array contains objects with no ship property`, () => {
      expect(() => callback([{}])).toThrow(
        errorMessagesObj.noShipPropertyInObject
      );
    });

    it(`should throw an error if the ${argumentName} array contains objects with no coordinates property`, () => {
      expect(() => callback([{ ship: createMockShip(1) }])).toThrow(
        errorMessagesObj.noCoordinatesPropertyInObject
      );
    });

    it(`should throw an error if the ${argumentName} array contains objects with no direction property`, () => {
      expect(() =>
        callback([{ ship: createMockShip(1), coordinates: [0, 0] }])
      ).toThrow(errorMessagesObj.noDirectionPropertyInObject);
    });
  });
};

export const createMockGameUIView = () => {
  return { id: createUniqueId(), renderGameplayUI: jest.fn() };
};

export const createMockGameUIControls = () => {
  return {
    id: createUniqueId(),
    startGame: jest.fn(),
    addAttackEventListenerOnOpponentBoard: jest.fn(),
    endGame: jest.fn(),
  };
};
