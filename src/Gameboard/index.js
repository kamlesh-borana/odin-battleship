import { createGameboardBoard, createUniqueId } from "../utils";
import { DEFAULT_GAMEBOARD_DIMENSIONS, DIRECTIONS } from "../utils/constants";
import { gameboardReceiveAttackValidationMessages } from "./utils/constants";
import {
  validateGameboardInputs,
  validateGetShipAtInputs,
  validateIsCellHitInputs,
  validateIsCellMissHitInputs,
  validatePlaceShipInputs,
  validateReceiveAttackInputs,
} from "./utils/validation";

class Gameboard {
  #id;
  #dimensions;
  #board;
  #ships;

  constructor(dimensions = DEFAULT_GAMEBOARD_DIMENSIONS) {
    const validationResult = validateGameboardInputs(dimensions);
    if (!validationResult.isValid) {
      throw new Error(validationResult.message);
    }

    this.#id = createUniqueId();

    // Copy dimensions to prevent external mutation of internal state
    this.#dimensions = [...dimensions];

    this.#board = createGameboardBoard(this.#dimensions);
    this.#ships = [];
  }

  get id() {
    return this.#id;
  }

  get dimensions() {
    // Returns a copy to prevent external mutation of internal state
    return [...this.#dimensions];
  }

  getShipAt(coordinates) {
    const validationResult = validateGetShipAtInputs(
      coordinates,
      this.#dimensions
    );
    if (!validationResult.isValid) {
      throw new Error(validationResult.message);
    }

    const [row, column] = coordinates;
    const cell = this.#board[row][column];

    if (cell.ship) {
      return cell.ship.getInfo();
    }

    return null;
  }

  isCellHit(coordinates) {
    const validationResult = validateIsCellHitInputs(
      coordinates,
      this.#dimensions
    );
    if (!validationResult.isValid) {
      throw new Error(validationResult.message);
    }

    const [row, column] = coordinates;
    const cell = this.#board[row][column];
    return cell.hit;
  }

  isCellMissHit(coordinates) {
    const validationResult = validateIsCellMissHitInputs(
      coordinates,
      this.#dimensions
    );
    if (!validationResult.isValid) {
      throw new Error(validationResult.message);
    }

    const [row, column] = coordinates;
    const cell = this.#board[row][column];
    return cell.hit && !cell.ship;
  }

  placeShip(ship, coordinates, direction) {
    const validationResult = validatePlaceShipInputs(
      ship,
      coordinates,
      this.#dimensions,
      direction,
      this.#board
    );
    if (!validationResult.isValid) {
      throw new Error(validationResult.message);
    }

    const [row, column] = coordinates;
    const lowerCaseDirection = direction.toLowerCase();

    for (let i = 0; i < ship.length; i++) {
      if (lowerCaseDirection === DIRECTIONS.HORIZONTAL) {
        this.#board[row][column + i].ship = ship;
      } else if (lowerCaseDirection === DIRECTIONS.VERTICAL) {
        this.#board[row + i][column].ship = ship;
      }
    }

    this.#ships.push(ship);

    return true;
  }

  receiveAttack(coordinates) {
    const validationResult = validateReceiveAttackInputs(
      coordinates,
      this.#dimensions,
      this.#board,
      this.#ships.length
    );
    if (!validationResult.isValid) {
      throw new Error(validationResult.message);
    }

    const [row, column] = coordinates;
    const cell = this.#board[row][column];
    cell.hit = true;

    const ship = cell.ship;
    if (ship) {
      const isHit = ship.hit();
      if (!isHit) {
        throw new Error(
          gameboardReceiveAttackValidationMessages.invalid.shipHitFailedSilently
        );
      }
      return true;
    }

    return true;
  }

  allShipsSunk() {
    return this.#ships.every((ship) => ship.isSunk());
  }

  getBoard() {
    const board = this.#board.map((row) =>
      row.map((cell) => ({
        hit: cell.hit,
        ship: cell.ship ? cell.ship.getInfo() : null,
      }))
    );
    return board;
  }
}

export default Gameboard;
