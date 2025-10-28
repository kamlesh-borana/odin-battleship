import { createUniqueId } from "../utils";
import { validateGameInputs } from "./utils/validation";

class Game {
  #id;
  #players;

  constructor(players) {
    const validationResult = validateGameInputs(players);
    if (!validationResult.isValid) {
      throw new Error(validationResult.message);
    }

    this.#id = createUniqueId();
    this.#players = [...players];
  }

  get id() {
    return this.#id;
  }
}

export default Game;
