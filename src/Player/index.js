import { createUniqueId } from "../utils";
import { validatePlayerInputs } from "./utils/validation";

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
    this.#type = type;
    this.#gameboard = gameboard;
  }

  get id() {
    return this.#id;
  }

  get type() {
    return this.#type;
  }
}

export default Player;
