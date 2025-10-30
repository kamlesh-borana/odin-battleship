import { createUniqueId } from "../utils";
import {
  validateAddShipsInputs,
  validateGetShipAtInputs,
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
    const validationResult = validateGetShipAtInputs(
      coordinates,
      this.#gameboard.dimensions
    );
    if (!validationResult.isValid) {
      throw new Error(validationResult.message);
    }

    return this.#gameboard.getShipAt(coordinates);
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
