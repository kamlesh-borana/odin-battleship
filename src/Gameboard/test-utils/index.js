import { createMockShip } from "../../test-utils/ship";
import { DIRECTIONS } from "../../utils/constants";

export const createAndPlaceMultipleShipsOnGameboard = (gameboard) => {
  const ships = [
    createMockShip(5),
    createMockShip(4),
    createMockShip(3),
    createMockShip(3),
    createMockShip(2),
  ];

  const coordinatesList = [
    [0, 0],
    [1, 1],
    [2, 2],
    [3, 3],
    [4, 4],
  ];

  const directionsList = [
    DIRECTIONS.HORIZONTAL,
    DIRECTIONS.VERTICAL,
    DIRECTIONS.HORIZONTAL,
    DIRECTIONS.VERTICAL,
    DIRECTIONS.HORIZONTAL,
  ];

  for (let i = 0; i < ships.length; i++) {
    gameboard.placeShip(ships[i], coordinatesList[i], directionsList[i]);
  }

  return {
    ships,
    coordinatesList,
    directionsList,
  };
};

export const addShipToExpectedBoard = (
  expectedBoard,
  ship,
  coordinates,
  direction
) => {
  const [row, column] = coordinates;
  for (let i = 0; i < ship.length; i++) {
    if (direction === DIRECTIONS.HORIZONTAL) {
      expectedBoard[row][column + i] = {
        hit: false,
        ship: { id: ship.id, length: ship.length },
      };
    } else if (direction === DIRECTIONS.VERTICAL) {
      expectedBoard[row + i][column] = {
        hit: false,
        ship: { id: ship.id, length: ship.length },
      };
    }
  }
};
