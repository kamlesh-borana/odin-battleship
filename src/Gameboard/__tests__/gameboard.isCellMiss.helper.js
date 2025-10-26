import Gameboard from "..";
import { createMethodCallback } from "../../test-utils";
import { createMockShip } from "../test-utils";
import { DEFAULT_OUT_OF_BOUNDS_COORDINATES } from "../test-utils/constants";
import { testInvalidGameboardCoordinatesError } from "../test-utils/validation";
import {
  DIRECTIONS,
  gameboardCoordinatesValidationMessages,
} from "../utils/constants";

export function describeIsCellMissTests() {
  describe("isCellMiss", () => {
    describe("invalid arguments", () => {
      describe("coordinates", () => {
        const gameboard = new Gameboard();
        const options = {
          checkCoordinatesOutOfBoundsError: true,
          outOfBoundsCoordinatesList: DEFAULT_OUT_OF_BOUNDS_COORDINATES,
        };
        testInvalidGameboardCoordinatesError(
          "coordinates",
          createMethodCallback(gameboard, "isCellMiss"),
          gameboardCoordinatesValidationMessages.invalid,
          options
        );
      });
    });

    describe("valid arguments", () => {
      it("should return false if the cell containing a ship is hit", () => {
        const gameboard = new Gameboard();
        const ship = createMockShip(1);

        gameboard.placeShip(ship, [0, 0], DIRECTIONS.HORIZONTAL);
        gameboard.receiveAttack([0, 0]);

        expect(gameboard.isCellMiss([0, 0])).toBe(false);
      });

      it("should return true if an empty cell is hit", () => {
        const gameboard = new Gameboard();
        const ship = createMockShip(1);

        gameboard.placeShip(ship, [0, 0], DIRECTIONS.HORIZONTAL);
        gameboard.receiveAttack([1, 1]);

        expect(gameboard.isCellMiss([1, 1])).toBe(true);
      });

      it("should return false if the cell containing a ship is not hit", () => {
        const gameboard = new Gameboard();
        const ship = createMockShip(1);

        gameboard.placeShip(ship, [0, 0], DIRECTIONS.HORIZONTAL);
        gameboard.receiveAttack([1, 1]);

        expect(gameboard.isCellMiss([0, 0])).toBe(false);
      });

      it("should return false if an empty cell is not hit", () => {
        const gameboard = new Gameboard();
        const ship = createMockShip(1);

        gameboard.placeShip(ship, [0, 0], DIRECTIONS.HORIZONTAL);
        gameboard.receiveAttack([0, 0]);

        expect(gameboard.isCellMiss([1, 1])).toBe(false);
      });

      it("should return false if the gameboard has no ships placed", () => {
        const gameboard = new Gameboard();
        expect(gameboard.isCellMiss([0, 0])).toBe(false);
      });

      it("should return false if the gameboard has ships placed but no cells are hit", () => {
        const gameboard = new Gameboard();
        const ship = createMockShip(1);

        gameboard.placeShip(ship, [0, 0], DIRECTIONS.HORIZONTAL);

        expect(gameboard.isCellMiss([0, 0])).toBe(false); // Ship cell
        expect(gameboard.isCellMiss([1, 1])).toBe(false); // Empty cell
      });
    });
  });
}
