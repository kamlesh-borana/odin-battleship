import Player from "..";
import { createMethodCallback } from "../../test-utils";
import { DEFAULT_OUT_OF_BOUNDS_COORDINATES } from "../../test-utils/constants";
import {
  createMockGameboard,
  testInvalidGameboardCoordinatesError,
} from "../../test-utils/gameboard";
import { createMockShip } from "../../test-utils/ship";
import {
  gameboardCoordinatesValidationMessages,
  PLAYER_TYPES,
} from "../../utils/constants";

export function describeGetShipAtTests() {
  describe("getShipAt", () => {
    describe("invalid arguments", () => {
      describe("coordinates", () => {
        const player = new Player(PLAYER_TYPES.REAL, createMockGameboard());
        const options = {
          checkCoordinatesOutOfBoundsError: true,
          outOfBoundsCoordinatesList: DEFAULT_OUT_OF_BOUNDS_COORDINATES,
        };
        testInvalidGameboardCoordinatesError(
          "coordinates",
          createMethodCallback(player, "getShipAt"),
          gameboardCoordinatesValidationMessages.invalid,
          options
        );
      });
    });

    describe("valid arguments", () => {
      //   it("should return the ship if there is a ship at the given coordinates", () => {
      //     const gameboard = createMockGameboard();
      //     const player = new Player(PLAYER_TYPES.REAL, gameboard);
      //     const ship = createMockShip(1);
      //     const coordinates = [0, 0];
      //     const direction = DIRECTIONS.HORIZONTAL;
      //     player.addShips([{ ship, coordinates, direction }]);

      //     // mock the gameboard.getShipAt method to return the ship
      //     gameboard.getShipAt.mockReturnValueOnce(ship);

      //     expect(player.getShipAt(coordinates)).toBe(ship);
      //   });

      //   it("should return null if there is no ship at the given coordinates", () => {
      //     const gameboard = createMockGameboard();
      //     const player = new Player(PLAYER_TYPES.REAL, gameboard);
      //     const ship = createMockShip(1);
      //     const coordinates = [0, 0];
      //     const direction = DIRECTIONS.HORIZONTAL;
      //     player.addShips([{ ship, coordinates, direction }]);

      //     // mock the gameboard.getShipAt method to return null
      //     gameboard.getShipAt.mockReturnValueOnce(null);

      //     expect(player.getShipAt([1, 1])).toBeNull();
      //   });

      //   it("should return null if the player has no ships placed", () => {
      //     const gameboard = createMockGameboard();
      //     const player = new Player(PLAYER_TYPES.REAL, gameboard);

      //     // mock the gameboard.getShipAt method to return null
      //     gameboard.getShipAt.mockReturnValueOnce(null);

      //     expect(player.getShipAt([0, 0])).toBeNull();
      //   });

      it("should return the same ship object returned by the gameboard.getShipAt() method if there is a ship at the given coordinates", () => {
        const gameboard = createMockGameboard();
        const player = new Player(PLAYER_TYPES.REAL, gameboard);
        const ship = createMockShip(1);

        // mock the gameboard.getShipAt method to return the ship object
        gameboard.getShipAt.mockReturnValueOnce(ship);

        expect(player.getShipAt([0, 0])).toBe(ship);
      });

      it("should return the null value returned by the gameboard.getShipAt() method if there is no ship at the given coordinates", () => {
        const gameboard = createMockGameboard();
        const player = new Player(PLAYER_TYPES.REAL, gameboard);

        // mock the gameboard.getShipAt method to return null
        gameboard.getShipAt.mockReturnValueOnce(null);

        expect(player.getShipAt([0, 0])).toBeNull();
      });
    });
  });
}
