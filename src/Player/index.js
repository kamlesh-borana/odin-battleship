import {
  createCoordinatesString,
  createMessageFromTemplate,
  createUniqueId,
} from "../utils";
import {
  addShipErrorMessageTemplate,
  addShipsErrorMessageTemplate,
  getShipAtErrorMessageTemplate,
  placeShipFailedSilentlyErrorMessage,
  receiveAttackErrorMessageTemplate,
} from "./utils/constants";
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
        createMessageFromTemplate(getShipAtErrorMessageTemplate, {
          coordinates: createCoordinatesString(coordinates),
          errorMessage: error.message,
        })
      );
    }
  }

  addShips(ships) {
    const validationResult = validateAddShipsInputs(ships);
    if (!validationResult.isValid) {
      throw new Error(validationResult.message);
    }

    for (const shipInfo of ships) {
      const { ship, coordinates, direction } = shipInfo;
      try {
        const isPlaced = this.#gameboard.placeShip(
          ship,
          coordinates,
          direction
        );
        if (!isPlaced) {
          throw new Error(
            createMessageFromTemplate(addShipsErrorMessageTemplate, {
              errorMessage: placeShipFailedSilentlyErrorMessage,
              shipName: ship.name,
              coordinates: createCoordinatesString(coordinates),
              direction: direction.toLowerCase(),
            })
          );
        }
      } catch (error) {
        throw new Error(
          createMessageFromTemplate(addShipsErrorMessageTemplate, {
            errorMessage: error.message,
            shipName: ship.name,
            coordinates: createCoordinatesString(coordinates),
            direction: direction.toLowerCase(),
          })
        );
      }
    }

    return true;
  }

  addShip(ship, coordinates, direction) {
    try {
      return this.#gameboard.placeShip(ship, coordinates, direction);
    } catch (error) {
      throw new Error(
        createMessageFromTemplate(addShipErrorMessageTemplate, {
          errorMessage: error.message,
          shipName: ship.name,
          coordinates: createCoordinatesString(coordinates),
          direction: direction.toLowerCase(),
        })
      );
    }
  }

  receiveAttack(coordinates) {
    try {
      return this.#gameboard.receiveAttack(coordinates);
    } catch (error) {
      throw new Error(
        createMessageFromTemplate(receiveAttackErrorMessageTemplate, {
          coordinates: createCoordinatesString(coordinates),
          errorMessage: error.message,
        })
      );
    }
  }

  getBoard() {
    return this.#gameboard.getBoard();
  }
}

export default Player;
