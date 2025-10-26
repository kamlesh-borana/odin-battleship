import { createUniqueId } from "../utils";
import { createGameboardBoard } from "./utils";
import { DEFAULT_GAMEBOARD_DIMENSIONS, DIRECTIONS } from "./utils/constants";
import {
  validateGameboardInputs,
  validateGetShipAtInputs,
  validateIsCellHitInputs,
  validateIsCellMissInputs,
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
    return this.#board[row][column].ship;
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
    return this.#board[row][column].hit;
  }

  isCellMiss(coordinates) {
    const validationResult = validateIsCellMissInputs(
      coordinates,
      this.#dimensions
    );
    if (!validationResult.isValid) {
      throw new Error(validationResult.message);
    }

    const [row, column] = coordinates;
    return this.#board[row][column].hit && !this.#board[row][column].ship;
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
      ship.hit();
    }
  }

  allShipsSunk() {
    return this.#ships.every((ship) => ship.isSunk());
  }
}

export default Gameboard;
