import {
  CELL_STATES,
  DEFAULT_MY_BOARD_ID,
  DEFAULT_OPPONENT_BOARD_ID,
  DEFAULT_PLAY_AGAIN_BUTTON_ID,
} from "../Game/utils/constants";
import { createUniqueId } from "../utils";
import { createElement } from "./utils";
import {
  validateRenderGameplayUIInputs,
  validateRenderPlayerBoardInputs,
} from "./utils/validation";

class GameUIView {
  #id;

  constructor() {
    this.#id = createUniqueId();
  }

  get id() {
    return this.#id;
  }

  renderGameplayUI(elementId, playerBoards) {
    const validationResult = validateRenderGameplayUIInputs(
      elementId,
      playerBoards
    );
    if (!validationResult.isValid) {
      throw new Error(validationResult.message);
    }

    const gameplayContainer = document.getElementById(elementId);
    gameplayContainer.innerHTML = "";

    const playerBoardsContainer = createElement("div", {
      classNames: ["boards-container"],
    });
    gameplayContainer.appendChild(playerBoardsContainer);

    for (let i = 0; i < playerBoards.length; i++) {
      const playerBoard = playerBoards[i];

      const boardSection = createElement("div", {
        classNames: ["board-section", i === 0 ? "my-board" : "opponent-board"],
      });
      playerBoardsContainer.appendChild(boardSection);

      const boardHeader = createElement("h2", {
        classNames: ["board-header"],
        innerHTML: i === 0 ? "My Board" : "Opponent's Board",
      });
      boardSection.appendChild(boardHeader);

      const playerBoardContainer = createElement("div", {
        id: i === 0 ? DEFAULT_MY_BOARD_ID : DEFAULT_OPPONENT_BOARD_ID,
        classNames: ["board-container"],
      });
      boardSection.appendChild(playerBoardContainer);

      for (let j = 0; j < playerBoard.length; j++) {
        const row = playerBoard[j];

        const rowContainer = createElement("div", {
          classNames: ["row-container"],
        });
        playerBoardContainer.appendChild(rowContainer);

        for (let k = 0; k < row.length; k++) {
          const cell = row[k];

          const cellContainer = createElement("div", {
            classNames: ["cell-container", cell.toLowerCase()],
            attributes: {
              "data-cell-coordinates": `${j},${k}`,
            },
          });
          rowContainer.appendChild(cellContainer);

          // if (cell.toLowerCase() === CELL_STATES.EMPTY.toLowerCase()) {
          //   // cellContainer.innerHTML = "🟦";
          // } else if (cell.toLowerCase() === CELL_STATES.SHIP.toLowerCase()) {
          //   // cellContainer.innerHTML = "🚢";
          // } else if (cell.toLowerCase() === CELL_STATES.HIT.toLowerCase()) {
          //   // cellContainer.innerHTML = "💥";
          // } else if (cell.toLowerCase() === CELL_STATES.MISS.toLowerCase()) {
          //   // cellContainer.innerHTML = "💦";
          // } else if (cell.toLowerCase() === CELL_STATES.SUNK.toLowerCase()) {
          //   // cellContainer.innerHTML = "💀";
          // }
        }
      }
    }
  }

  renderPlayerBoard(elementId, playerBoard) {
    const validationResult = validateRenderPlayerBoardInputs(
      elementId,
      playerBoard
    );
    if (!validationResult.isValid) {
      throw new Error(validationResult.message);
    }

    const playerBoardContainer = document.getElementById(elementId);
    playerBoardContainer.innerHTML = "";

    for (let i = 0; i < playerBoard.length; i++) {
      const row = playerBoard[i];

      const rowContainer = createElement("div", {
        classNames: ["row-container"],
      });
      playerBoardContainer.appendChild(rowContainer);

      for (let j = 0; j < row.length; j++) {
        const cell = row[j];

        const cellContainer = createElement("div", {
          classNames: ["cell-container", cell.toLowerCase()],
          attributes: {
            "data-cell-coordinates": `${i},${j}`,
          },
        });
        rowContainer.appendChild(cellContainer);
      }
    }
  }

  renderGameOverUI(elementId, result) {
    // const validationResult = validateRenderGameOverUIInputs(elementId, result);
    // if (!validationResult.isValid) {
    //   throw new Error(validationResult.message);
    // }

    const gameplayContainer = document.getElementById(elementId);

    const gameOverMessage = createElement("p", {
      classNames: ["game-over-message", result === "win" ? "win" : "lose"],
      innerHTML: result === "win" ? "You won!" : "You lost!",
    });
    gameplayContainer.prepend(gameOverMessage);

    const actionButtonsContainer = createElement("div", {
      classNames: ["action-buttons-container"],
    });
    gameplayContainer.appendChild(actionButtonsContainer);

    const playAgainButton = createElement("button", {
      id: DEFAULT_PLAY_AGAIN_BUTTON_ID,
      classNames: ["action-button", "play-again"],
      innerHTML: "Play Again",
    });
    actionButtonsContainer.appendChild(playAgainButton);
  }
}

export default GameUIView;
