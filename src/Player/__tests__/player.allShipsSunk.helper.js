import Player from "..";
import { createMockGameboard } from "../../test-utils/gameboard";
import { PLAYER_TYPES } from "../../utils/constants";

export function describeAllShipsSunkTests() {
  describe("allShipsSunk", () => {
    it("should return true returned by the gameboard.allShipsSunk() method if all ships on the player's gameboard are sunk", () => {
      const gameboard = createMockGameboard();
      const player = new Player(PLAYER_TYPES.REAL, gameboard);

      // Mock the allShipsSunk method of the gameboard to return true
      gameboard.allShipsSunk.mockReturnValue(true);

      expect(player.allShipsSunk()).toBe(true);
    });

    it("should return false returned by the gameboard.allShipsSunk() method if not all ships on the player's gameboard are sunk", () => {
      const gameboard = createMockGameboard();
      const player = new Player(PLAYER_TYPES.REAL, gameboard);

      // Mock the allShipsSunk method of the gameboard to return false
      gameboard.allShipsSunk.mockReturnValue(false);

      expect(player.allShipsSunk()).toBe(false);
    });
  });
}
