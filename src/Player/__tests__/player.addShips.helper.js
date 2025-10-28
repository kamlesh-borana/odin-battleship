import Player from "..";
import { createMethodCallback } from "../../test-utils";
import { testInvalidShipsError } from "../../test-utils/game";
import { createMockGameboard } from "../../test-utils/gameboard";
import { createMockShip } from "../../test-utils/ship";
import {
  DIRECTIONS,
  PLAYER_TYPES,
  shipsValidationMessages,
} from "../../utils/constants";
import { VALID_ADD_SHIPS_INPUTS } from "../test-utils/constants";

export function describeAddShipsTests() {
  describe("addShips", () => {
    describe("invalid arguments", () => {
      describe("ships", () => {
        const player = new Player(PLAYER_TYPES.REAL, createMockGameboard());
        const callback = createMethodCallback(player, "addShips");
        testInvalidShipsError(
          "ships",
          callback,
          shipsValidationMessages.invalid
        );
      });
    });

    describe("valid arguments", () => {
      it("should add a ship to the player's gameboard if a valid ship placement information object is provided", () => {
        const gameboard = createMockGameboard();
        const player = new Player(PLAYER_TYPES.REAL, gameboard);
        const ship = createMockShip(1);
        const coordinates = [0, 0];
        const direction = DIRECTIONS.HORIZONTAL;
        player.addShips([{ ship, coordinates, direction }]);

        // mock the gameboard.getShipAt method to return the ship
        gameboard.getShipAt.mockReturnValueOnce(ship);

        expect(player.getShipAt(coordinates)).toBe(ship);
      });

      it("should add multiple ships to the player's gameboard if multiple valid ship placement information objects are provided", () => {
        const gameboard = createMockGameboard();
        const player = new Player(PLAYER_TYPES.REAL, gameboard);
        const ship1 = createMockShip(1);
        const coordinates1 = [0, 0];
        const direction1 = DIRECTIONS.HORIZONTAL;
        const ship2 = createMockShip(2);
        const coordinates2 = [1, 0];
        const direction2 = DIRECTIONS.VERTICAL;
        player.addShips([
          {
            ship: ship1,
            coordinates: coordinates1,
            direction: direction1,
          },
          {
            ship: ship2,
            coordinates: coordinates2,
            direction: direction2,
          },
        ]);

        // mock the gameboard.getShipAt method to return the ships
        gameboard.getShipAt
          .mockReturnValueOnce(ship1)
          .mockReturnValueOnce(ship2);

        expect(player.getShipAt(coordinates1)).toBe(ship1);
        expect(player.getShipAt(coordinates2)).toBe(ship2);
      });

      it.each(VALID_ADD_SHIPS_INPUTS)(
        "should call the gameboard.placeShip() method %i times for each valid ship placement information object in the ships array",
        (numberOfCalls, ships) => {
          const gameboard = createMockGameboard();
          const player = new Player(PLAYER_TYPES.REAL, gameboard);
          player.addShips(ships);
          expect(gameboard.placeShip).toHaveBeenCalledTimes(numberOfCalls);
        }
      );
    });
  });
}
