import {
  CELL_STATES,
  DEFAULT_OPPONENT_BOARD_ID,
  DEFAULT_START_GAME_BUTTON_SELECTOR,
} from "../Game/utils/constants";
import { createUniqueId } from "../utils";
import { validateStartGameInputs } from "./utils/validation";

class GameUIControls {
  #id;
  #boardClickAbortController;

  constructor() {
    this.#id = createUniqueId();
    this.#boardClickAbortController = null;
  }

  get id() {
    return this.#id;
  }

  startGame(callback, options) {
    const validationResult = validateStartGameInputs(callback, options);
    if (!validationResult.isValid) {
      throw new Error(validationResult.message);
    }

    const { startGameOnLoad, startGameOnInteraction, buttonSelector } = options;

    if (startGameOnLoad) {
      callback();
      return;
    }

    if (startGameOnInteraction) {
      const playButton = document.querySelector(buttonSelector);
      playButton.addEventListener("click", callback);
    }
  }

  addAttackEventListenerOnOpponentBoard(callback) {
    const opponentBoard = document.getElementById(DEFAULT_OPPONENT_BOARD_ID);
    if (!opponentBoard) {
      throw new Error(
        `Opponent board with id ${DEFAULT_OPPONENT_BOARD_ID} not found`
      );
    }

    this.#boardClickAbortController = new AbortController();

    opponentBoard.addEventListener(
      "click",
      (event) => {
        if (
          !event.target.classList.contains("cell-container") ||
          event.target.classList.contains(`${CELL_STATES.HIT.toLowerCase()}`) ||
          event.target.classList.contains(
            `${CELL_STATES.MISS.toLowerCase()}`
          ) ||
          event.target.classList.contains(`${CELL_STATES.SUNK.toLowerCase()}`)
        ) {
          return;
        }

        const cell = event.target;
        const cellCoordinates = cell.dataset.cellCoordinates;
        if (!cellCoordinates) {
          throw new Error(
            `Cell coordinates not found on cell container element. The cell container element must have a data-cell-coordinates attribute.`
          );
        }

        const [row, column] = cellCoordinates.split(",").map(Number);
        const coordinates = [row, column];

        callback(coordinates);
      },
      { signal: this.#boardClickAbortController.signal }
    );
  }

  endGame() {
    if (!this.#boardClickAbortController) {
      throw new Error("No board click abort controller found to end the game");
    }

    this.#boardClickAbortController.abort();
    this.#boardClickAbortController = null;
  }

  addPlayAgainEventListener(buttonElementId, callback) {
    const playAgainButton = document.getElementById(buttonElementId);
    if (!playAgainButton) {
      throw new Error(`Play again button with id ${buttonElementId} not found`);
    }

    playAgainButton.addEventListener("click", callback, { once: true });
  }
}

export default GameUIControls;
