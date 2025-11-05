import Game from "./Game";
import Gameboard from "./Gameboard";
import Player from "./Player";
import Ship from "./Ship";
import "./styles.css";
import GameUIView from "./GameUIView";
import {
  DEFAULT_GAMEBOARD_DIMENSIONS,
  DIRECTIONS,
  PLAYER_TYPES,
} from "./utils/constants";
import GameUIControls from "./GameUIControls";
import { createGameboardBoard } from "./utils";
import { transformGameboardBoardCellsToCellStates } from "./Game/utils";
import { CELL_STATES } from "./Game/utils/constants";

console.log("Kamlesh Borana");

// Helper functions
const createAllGameShips = () => {
  return [
    new Ship(5), // Aircraft Carrier
    new Ship(4), // Battleship
    new Ship(3), // Destroyer
    new Ship(3), // Submarine
    new Ship(2), // Patrol Boat
  ];
};

const createShipPlacementInfoObjects = () => {
  const ships = createAllGameShips();
  return ships.map((ship, index) => {
    return {
      ship,
      coordinates: [index, index],
      direction: index % 2 === 0 ? DIRECTIONS.HORIZONTAL : DIRECTIONS.VERTICAL,
    };
  });
};

// Main code
const gameboard1 = new Gameboard();
const gameboard2 = new Gameboard();

const player1 = new Player(PLAYER_TYPES.REAL, gameboard1);
const player2 = new Player(PLAYER_TYPES.COMPUTER, gameboard2);

// player1.addShips(createShipPlacementInfoObjects());
// player2.addShips(createShipPlacementInfoObjects());

const gameUIView = new GameUIView();
const gameUIControls = new GameUIControls();
const game = new Game([player1, player2], gameUIView, gameUIControls);

const randomShipPlacement = (dimensions = DEFAULT_GAMEBOARD_DIMENSIONS) => {
  const ships = createAllGameShips();
  const gameboardBoard = transformGameboardBoardCellsToCellStates(
    createGameboardBoard(dimensions),
    true
  );
  const shipPlacementInfoObjects = [];

  for (const ship of ships) {
    const availableCells = [];
    for (let i = 0; i < gameboardBoard.length; i++) {
      for (let j = 0; j < gameboardBoard[i].length; j++) {
        if (
          gameboardBoard[i][j].toLowerCase() === CELL_STATES.EMPTY.toLowerCase()
        ) {
          availableCells.push([i, j]);
        }
      }
    }
    if (availableCells.length === 0) {
      throw new Error(
        "No available cells found on the gameboard board to place the ship"
      );
    }

    let isValidCellPlacement = false;
    let row, column, randomDirection;
    while (!isValidCellPlacement) {
      const randomAvailableCellIndex = Math.floor(
        Math.random() * availableCells.length
      );
      const randomAvailableCell = availableCells[randomAvailableCellIndex];
      [row, column] = randomAvailableCell;
      randomDirection =
        Math.random() < 0.5 ? DIRECTIONS.HORIZONTAL : DIRECTIONS.VERTICAL;

      if (randomDirection === DIRECTIONS.HORIZONTAL) {
        if (column + ship.length > dimensions[1]) {
          continue;
        }

        let isOverlappingWithAnotherShip = false;
        for (let i = 0; i < ship.length; i++) {
          if (
            gameboardBoard[row][column + i].toLowerCase() !==
            CELL_STATES.EMPTY.toLowerCase()
          ) {
            isOverlappingWithAnotherShip = true;
            break;
          }
        }
        if (isOverlappingWithAnotherShip) {
          continue;
        }
      } else if (randomDirection === DIRECTIONS.VERTICAL) {
        if (row + ship.length > dimensions[0]) {
          continue;
        }

        let isOverlappingWithAnotherShip = false;
        for (let i = 0; i < ship.length; i++) {
          if (
            gameboardBoard[row + i][column].toLowerCase() !==
            CELL_STATES.EMPTY.toLowerCase()
          ) {
            isOverlappingWithAnotherShip = true;
            break;
          }
        }
        if (isOverlappingWithAnotherShip) {
          continue;
        }
      }
      isValidCellPlacement = true;
    }

    for (let i = 0; i < ship.length; i++) {
      if (randomDirection === DIRECTIONS.HORIZONTAL) {
        gameboardBoard[row][column + i] = CELL_STATES.SHIP;
      } else if (randomDirection === DIRECTIONS.VERTICAL) {
        gameboardBoard[row + i][column] = CELL_STATES.SHIP;
      }
    }

    shipPlacementInfoObjects.push({
      ship,
      coordinates: [row, column],
      direction: randomDirection,
    });
  }

  return shipPlacementInfoObjects;
};

player1.addShips(randomShipPlacement());
player2.addShips(randomShipPlacement());

gameUIView.renderPlayerBoard(
  "my-board",
  transformGameboardBoardCellsToCellStates(player1.getBoard(), true)
);

const shuffleButton = document.getElementById("shuffle-button");

shuffleButton.addEventListener("click", () => {
  player1.resetGameboard();
  player1.addShips(randomShipPlacement());
  gameUIView.renderPlayerBoard(
    "my-board",
    transformGameboardBoardCellsToCellStates(player1.getBoard(), true)
  );
});

game.init();
