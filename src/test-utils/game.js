import { DEFAULT_OUT_OF_BOUNDS_COORDINATES } from "./constants";
import {
  testInvalidGameboardCoordinatesError,
  testInvalidGameboardDirectionError,
} from "./gameboard";
import { createMockShip, testInvalidShipError } from "./ship";
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

    describe("ship", () => {
      it(`should throw an error if the ${argumentName} array contains objects with no ship property`, () => {
        expect(() => callback([{}])).toThrow(
          errorMessagesObj.noShipPropertyInObject
        );
      });

      testInvalidShipError(
        "ship",
        (value) => callback([{ ship: value }]),
        errorMessagesObj.ship
      );
    });

    describe("coordinates", () => {
      it(`should throw an error if the ${argumentName} array contains objects with no coordinates property`, () => {
        expect(() => callback([{ ship: createMockShip(1) }])).toThrow(
          errorMessagesObj.noCoordinatesPropertyInObject
        );
      });

      const options = {
        checkCoordinatesOutOfBoundsError: true,
        outOfBoundsCoordinatesList: DEFAULT_OUT_OF_BOUNDS_COORDINATES,
      };
      testInvalidGameboardCoordinatesError(
        "coordinates",
        (value) => callback([{ ship: createMockShip(1), coordinates: value }]),
        errorMessagesObj.gameboardCoordinates,
        options
      );
    });

    describe("direction", () => {
      it(`should throw an error if the ${argumentName} array contains objects with no direction property`, () => {
        expect(() =>
          callback([{ ship: createMockShip(1), coordinates: [0, 0] }])
        ).toThrow(errorMessagesObj.noDirectionPropertyInObject);
      });

      testInvalidGameboardDirectionError(
        "direction",
        (value) =>
          callback([
            {
              ship: createMockShip(1),
              coordinates: [0, 0],
              direction: value,
            },
          ]),
        errorMessagesObj.gameboardDirection
      );
    });
  });
};
