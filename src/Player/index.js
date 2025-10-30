import { createUniqueId } from "../utils";
import {
  validateAddShipsInputs,
  validatePlayerInputs,
} from "./utils/validation";

class Player {
  #id;
  #type;
  #gameboard;

  constructor(type, gameboard) {
    const validationResult = validatePlayerInputs(type, gameboard);
    if (!validationResult.isValid) {
      throw new Error(validationResult.message);
    }

    this.#id = createUniqueId();
    this.#type = type.toLowerCase(); // Convert to lowercase to ensure consistency
    this.#gameboard = gameboard;
  }

  get id() {
    return this.#id;
  }

  get type() {
    return this.#type;
  }

  getShipAt(coordinates) {
    try {
      return this.#gameboard.getShipAt(coordinates);
    } catch (error) {
      throw new Error(
        `Failed to get ship at coordinates ${coordinates} - ${error.message}`
      );
    }
  }

  addShips(ships) {
    const validationResult = validateAddShipsInputs(
      ships,
      this.#gameboard.dimensions
    );
    if (!validationResult.isValid) {
      throw new Error(validationResult.message);
    }

    for (const shipInfo of ships) {
      const { ship, coordinates, direction } = shipInfo;
      this.#gameboard.placeShip(ship, coordinates, direction);
    }
  }

  getBoard() {
    return this.#gameboard.getBoard();
  }
}

export default Player;
