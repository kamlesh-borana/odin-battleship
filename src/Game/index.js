import { createUniqueId } from "../utils";
import { PLAYER_TYPES } from "../utils/constants";
import { transformGameboardBoardCellsToCellStates } from "./utils";
import {
  CELL_STATES,
  DEFAULT_GAME_INIT_OPTIONS,
  DEFAULT_MY_BOARD_ID,
  DEFAULT_OPPONENT_BOARD_ID,
  DEFAULT_PLAY_AGAIN_BUTTON_ID,
  DEFAULT_START_GAME_BUTTON_SELECTOR,
} from "./utils/constants";
import { validateGameInputs, validateInitInputs } from "./utils/validation";

class Game {
  #id;
  #players;
  #currentPlayerIndex;
  #opponentPlayerIndex;
  #gameUIView;
  #gameUIControls;

  constructor(players, gameUIView, gameUIControls) {
    const validationResult = validateGameInputs(
      players,
      gameUIView,
      gameUIControls
    );
    if (!validationResult.isValid) {
      throw new Error(validationResult.message);
    }

    this.#id = createUniqueId();
    this.#players = [...players];
    this.#currentPlayerIndex = 0;
    this.#opponentPlayerIndex = 1;
    this.#gameUIView = gameUIView;
    this.#gameUIControls = gameUIControls;
  }

  get id() {
    return this.#id;
  }

  getPlayerBoards() {
    return this.#players.map((player) => {
      return transformGameboardBoardCellsToCellStates(
        player.getBoard(),
        player === this.#players[this.#currentPlayerIndex]
      );
    });
  }

  init(options = { ...DEFAULT_GAME_INIT_OPTIONS }) {
    const validationResult = validateInitInputs(options);
    if (!validationResult.isValid) {
      throw new Error(validationResult.message);
    }

    const {
      startGameOnLoad = false,
      startGameOnInteraction = true,
      buttonSelector = DEFAULT_START_GAME_BUTTON_SELECTOR,
    } = options;

    this.#gameUIControls.startGame(this.start.bind(this), {
      startGameOnLoad,
      startGameOnInteraction,
      buttonSelector,
    });
  }

  start() {
    this.#renderGameplayUI();
    this.#addAttackEventListenerOnOpponentBoard();
  }

  #renderGameplayUI() {
    this.#gameUIView.renderGameplayUI("main-content", this.getPlayerBoards());
  }

  #addAttackEventListenerOnOpponentBoard() {
    this.#gameUIControls.addAttackEventListenerOnOpponentBoard(
      this.#attackOnOpponentBoard.bind(this)
    );
  }

  #attackOnOpponentBoard(coordinates) {
    const opponentPlayer = this.#players[this.#opponentPlayerIndex];
    opponentPlayer.receiveAttack(coordinates);

    const playerBoards = this.getPlayerBoards();
    this.#gameUIView.renderPlayerBoard(
      DEFAULT_OPPONENT_BOARD_ID,
      playerBoards[this.#opponentPlayerIndex]
    );

    if (!this.#isGameOver(this.#opponentPlayerIndex)) {
      this.#switchPlayer();
    } else {
      this.#handleGameOver("win");
    }
  }

  #switchPlayer() {
    if (this.#players.length > 2) {
      // TODO: Implement the logic to handle the case when there are more than 2 players
    } else if (
      this.#players[this.#opponentPlayerIndex].type === PLAYER_TYPES.REAL
    ) {
      // Switch player indices
      [this.#currentPlayerIndex, this.#opponentPlayerIndex] = [
        this.#opponentPlayerIndex,
        this.#currentPlayerIndex,
      ];

      // TODO: Implement the logic to handle the case when the current player after switching is a real player
    } else {
      this.#computerPlayerTurn(this.#currentPlayerIndex, DEFAULT_MY_BOARD_ID);
    }
  }

  #computerPlayerTurn(playerIndex, boardId) {
    const coordinates = this.#calculateAttackCoordinates(
      transformGameboardBoardCellsToCellStates(
        this.#players[playerIndex].getBoard(),
        false
      )
    );
    this.#players[playerIndex].receiveAttack(coordinates);

    const playerBoards = this.getPlayerBoards();
    this.#gameUIView.renderPlayerBoard(boardId, playerBoards[playerIndex]);

    if (this.#isGameOver(playerIndex)) {
      this.#handleGameOver("lose");
    }
  }

  #calculateAttackCoordinates(playerBoard) {
    const emptyCells = [];
    for (let i = 0; i < playerBoard.length; i++) {
      for (let j = 0; j < playerBoard[i].length; j++) {
        if (
          playerBoard[i][j].toLowerCase() === CELL_STATES.EMPTY.toLowerCase()
        ) {
          emptyCells.push([i, j]);
        }
      }
    }
    if (emptyCells.length === 0) {
      throw new Error("No empty cells found on the player board to attack");
    }

    const randomEmptyCellIndex = Math.floor(Math.random() * emptyCells.length);
    const randomEmptyCell = emptyCells[randomEmptyCellIndex];
    const [row, column] = randomEmptyCell;
    return [row, column];
  }

  #isGameOver(playerIndex) {
    return this.#players[playerIndex].allShipsSunk();
  }

  #handleGameOver(result) {
    this.#gameUIControls.endGame();
    this.#gameUIView.renderGameOverUI("main-content", result);
    this.#gameUIControls.addPlayAgainEventListener(
      DEFAULT_PLAY_AGAIN_BUTTON_ID,
      this.#playAgain.bind(this)
    );
  }

  #playAgain() {
    window.location.reload();
  }
}

export default Game;
