import Player from "..";
import { createMockGameboard } from "../../test-utils/gameboard";
import { createMockShip } from "../../test-utils/ship";
import {
  createCoordinatesString,
  createMessageFromTemplate,
} from "../../utils";
import {
  DIRECTIONS,
  gameboardCoordinatesValidationMessages,
  PLAYER_TYPES,
} from "../../utils/constants";
import { addShipErrorMessageTemplate } from "../utils/constants";

export function describeAddShipTests() {
  describe("addShip", () => {
    it("should add a ship to the player's gameboard if valid ship, coordinates, and direction arguments are provided", () => {
      const gameboard = createMockGameboard();
      const player = new Player(PLAYER_TYPES.REAL, gameboard);
      const ship = createMockShip(1);
      const coordinates = [0, 0];
      const direction = DIRECTIONS.HORIZONTAL;
      player.addShip(ship, coordinates, direction);

      // get the mocked ship info
      const shipInfo = { ...ship.getInfo() };

      // mock the gameboard.getShipAt method to return the ship info
      gameboard.getShipAt.mockReturnValueOnce(shipInfo);

      expect(player.getShipAt(coordinates)).toStrictEqual(shipInfo);
    });

    it("should return true returned by the gameboard.placeShip() method if the ship is placed successfully", () => {
      const gameboard = createMockGameboard();
      const player = new Player(PLAYER_TYPES.REAL, gameboard);
      const ship = createMockShip(1);
      const coordinates = [0, 0];
      const direction = DIRECTIONS.HORIZONTAL;

      // mock the gameboard.placeShip method to return true
      gameboard.placeShip.mockReturnValueOnce(true);

      expect(player.addShip(ship, coordinates, direction)).toBe(true);
    });

    it("should call the gameboard.placeShip() method with the valid ship, coordinates, and direction arguments", () => {
      const gameboard = createMockGameboard();
      const player = new Player(PLAYER_TYPES.REAL, gameboard);
      const ship = createMockShip(1);
      const coordinates = [0, 0];
      const direction = DIRECTIONS.HORIZONTAL;

      player.addShip(ship, coordinates, direction);

      expect(gameboard.placeShip).toHaveBeenCalledWith(
        ship,
        coordinates,
        direction
      );
    });

    it("should throw an error if the gameboard.placeShip() method throws an error", () => {
      const gameboard = createMockGameboard();
      const player = new Player(PLAYER_TYPES.REAL, gameboard);
      const ship = createMockShip(1);
      const coordinates = [8, -2];
      const direction = DIRECTIONS.HORIZONTAL;

      // mock the gameboard.placeShip method to throw an error
      gameboard.placeShip.mockImplementationOnce(() => {
        throw new Error(
          gameboardCoordinatesValidationMessages.invalid.outOfBounds
        );
      });

      expect(() => player.addShip(ship, coordinates, direction)).toThrow(
        createMessageFromTemplate(addShipErrorMessageTemplate, {
          errorMessage:
            gameboardCoordinatesValidationMessages.invalid.outOfBounds,
          shipName: ship.name,
          coordinates: createCoordinatesString(coordinates),
          direction: direction.toLowerCase(),
        })
      );
    });
  });
}
