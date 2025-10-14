import Gameboard from "..";
import {
  createMockShip,
  testInvalidCoordinatesError,
  testInvalidDimensionsError,
  testInvalidDirectionError,
  testInvalidShipError,
  testOutOfBoundsCoordinatesError,
} from "../test-utils";
import {
  CUSTOM_5X5_GAMEBOARD_OUT_OF_BOUNDS_COORDINATES,
  CUSTOM_5X5_GAMEBOARD_VALID_SHIP_PLACEMENTS,
  CUSTOM_5X5_GAMEBOARD_VALID_SHIP_PLACEMENTS_BOUNDARY,
  DEFAULT_OUT_OF_BOUNDS_COORDINATES,
  DEFAULT_VALID_SHIP_PLACEMENTS,
  DEFAULT_VALID_SHIP_PLACEMENTS_BOUNDARY,
} from "../test-utils/constants";
import {
  DEFAULT_GAMEBOARD_DIMENSIONS,
  DIRECTIONS,
  gameboardPlaceShipValidationMessages,
  gameboardReceiveAttackValidationMessages,
} from "../utils/constants";

describe("Gameboard class module", () => {
  describe("constructor", () => {
    describe("invalid arguments", () => {
      describe("dimensions", () => {
        testInvalidDimensionsError(Gameboard);
      });
    });

    describe("valid arguments", () => {
      it("should create a gameboard instance if dimensions is a valid array of two positive integer numbers", () => {
        expect(new Gameboard([10, 10])).toBeInstanceOf(Gameboard);
      });

      it("should create a default gameboard instance if no dimensions is provided", () => {
        expect(new Gameboard()).toBeInstanceOf(Gameboard);
      });
    });
  });

  describe("gameboard instance", () => {
    describe("properties", () => {
      describe("id", () => {
        it("should return the id of the gameboard", () => {
          const gameboard = new Gameboard([10, 10]);
          expect(gameboard.id).toBeDefined();
        });

        it("should return a unique id for each gameboard instance", () => {
          const gameboard1 = new Gameboard([10, 10]);
          const gameboard2 = new Gameboard([10, 10]);
          expect(gameboard1.id).not.toBe(gameboard2.id);
        });
      });

      describe("dimensions", () => {
        it("should return the dimensions of the gameboard passed to the constructor", () => {
          const gameboard = new Gameboard([15, 15]);
          expect(gameboard.dimensions).toStrictEqual([15, 15]);
        });

        it("should return the default dimensions of the gameboard if no dimensions is provided", () => {
          const gameboard = new Gameboard();
          expect(gameboard.dimensions).toStrictEqual(
            DEFAULT_GAMEBOARD_DIMENSIONS
          );
        });
      });
    });

    describe("methods", () => {
      describe("getShipAt", () => {
        describe("invalid arguments", () => {
          describe("coordinates", () => {
            const gameboard = new Gameboard();
            testInvalidCoordinatesError(gameboard, "getShipAt");
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

        describe("edge cases", () => {
          const gameboard = new Gameboard();
          testOutOfBoundsCoordinatesError(gameboard, "getShipAt");
        });
      });

      describe("isCellHit", () => {
        describe("invalid arguments", () => {
          describe("coordinates", () => {
            const gameboard = new Gameboard();
            testInvalidCoordinatesError(gameboard, "isCellHit");
          });
        });

        describe("valid arguments", () => {
          it("should return true if the cell containing a ship is hit", () => {
            const gameboard = new Gameboard();
            const ship = createMockShip(1);

            gameboard.placeShip(ship, [0, 0], DIRECTIONS.HORIZONTAL);
            gameboard.receiveAttack([0, 0]);

            expect(gameboard.isCellHit([0, 0])).toBe(true);
          });

          it("should return true if an empty cell is hit", () => {
            const gameboard = new Gameboard();
            const ship = createMockShip(1);

            gameboard.placeShip(ship, [0, 0], DIRECTIONS.HORIZONTAL);
            gameboard.receiveAttack([1, 1]);

            expect(gameboard.isCellHit([1, 1])).toBe(true);
          });

          it("should return false if the cell containing a ship is not hit", () => {
            const gameboard = new Gameboard();
            const ship = createMockShip(1);

            gameboard.placeShip(ship, [0, 0], DIRECTIONS.HORIZONTAL);
            gameboard.receiveAttack([1, 1]);

            expect(gameboard.isCellHit([0, 0])).toBe(false);
          });

          it("should return false if an empty cell is not hit", () => {
            const gameboard = new Gameboard();
            const ship = createMockShip(1);

            gameboard.placeShip(ship, [0, 0], DIRECTIONS.HORIZONTAL);
            gameboard.receiveAttack([0, 0]);

            expect(gameboard.isCellHit([1, 1])).toBe(false);
          });

          it("should return false if the gameboard has no ships placed", () => {
            const gameboard = new Gameboard();
            expect(gameboard.isCellHit([0, 0])).toBe(false);
          });

          it("should return false if the gameboard has ships placed but no cells are hit", () => {
            const gameboard = new Gameboard();
            const ship = createMockShip(1);

            gameboard.placeShip(ship, [0, 0], DIRECTIONS.HORIZONTAL);

            expect(gameboard.isCellHit([0, 0])).toBe(false); // Ship cell
            expect(gameboard.isCellHit([1, 1])).toBe(false); // Empty cell
          });
        });

        describe("edge cases", () => {
          const gameboard = new Gameboard();
          testOutOfBoundsCoordinatesError(gameboard, "isCellHit");
        });
      });

      describe("isCellMiss", () => {
        describe("invalid arguments", () => {
          describe("coordinates", () => {
            const gameboard = new Gameboard();
            testInvalidCoordinatesError(gameboard, "isCellMiss");
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

        describe("edge cases", () => {
          const gameboard = new Gameboard();
          testOutOfBoundsCoordinatesError(gameboard, "isCellMiss");
        });
      });

      describe("placeShip", () => {
        describe("invalid arguments", () => {
          describe("ship", () => {
            const gameboard = new Gameboard();
            testInvalidShipError(gameboard, "placeShip");
          });

          describe("coordinates", () => {
            const gameboard = new Gameboard();
            const ship = createMockShip(1);
            testInvalidCoordinatesError(gameboard, "placeShip", [ship]);
          });

          describe("direction", () => {
            const gameboard = new Gameboard();
            const ship = createMockShip(1);
            testInvalidDirectionError(gameboard, "placeShip", [ship, [0, 0]]);
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
                    gameboard.getShipAt([
                      coordinates[0],
                      coordinates[1] + length,
                    ])
                  ).toBeNull();
                } else if (direction === DIRECTIONS.VERTICAL) {
                  expect(
                    gameboard.getShipAt([
                      coordinates[0] + length,
                      coordinates[1],
                    ])
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
              testOutOfBoundsCoordinatesError(
                gameboard,
                "placeShip",
                [ship],
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
                        gameboard.getShipAt([
                          coordinates[0],
                          coordinates[1] + i,
                        ])
                      ).toBe(ship);
                    } else if (direction === DIRECTIONS.VERTICAL) {
                      expect(
                        gameboard.getShipAt([
                          coordinates[0] + i,
                          coordinates[1],
                        ])
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
            ).toThrow(
              gameboardPlaceShipValidationMessages.invalid.alreadyOccupied
            );
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
              gameboardPlaceShipValidationMessages.invalid
                .overlapsWithAnotherShip
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
              gameboardPlaceShipValidationMessages.invalid
                .overlapsWithAnotherShip
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
              gameboardPlaceShipValidationMessages.invalid
                .overlapsWithAnotherShip
            );
          });
        });
      });

      describe("receiveAttack", () => {
        describe("invalid arguments", () => {
          describe("coordinates", () => {
            const gameboard = new Gameboard();
            testInvalidCoordinatesError(gameboard, "receiveAttack");
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

            expect(gameboard.isCellMiss([1, 1])).toBe(true);
          });

          it("should call the hit() method of the ship when receiving an attack on a cell containing a ship", () => {
            const gameboard = new Gameboard();
            const ship = createMockShip(1);

            gameboard.placeShip(ship, [0, 0], DIRECTIONS.HORIZONTAL);
            gameboard.receiveAttack([0, 0]);

            expect(ship.hit).toHaveBeenCalledTimes(1);
          });
        });

        describe("edge cases", () => {
          const gameboard = new Gameboard();
          testOutOfBoundsCoordinatesError(gameboard, "receiveAttack");

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

      describe("allShipsSunk", () => {
        it("should return false if the only ship on the gameboard is not sunk", () => {
          const gameboard = new Gameboard();
          const ship = createMockShip(1);

          gameboard.placeShip(ship, [0, 0], DIRECTIONS.HORIZONTAL);

          expect(gameboard.allShipsSunk()).toBe(false);
        });

        it("should return true if the only ship on the gameboard is sunk", () => {
          const gameboard = new Gameboard();
          const ship = createMockShip(1);

          gameboard.placeShip(ship, [0, 0], DIRECTIONS.HORIZONTAL);
          gameboard.receiveAttack([0, 0]); // Ship is hit and sunk
          ship.isSunk.mockReturnValue(true); // Ship is sunk

          expect(gameboard.allShipsSunk()).toBe(true);
        });

        it("should return false if all ships on the gameboard are not sunk", () => {
          const gameboard = new Gameboard();
          const ship = createMockShip(1);
          const ship2 = createMockShip(2);

          gameboard.placeShip(ship, [0, 0], DIRECTIONS.HORIZONTAL);
          gameboard.placeShip(ship2, [1, 1], DIRECTIONS.HORIZONTAL);

          expect(gameboard.allShipsSunk()).toBe(false);
        });

        it("should return false if there are ships on the gameboard that are not sunk", () => {
          const gameboard = new Gameboard();
          const ship = createMockShip(1);
          const ship2 = createMockShip(2);

          gameboard.placeShip(ship, [0, 0], DIRECTIONS.HORIZONTAL);
          gameboard.placeShip(ship2, [1, 1], DIRECTIONS.HORIZONTAL);

          gameboard.receiveAttack([0, 0]); // First ship is hit and sunk
          ship.isSunk.mockReturnValue(true); // First ship is sunk

          gameboard.receiveAttack([1, 1]); // Second ship is hit but not sunk yet
          ship2.isSunk.mockReturnValue(false); // Second ship is not sunk

          expect(gameboard.allShipsSunk()).toBe(false);
        });

        it("should return true if all ships on the gameboard are sunk", () => {
          const gameboard = new Gameboard();
          const ship = createMockShip(1);
          const ship2 = createMockShip(2);

          gameboard.placeShip(ship, [0, 0], DIRECTIONS.HORIZONTAL);
          gameboard.placeShip(ship2, [1, 1], DIRECTIONS.HORIZONTAL);

          gameboard.receiveAttack([0, 0]); // First ship is hit
          ship.isSunk.mockReturnValue(true); // First ship is hit and sunk

          gameboard.receiveAttack([1, 1]); // Second ship is hit but not sunk yet
          gameboard.receiveAttack([1, 2]); // Second ship is hit and sunk
          ship2.isSunk.mockReturnValue(true); // Second ship is sunk

          expect(gameboard.allShipsSunk()).toBe(true);
        });

        it("should return true if there are no ships on the gameboard", () => {
          const gameboard = new Gameboard();
          expect(gameboard.allShipsSunk()).toBe(true);
        });
      });
    });
  });
});
