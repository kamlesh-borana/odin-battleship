import Gameboard from "..";
import { createMethodCallback } from "../../test-utils";
import { DEFAULT_OUT_OF_BOUNDS_COORDINATES } from "../../test-utils/constants";
import {
  testGameboardCoordinatesOutOfBoundsError,
  testInvalidGameboardCoordinatesError,
  testInvalidGameboardDirectionError,
} from "../../test-utils/gameboard";
import { createMockShip, testInvalidShipError } from "../../test-utils/ship";
import {
  DEFAULT_GAMEBOARD_DIMENSIONS,
  DIRECTIONS,
  gameboardCoordinatesValidationMessages,
  gameboardDirectionValidationMessages,
  shipValidationMessages,
} from "../../utils/constants";
import {
  CUSTOM_5X5_GAMEBOARD_OUT_OF_BOUNDS_COORDINATES,
  CUSTOM_5X5_GAMEBOARD_VALID_SHIP_PLACEMENTS,
  CUSTOM_5X5_GAMEBOARD_VALID_SHIP_PLACEMENTS_BOUNDARY,
  DEFAULT_VALID_SHIP_PLACEMENTS,
  DEFAULT_VALID_SHIP_PLACEMENTS_BOUNDARY,
} from "../test-utils/constants";
import { gameboardPlaceShipValidationMessages } from "../utils/constants";

export function describePlaceShipTests() {
  describe("placeShip", () => {
    describe("invalid arguments", () => {
      describe("ship", () => {
        const gameboard = new Gameboard();
        testInvalidShipError(
          "ship",
          createMethodCallback(gameboard, "placeShip"),
          shipValidationMessages.invalid
        );
      });

      describe("coordinates", () => {
        const gameboard = new Gameboard();
        const ship = createMockShip(1);
        const options = {
          checkCoordinatesOutOfBoundsError: false,
        };
        testInvalidGameboardCoordinatesError(
          "coordinates",
          createMethodCallback(gameboard, "placeShip", [ship]),
          gameboardCoordinatesValidationMessages.invalid,
          options
        );
      });

      describe("direction", () => {
        const gameboard = new Gameboard();
        const ship = createMockShip(1);
        testInvalidGameboardDirectionError(
          "direction",
          createMethodCallback(gameboard, "placeShip", [ship, [0, 0]]),
          gameboardDirectionValidationMessages.invalid
        );
      });
    });

    describe("valid arguments", () => {
      it("should place the single length ship at the given coordinates in the horizontal direction on the gameboard", () => {
        const gameboard = new Gameboard();
        const ship = createMockShip(1);

        gameboard.placeShip(ship, [0, 0], DIRECTIONS.HORIZONTAL);

        expect(gameboard.getShipAt([0, 0])).toBe(ship);
      });

      it("should place the single length ship at the given coordinates in the vertical direction on the gameboard", () => {
        const gameboard = new Gameboard();
        const ship = createMockShip(1);

        gameboard.placeShip(ship, [0, 0], DIRECTIONS.VERTICAL);

        expect(gameboard.getShipAt([0, 0])).toBe(ship);
      });

      it("should place the multiple length ship at the given coordinates in the horizontal direction on the gameboard", () => {
        const gameboard = new Gameboard();
        const ship = createMockShip(2);

        gameboard.placeShip(ship, [0, 0], DIRECTIONS.HORIZONTAL);

        // The ship will occupy the first two cells in the horizontal direction
        expect(gameboard.getShipAt([0, 0])).toBe(ship);
        expect(gameboard.getShipAt([0, 1])).toBe(ship);

        // The third cell should be empty because the ship is only 2 cells long
        expect(gameboard.getShipAt([0, 2])).toBeNull();
      });

      it("should place the multiple length ship at the given coordinates in the vertical direction on the gameboard", () => {
        const gameboard = new Gameboard();
        const ship = createMockShip(2);

        gameboard.placeShip(ship, [0, 0], DIRECTIONS.VERTICAL);

        // The ship will occupy the first two cells in the vertical direction
        expect(gameboard.getShipAt([0, 0])).toBe(ship);
        expect(gameboard.getShipAt([1, 0])).toBe(ship);

        // The third cell should be empty because the ship is only 2 cells long
        expect(gameboard.getShipAt([2, 0])).toBeNull();
      });

      it("should place the ship with uppercase direction on the gameboard", () => {
        const gameboard = new Gameboard();
        const ship = createMockShip(1);

        gameboard.placeShip(ship, [0, 0], "HORIZONTAL");

        expect(gameboard.getShipAt([0, 0])).toBe(ship);
      });

      it("should place the ship with mixed-case direction on the gameboard", () => {
        const gameboard = new Gameboard();
        const ship = createMockShip(1);

        gameboard.placeShip(ship, [0, 0], "VeRtIcAl");

        expect(gameboard.getShipAt([0, 0])).toBe(ship);
      });

      describe.each([
        [
          "default gameboard dimensions",
          DEFAULT_GAMEBOARD_DIMENSIONS,
          DEFAULT_VALID_SHIP_PLACEMENTS,
        ],
        [
          "custom gameboard dimensions",
          [5, 5],
          CUSTOM_5X5_GAMEBOARD_VALID_SHIP_PLACEMENTS,
        ],
      ])("%s", (_, dimensions, placementList) => {
        it.each(placementList)(
          `should place the ship of length %i at the coordinates %s in the %s direction on a ${dimensions[0]}x${dimensions[1]} gameboard`,
          (length, coordinates, direction) => {
            const gameboard = new Gameboard(dimensions);
            const ship = createMockShip(length);

            gameboard.placeShip(ship, coordinates, direction);

            // The ship will occupy cells corresponding to the length of the ship in the given direction
            for (let i = 0; i < length; i++) {
              if (direction === DIRECTIONS.HORIZONTAL) {
                expect(
                  gameboard.getShipAt([coordinates[0], coordinates[1] + i])
                ).toBe(ship);
              } else if (direction === DIRECTIONS.VERTICAL) {
                expect(
                  gameboard.getShipAt([coordinates[0] + i, coordinates[1]])
                ).toBe(ship);
              }
            }

            // The cells beyond the length of the ship in the given direction should be empty
            if (direction === DIRECTIONS.HORIZONTAL) {
              expect(
                gameboard.getShipAt([coordinates[0], coordinates[1] + length])
              ).toBeNull();
            } else if (direction === DIRECTIONS.VERTICAL) {
              expect(
                gameboard.getShipAt([coordinates[0] + length, coordinates[1]])
              ).toBeNull();
            }
          }
        );
      });
    });

    describe("edge cases", () => {
      describe("out of bounds coordinates", () => {
        describe.each([
          [
            "default gameboard dimensions",
            DEFAULT_GAMEBOARD_DIMENSIONS,
            DEFAULT_OUT_OF_BOUNDS_COORDINATES,
          ],
          [
            "custom gameboard dimensions",
            [5, 5],
            CUSTOM_5X5_GAMEBOARD_OUT_OF_BOUNDS_COORDINATES,
          ],
        ])("%s", (_, dimensions, coordinatesList) => {
          const gameboard = new Gameboard(dimensions);
          const ship = createMockShip(1);
          testGameboardCoordinatesOutOfBoundsError(
            "coordinates",
            createMethodCallback(gameboard, "placeShip", [ship]),
            gameboardCoordinatesValidationMessages.invalid,
            coordinatesList
          );
        });
      });

      describe("boundary coordinates", () => {
        describe.each([
          [
            "default gameboard dimensions",
            DEFAULT_GAMEBOARD_DIMENSIONS,
            DEFAULT_VALID_SHIP_PLACEMENTS_BOUNDARY,
          ],
          [
            "custom gameboard dimensions",
            [5, 5],
            CUSTOM_5X5_GAMEBOARD_VALID_SHIP_PLACEMENTS_BOUNDARY,
          ],
        ])("%s", (_, dimensions, placementList) => {
          it.each(placementList)(
            `should place the ship of length %i at the boundary coordinates %s in the %s direction on a ${dimensions[0]}x${dimensions[1]} gameboard`,
            (length, coordinates, direction) => {
              const gameboard = new Gameboard(dimensions);
              const ship = createMockShip(length);

              gameboard.placeShip(ship, coordinates, direction);

              // The ship will occupy cells corresponding to the length of the ship in the given direction
              for (let i = 0; i < length; i++) {
                if (direction === DIRECTIONS.HORIZONTAL) {
                  expect(
                    gameboard.getShipAt([coordinates[0], coordinates[1] + i])
                  ).toBe(ship);
                } else if (direction === DIRECTIONS.VERTICAL) {
                  expect(
                    gameboard.getShipAt([coordinates[0] + i, coordinates[1]])
                  ).toBe(ship);
                }
              }
            }
          );
        });
      });

      it("should throw an error when placing a ship on a cell that is already occupied", () => {
        const gameboard = new Gameboard();
        const ship = createMockShip(1);
        const ship2 = createMockShip(1);

        gameboard.placeShip(ship, [0, 0], DIRECTIONS.HORIZONTAL);

        expect(() =>
          gameboard.placeShip(ship2, [0, 0], DIRECTIONS.HORIZONTAL)
        ).toThrow(gameboardPlaceShipValidationMessages.invalid.alreadyOccupied);
      });

      it("should throw an error when placing a ship that is not within the horizontal gameboard boundary", () => {
        const gameboard = new Gameboard();
        const ship = createMockShip(5);
        expect(() =>
          gameboard.placeShip(ship, [0, 6], DIRECTIONS.HORIZONTAL)
        ).toThrow(gameboardPlaceShipValidationMessages.invalid.outOfBounds);
      });

      it("should throw an error when placing a ship that is not within the vertical gameboard boundary", () => {
        const gameboard = new Gameboard();
        const ship = createMockShip(5);
        expect(() =>
          gameboard.placeShip(ship, [6, 0], DIRECTIONS.VERTICAL)
        ).toThrow(gameboardPlaceShipValidationMessages.invalid.outOfBounds);
      });

      it("should throw an error when placing a ship that overlaps with another ship in the horizontal direction", () => {
        const gameboard = new Gameboard();
        const ship = createMockShip(3);
        const ship2 = createMockShip(3);

        gameboard.placeShip(ship, [1, 2], DIRECTIONS.HORIZONTAL);

        expect(() =>
          gameboard.placeShip(ship2, [1, 0], DIRECTIONS.HORIZONTAL)
        ).toThrow(
          gameboardPlaceShipValidationMessages.invalid.overlapsWithAnotherShip
        );
      });

      it("should throw an error when placing a ship that overlaps with another ship in the vertical direction", () => {
        const gameboard = new Gameboard();
        const ship = createMockShip(3);
        const ship2 = createMockShip(3);

        gameboard.placeShip(ship, [1, 2], DIRECTIONS.VERTICAL);

        expect(() =>
          gameboard.placeShip(ship2, [0, 2], DIRECTIONS.VERTICAL)
        ).toThrow(
          gameboardPlaceShipValidationMessages.invalid.overlapsWithAnotherShip
        );
      });

      it("should throw an error when placing a ship that overlaps with another ship in the opposite direction", () => {
        const gameboard = new Gameboard();
        const ship = createMockShip(3);
        const ship2 = createMockShip(3);

        gameboard.placeShip(ship, [1, 1], DIRECTIONS.HORIZONTAL);

        expect(() =>
          gameboard.placeShip(ship2, [0, 2], DIRECTIONS.VERTICAL)
        ).toThrow(
          gameboardPlaceShipValidationMessages.invalid.overlapsWithAnotherShip
        );
      });
    });
  });
}
