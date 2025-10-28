import Player from "..";
import { createMockGameboard } from "../../test-utils/gameboard";
import { createGameboardBoard } from "../../utils";
import { PLAYER_TYPES } from "../../utils/constants";

export function describeGetBoardTests() {
  describe("getBoard", () => {
    // it("should return a 2D array representing the player's gameboard's current board state of being empty initially", () => {
    //   const gameboard = createMockGameboard();
    //   const player = new Player(PLAYER_TYPES.REAL, gameboard);
    //   const expectedBoard = createGameboardBoard(gameboard.dimensions);
    //   // mock the gameboard.getBoard method to return the gameboard's current board state of being empty
    //   gameboard.getBoard.mockReturnValueOnce(expectedBoard);
    //   expect(player.getBoard()).toStrictEqual(expectedBoard);
    // });

    // it("should return a 2D array representing the player's gameboard's current board state after placing a ship", () => {
    //   const gameboard = createMockGameboard();
    //   const player = new Player(PLAYER_TYPES.REAL, gameboard);
    //   const ship = createMockShip(1);
    //   const coordinates = [0, 0];
    //   const direction = DIRECTIONS.HORIZONTAL;
    //   player.addShips([{ ship, coordinates, direction }]);
    //   const expectedBoard = createGameboardBoard(gameboard.dimensions);
    //   expectedBoard[coordinates[0]][coordinates[1]] = {
    //     hit: false,
    //     ship: { id: ship.id, length: ship.length },
    //   };
    //   // mock the gameboard.getBoard method to return the gameboard's current board state after placing a ship
    //   gameboard.getBoard.mockReturnValueOnce(expectedBoard);
    //   expect(player.getBoard()).toStrictEqual(expectedBoard);
    // });

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
