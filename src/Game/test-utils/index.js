import { createMockShip } from "../../test-utils/ship";
import { createGameboardBoard } from "../../utils";
import { DEFAULT_GAMEBOARD_DIMENSIONS } from "../../utils/constants";

export const createGameboardBoardWithDifferentCellStates = () => {
  // Create a gameboard board with empty cells
  const board = createGameboardBoard(DEFAULT_GAMEBOARD_DIMENSIONS);

  // Place a ship of length 5 at coordinates [0, 0] in the horizontal direction
  const ship1 = createMockShip(5);
  board[0][0] = { hit: false, ship: ship1 };
  board[0][1] = { hit: false, ship: ship1 };
  board[0][2] = { hit: false, ship: ship1 };
  board[0][3] = { hit: false, ship: ship1 };
  board[0][4] = { hit: false, ship: ship1 };

  // Place a ship of length 4 at coordinates [1, 1] in the vertical direction
  const ship2 = createMockShip(4);
  board[1][1] = { hit: false, ship: ship2 };
  board[2][1] = { hit: false, ship: ship2 };
  board[3][1] = { hit: false, ship: ship2 };
  board[4][1] = { hit: false, ship: ship2 };

  // Place a ship of length 3 at coordinates [2, 2] in the horizontal direction
  const ship3 = createMockShip(3);
  board[2][2] = { hit: false, ship: ship3 };
  board[2][3] = { hit: false, ship: ship3 };
  board[2][4] = { hit: false, ship: ship3 };

  // Place a ship of length 3 at coordinates [3, 3] in the vertical direction
  const ship4 = createMockShip(3);
  board[3][3] = { hit: false, ship: ship4 };
  board[4][3] = { hit: false, ship: ship4 };
  board[5][3] = { hit: false, ship: ship4 };

  // Place a ship of length 2 at coordinates [4, 4] in the horizontal direction
  const ship5 = createMockShip(2);
  board[4][4] = { hit: false, ship: ship5 };
  board[4][5] = { hit: false, ship: ship5 };

  // Attack some cells with no ships placed to mark them as missed
  board[5][0] = { hit: true, ship: null };
  board[8][1] = { hit: true, ship: null };
  board[3][2] = { hit: true, ship: null };
  board[9][3] = { hit: true, ship: null };
  board[6][4] = { hit: true, ship: null };
  board[3][5] = { hit: true, ship: null };
  board[1][6] = { hit: true, ship: null };
  board[4][7] = { hit: true, ship: null };
  board[5][8] = { hit: true, ship: null };
  board[2][9] = { hit: true, ship: null };

  // Attack ship1 to mark it as sunk
  board[0][0] = { hit: true, ship: ship1 };
  board[0][1] = { hit: true, ship: ship1 };
  board[0][2] = { hit: true, ship: ship1 };
  board[0][3] = { hit: true, ship: ship1 };
  board[0][4] = { hit: true, ship: ship1 };
  // Mock the isSunk() method of the first ship to return true
  ship1.isSunk.mockReturnValue(true);
  // Mock the getInfo() method of the first ship to return the correct info
  ship1.getInfo.mockReturnValue({
    ...ship1.getInfo(),
    hits: 5,
    isSunk: true,
  });

  // Attack ship2 to mark it as hit but not sunk
  board[1][1] = { hit: true, ship: ship2 };
  board[3][1] = { hit: true, ship: ship2 };
  // Mock the isSunk() method of the second ship to return false
  ship2.isSunk.mockReturnValue(false);
  // Mock the getInfo() method of the second ship to return the correct info
  ship2.getInfo.mockReturnValue({
    ...ship2.getInfo(),
    hits: 2,
    isSunk: false,
  });

  // Attack ship3 to mark it as sunk
  board[2][2] = { hit: true, ship: ship3 };
  board[2][3] = { hit: true, ship: ship3 };
  board[2][4] = { hit: true, ship: ship3 };
  // Mock the isSunk() method of the third ship to return true
  ship3.isSunk.mockReturnValue(true);
  // Mock the getInfo() method of the third ship to return the correct info
  ship3.getInfo.mockReturnValue({
    ...ship3.getInfo(),
    hits: 3,
    isSunk: true,
  });

  // Attack ship4 to mark it as hit but not sunk
  board[5][3] = { hit: true, ship: ship4 };
  // Mock the isSunk() method of the fourth ship to return false
  ship4.isSunk.mockReturnValue(false);
  // Mock the getInfo() method of the fourth ship to return the correct info
  ship4.getInfo.mockReturnValue({
    ...ship4.getInfo(),
    hits: 1,
    isSunk: false,
  });

  // Ship5 is not attacked yet
  // Mock the isSunk() method of the fifth ship to return false
  ship5.isSunk.mockReturnValue(false);
  // Mock the getInfo() method of the fifth ship to return the correct info
  ship5.getInfo.mockReturnValue({
    ...ship5.getInfo(),
    hits: 0,
    isSunk: false,
  });

  // Return the board
  return board;
};
