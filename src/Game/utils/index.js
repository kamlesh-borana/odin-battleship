import { CELL_STATES } from "./constants";

export const transformGameboardBoardCellsToCellStates = (
  board,
  isCurrentPlayerBoard = false
) => {
  // Transform the board to show the cell states to be displayed in the UI
  const transformedBoard = board.map((row) => {
    return row.map((cell) => {
      // If the cell is not hit
      if (!cell.hit) {
        // Check if the cell has a ship
        if (!cell.ship) {
          // If the cell has no ship, it is empty
          return CELL_STATES.EMPTY;
        } else {
          // If the cell has a ship, check if it is the current player's board
          if (isCurrentPlayerBoard) {
            // If it is the current player's board, show the ship
            return CELL_STATES.SHIP;
          }
          // If it is the opponent's board, show the empty cell as it is not visible to the opponent
          return CELL_STATES.EMPTY;
        }
      } else {
        // If the cell is hit
        // Check if the cell has no ship
        if (!cell.ship) {
          // If the cell has no ship, it is a miss
          return CELL_STATES.MISS;
        } else {
          // If the cell has a ship, check if it is sunk
          if (cell.ship.isSunk) {
            // If the ship is sunk, it is a sunk cell
            return CELL_STATES.SUNK;
          } else {
            // If the ship is not sunk, it is a hit cell
            return CELL_STATES.HIT;
          }
        }
      }
    });
  });

  // Return the transformed board
  return transformedBoard;
};
