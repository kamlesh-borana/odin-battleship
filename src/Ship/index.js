import { createUniqueId } from "../utils";
import { SHIP_NAMES } from "../utils/constants";
import { validateShipInputs } from "./utils/validation";

class Ship {
  #id;
  #length;
  #name;
  #hits;

  constructor(length, name = SHIP_NAMES.DEFAULT) {
    const validationResult = validateShipInputs(length, name);
    if (!validationResult.isValid) {
      throw new Error(validationResult.message);
    }

    this.#id = createUniqueId();
    this.#length = length;
    this.#name = name.trim(); // Remove leading and trailing whitespace
    this.#hits = 0;
  }

  get id() {
    return this.#id;
  }

  get length() {
    return this.#length;
  }

  get name() {
    return this.#name;
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
