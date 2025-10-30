import Player from "..";
import { createMockGameboard } from "../../test-utils/gameboard";
import { createMockShip } from "../../test-utils/ship";
import {
  gameboardCoordinatesValidationMessages,
  PLAYER_TYPES,
} from "../../utils/constants";

export function describeGetShipAtTests() {
  describe("getShipAt", () => {
    it("should return the ship info returned by the gameboard.getShipAt() method if there is a ship at the given coordinates", () => {
      const gameboard = createMockGameboard();
      const player = new Player(PLAYER_TYPES.REAL, gameboard);
      const ship = createMockShip(1);

      // get the mocked ship info
      const shipInfo = { ...ship.getInfo() };

      // mock the gameboard.getShipAt method to return the ship info
      gameboard.getShipAt.mockReturnValueOnce(shipInfo);

      expect(player.getShipAt([0, 0])).toStrictEqual(shipInfo);
    });

    it("should return null returned by the gameboard.getShipAt() method if there is no ship at the given coordinates", () => {
      const gameboard = createMockGameboard();
      const player = new Player(PLAYER_TYPES.REAL, gameboard);

      // mock the gameboard.getShipAt() method to return null
      gameboard.getShipAt.mockReturnValueOnce(null);

      expect(player.getShipAt([0, 0])).toBeNull();
    });

    it("should throw an error message if the gameboard.getShipAt() method throws an error", () => {
      const gameboard = createMockGameboard();
      const player = new Player(PLAYER_TYPES.REAL, gameboard);

      // mock the gameboard.getShipAt() method to throw an error
      gameboard.getShipAt.mockImplementationOnce(() => {
        throw new Error(
          gameboardCoordinatesValidationMessages.invalid.outOfBounds
        );
      });

      const coordinates = [8, -2];
      expect(() => player.getShipAt(coordinates)).toThrow(
        `Failed to get ship at coordinates ${coordinates} - ${gameboardCoordinatesValidationMessages.invalid.outOfBounds}`
      );
    });
  });
}
