import { createUniqueId } from "../utils";
import { validateShipInputs } from "./utils/validation";

class Ship {
  #id;
  #length;
  #hits;

  constructor(length) {
    const validationResult = validateShipInputs(length);
    if (!validationResult.isValid) {
      throw new Error(validationResult.message);
    }

    this.#id = createUniqueId();
    this.#length = length;
    this.#hits = 0;
  }

  get id() {
    return this.#id;
  }

  get length() {
    return this.#length;
  }

  get hits() {
    return this.#hits;
  }

  hit() {
    if (this.#hits < this.#length) {
      this.#hits++;
      return true;
    }

    return false;
  }

  isSunk() {
    return this.#hits >= this.#length;
  }
}

export default Ship;
