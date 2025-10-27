import Gameboard from "..";
import { createMethodCallback } from "../../test-utils";
import { DEFAULT_OUT_OF_BOUNDS_COORDINATES } from "../../test-utils/constants";
import { testInvalidGameboardCoordinatesError } from "../../test-utils/gameboard";
import { createMockShip } from "../../test-utils/ship";
import {
  DIRECTIONS,
  gameboardCoordinatesValidationMessages,
} from "../../utils/constants";

export function describeGetShipAtTests() {
  describe("getShipAt", () => {
    describe("invalid arguments", () => {
      describe("coordinates", () => {
        const gameboard = new Gameboard();
        const options = {
          checkCoordinatesOutOfBoundsError: true,
          outOfBoundsCoordinatesList: DEFAULT_OUT_OF_BOUNDS_COORDINATES,
        };
        testInvalidGameboardCoordinatesError(
          "coordinates",
          createMethodCallback(gameboard, "getShipAt"),
          gameboardCoordinatesValidationMessages.invalid,
          options
        );
      });
    });

    describe("valid arguments", () => {
      it("should return the ship if there is a ship at the given coordinates", () => {
        const gameboard = new Gameboard();
        const ship = createMockShip(1);

        gameboard.placeShip(ship, [0, 0], DIRECTIONS.HORIZONTAL);

        expect(gameboard.getShipAt([0, 0])).toBe(ship);
      });

      it("should return null if there is no ship at the given coordinates", () => {
        const gameboard = new Gameboard();
        const ship = createMockShip(1);

        gameboard.placeShip(ship, [0, 0], DIRECTIONS.HORIZONTAL);

        expect(gameboard.getShipAt([1, 1])).toBeNull();
      });

      it("should return null if the gameboard has no ships placed", () => {
        const gameboard = new Gameboard();
        expect(gameboard.getShipAt([0, 0])).toBeNull();
      });
    });
  });
}
