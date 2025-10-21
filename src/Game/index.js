import { validateGameInputs } from "./utils";

class Game {
  #id;
  #players;

  constructor(players) {
    const validationResult = validateGameInputs(players);
    if (!validationResult.isValid) {
      throw new Error(validationResult.message);
    }

    this.#id = crypto.randomUUID();
    this.#players = players;
  }

  get id() {
    return this.#id;
  }
}

export default Game;
