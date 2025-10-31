import Gameboard from "..";
import { createMethodCallback } from "../../test-utils";
import { DEFAULT_OUT_OF_BOUNDS_COORDINATES } from "../../test-utils/constants";
import { testInvalidGameboardCoordinatesError } from "../../test-utils/gameboard";
import { createMockShip } from "../../test-utils/ship";
import {
  DIRECTIONS,
  gameboardCoordinatesValidationMessages,
} from "../../utils/constants";
import { gameboardReceiveAttackValidationMessages } from "../utils/constants";

export function describeReceiveAttackTests() {
  describe("receiveAttack", () => {
    describe("invalid arguments", () => {
      describe("coordinates", () => {
        const gameboard = new Gameboard();
        const options = {
          checkCoordinatesOutOfBoundsError: true,
          outOfBoundsCoordinatesList: DEFAULT_OUT_OF_BOUNDS_COORDINATES,
        };
        testInvalidGameboardCoordinatesError(
          "coordinates",
          createMethodCallback(gameboard, "receiveAttack"),
          gameboardCoordinatesValidationMessages.invalid,
          options
        );
      });
    });

    describe("valid arguments", () => {
      it("should mark the cell containing a ship as hit when receiving an attack", () => {
        const gameboard = new Gameboard();
        const ship = createMockShip(1);

        gameboard.placeShip(ship, [0, 0], DIRECTIONS.HORIZONTAL);
        gameboard.receiveAttack([0, 0]);

        expect(gameboard.isCellHit([0, 0])).toBe(true);
      });

      it("should mark the cell not containing a ship as miss when receiving an attack", () => {
        const gameboard = new Gameboard();
        const ship = createMockShip(1);

        gameboard.placeShip(ship, [0, 0], DIRECTIONS.HORIZONTAL);
        gameboard.receiveAttack([1, 1]);

        expect(gameboard.isCellMissHit([1, 1])).toBe(true);
      });

      it("should call the hit() method of the ship when receiving an attack on a cell containing a ship", () => {
        const gameboard = new Gameboard();
        const ship = createMockShip(1);

        gameboard.placeShip(ship, [0, 0], DIRECTIONS.HORIZONTAL);
        gameboard.receiveAttack([0, 0]);

        expect(ship.hit).toHaveBeenCalledTimes(1);
      });

      it("should return true when receiving an attack on a cell containing a ship", () => {
        const gameboard = new Gameboard();
        const ship = createMockShip(1);

        gameboard.placeShip(ship, [0, 0], DIRECTIONS.HORIZONTAL);

        expect(gameboard.receiveAttack([0, 0])).toBe(true);
      });

      it("should return true when receiving an attack on a cell not containing a ship", () => {
        const gameboard = new Gameboard();
        const ship = createMockShip(1);

        gameboard.placeShip(ship, [0, 0], DIRECTIONS.HORIZONTAL);

        expect(gameboard.receiveAttack([1, 1])).toBe(true);
      });

      it("should throw an error when the ship's hit() method returns false", () => {
        const gameboard = new Gameboard();
        const ship = createMockShip(1);

        gameboard.placeShip(ship, [0, 0], DIRECTIONS.HORIZONTAL);

        // Mock the ship's hit() method to return false
        ship.hit.mockReturnValue(false);

        expect(() => gameboard.receiveAttack([0, 0])).toThrow(
          gameboardReceiveAttackValidationMessages.invalid.shipHitFailedSilently
        );
      });
    });

    describe("edge cases", () => {
      it("should throw an error when receiving an attack on a cell that is already hit", () => {
        const gameboard = new Gameboard();
        const ship = createMockShip(1);

        gameboard.placeShip(ship, [0, 0], DIRECTIONS.HORIZONTAL);
        gameboard.receiveAttack([0, 0]);

        expect(() => gameboard.receiveAttack([0, 0])).toThrow(
          gameboardReceiveAttackValidationMessages.invalid.alreadyHit
        );
      });

      it("should throw an error when receiving an attack on a cell that is already missed", () => {
        const gameboard = new Gameboard();
        const ship = createMockShip(1);

        gameboard.placeShip(ship, [0, 0], DIRECTIONS.HORIZONTAL);
        gameboard.receiveAttack([1, 1]);

        expect(() => gameboard.receiveAttack([1, 1])).toThrow(
          gameboardReceiveAttackValidationMessages.invalid.alreadyMissed
        );
      });

      it("should throw an error when receiving an attack on an empty gameboard with no ships placed", () => {
        const gameboard = new Gameboard();
        expect(() => gameboard.receiveAttack([0, 0])).toThrow(
          gameboardReceiveAttackValidationMessages.invalid.noShipsPlaced
        );
      });
    });
  });
}
