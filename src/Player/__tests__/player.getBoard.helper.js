import Player from "..";
import { createMockGameboard } from "../../test-utils/gameboard";
import { createGameboardBoard } from "../../utils";
import { PLAYER_TYPES } from "../../utils/constants";

export function describeGetBoardTests() {
  describe("getBoard", () => {
    it("should return the same 2D array representing the player's gameboard's current board state returned by the gameboard.getBoard() method", () => {
      const gameboard = createMockGameboard();
      const player = new Player(PLAYER_TYPES.REAL, gameboard);

      const expectedBoard = createGameboardBoard(gameboard.dimensions);

      // mock the gameboard.getBoard() method to return the gameboard's current board state
      gameboard.getBoard.mockReturnValueOnce(expectedBoard);

      expect(player.getBoard()).toBe(expectedBoard);
    });
  });
}
