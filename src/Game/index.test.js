import Game from ".";
import { createConstructorCallback, createMethodCallback } from "../test-utils";
import {
  createMockGameUIControls,
  createMockGameUIView,
} from "../test-utils/game";
import { createMockPlayer } from "../test-utils/player";
import { PLAYER_TYPES } from "../utils/constants";
import { createGameboardBoardWithDifferentCellStates } from "./test-utils";
import {
  testInvalidGameUIControlsError,
  testInvalidGameUIViewError,
  testInvalidInitOptionsError,
  testInvalidPlayersListError,
} from "./test-utils/validation";
import { transformGameboardBoardCellsToCellStates } from "./utils";
import {
  DEFAULT_START_GAME_BUTTON_SELECTOR,
  gameUIControlsValidationMessages,
  gameUIViewValidationMessages,
  initInputsValidationMessages,
  playersListValidationMessages,
} from "./utils/constants";

describe("Game class module", () => {
  describe("constructor", () => {
    describe("invalid arguments", () => {
      describe("players", () => {
        testInvalidPlayersListError(
          "players",
          createConstructorCallback(Game),
          playersListValidationMessages.invalid
        );
      });

      describe("gameUIView", () => {
        testInvalidGameUIViewError(
          "gameUIView",
          createConstructorCallback(Game, [
            [
              createMockPlayer(PLAYER_TYPES.REAL),
              createMockPlayer(PLAYER_TYPES.COMPUTER),
            ],
          ]),
          gameUIViewValidationMessages.invalid
        );
      });

      describe("gameUIControls", () => {
        testInvalidGameUIControlsError(
          "gameUIControls",
          createConstructorCallback(Game, [
            [
              createMockPlayer(PLAYER_TYPES.REAL),
              createMockPlayer(PLAYER_TYPES.COMPUTER),
            ],
            createMockGameUIView(),
          ]),
          gameUIControlsValidationMessages.invalid
        );
      });
    });

    describe("valid arguments", () => {
      it("should create a game instance if players array contains 2 valid player objects and a valid gameUIView and gameUIControls objects", () => {
        const players = [
          createMockPlayer(PLAYER_TYPES.REAL),
          createMockPlayer(PLAYER_TYPES.COMPUTER),
        ];
        const gameUIView = createMockGameUIView();
        const gameUIControls = createMockGameUIControls();
        expect(new Game(players, gameUIView, gameUIControls)).toBeInstanceOf(
          Game
        );
      });

      it("should create a game instance if players array contains more than 2 valid player objects and a valid gameUIView object", () => {
        const players = [
          createMockPlayer(PLAYER_TYPES.REAL),
          createMockPlayer(PLAYER_TYPES.COMPUTER),
          createMockPlayer(PLAYER_TYPES.REAL),
        ];
        const gameUIView = createMockGameUIView();
        const gameUIControls = createMockGameUIControls();
        expect(new Game(players, gameUIView, gameUIControls)).toBeInstanceOf(
          Game
        );
      });
    });
  });

  describe("game instance", () => {
    describe("properties", () => {
      describe("id", () => {
        it("should return the id of the game", () => {
          const players = [
            createMockPlayer(PLAYER_TYPES.REAL),
            createMockPlayer(PLAYER_TYPES.COMPUTER),
          ];
          const gameUIView = createMockGameUIView();
          const gameUIControls = createMockGameUIControls();
          const game = new Game(players, gameUIView, gameUIControls);
          expect(game.id).toBeDefined();
        });

        it("should return a unique id for each game instance", () => {
          const players1 = [
            createMockPlayer(PLAYER_TYPES.REAL),
            createMockPlayer(PLAYER_TYPES.COMPUTER),
          ];
          const gameUIView1 = createMockGameUIView();
          const gameUIControls1 = createMockGameUIControls();
          const game1 = new Game(players1, gameUIView1, gameUIControls1);

          const players2 = [
            createMockPlayer(PLAYER_TYPES.REAL),
            createMockPlayer(PLAYER_TYPES.COMPUTER),
          ];
          const gameUIView2 = createMockGameUIView();
          const gameUIControls2 = createMockGameUIControls();
          const game2 = new Game(players2, gameUIView2, gameUIControls2);

          expect(game1.id).not.toBe(game2.id);
        });
      });
    });

    describe("methods", () => {
      describe("getPlayerBoards", () => {
        it("should return the transformed boards of the players to be displayed in the UI", () => {
          const players = [
            createMockPlayer(PLAYER_TYPES.REAL),
            createMockPlayer(PLAYER_TYPES.COMPUTER),
          ];
          const gameUIView = createMockGameUIView();
          const gameUIControls = createMockGameUIControls();
          const game = new Game(players, gameUIView, gameUIControls);

          // mock the getBoard method of the players to return the gameboard boards with different cell states
          players[0].getBoard.mockReturnValue(
            createGameboardBoardWithDifferentCellStates()
          );
          players[1].getBoard.mockReturnValue(
            createGameboardBoardWithDifferentCellStates()
          );

          // transform the gameboard boards with different cell states to the cell states to be displayed in the UI
          const transformedPlayer1Board =
            transformGameboardBoardCellsToCellStates(
              players[0].getBoard(),
              true
            );
          const transformedPlayer2Board =
            transformGameboardBoardCellsToCellStates(
              players[1].getBoard(),
              false
            );

          expect(game.getPlayerBoards()).toStrictEqual([
            transformedPlayer1Board,
            transformedPlayer2Board,
          ]);
        });
      });

      describe("init", () => {
        describe("invalid arguments", () => {
          describe("options", () => {
            const game = new Game(
              [
                createMockPlayer(PLAYER_TYPES.REAL),
                createMockPlayer(PLAYER_TYPES.COMPUTER),
              ],
              createMockGameUIView(),
              createMockGameUIControls()
            );
            testInvalidInitOptionsError(
              "options",
              createMethodCallback(game, "init"),
              initInputsValidationMessages.options.invalid
            );
          });
        });

        describe("valid arguments", () => {
          it("should initialize the game by calling the startGame method of the gameUIControls with the callback function and a default init options object", () => {
            const players = [
              createMockPlayer(PLAYER_TYPES.REAL),
              createMockPlayer(PLAYER_TYPES.COMPUTER),
            ];
            const gameUIView = createMockGameUIView();
            const gameUIControls = createMockGameUIControls();
            const game = new Game(players, gameUIView, gameUIControls);

            game.init();

            expect(gameUIControls.startGame).toHaveBeenCalledTimes(1);
            expect(gameUIControls.startGame).toHaveBeenCalledWith(
              expect.any(Function),
              {
                startGameOnLoad: false,
                startGameOnInteraction: true,
                buttonSelector: DEFAULT_START_GAME_BUTTON_SELECTOR,
              }
            );
          });

          it("should initialize the game by calling the startGame method of the gameUIControls with the callback function and a custom init options object", () => {
            const players = [
              createMockPlayer(PLAYER_TYPES.REAL),
              createMockPlayer(PLAYER_TYPES.COMPUTER),
            ];
            const gameUIView = createMockGameUIView();
            const gameUIControls = createMockGameUIControls();
            const game = new Game(players, gameUIView, gameUIControls);

            const customInitOptions = {
              startGameOnLoad: true,
              startGameOnInteraction: false,
              buttonSelector: "#start-game-button",
            };

            game.init(customInitOptions);

            expect(gameUIControls.startGame).toHaveBeenCalledTimes(1);
            expect(gameUIControls.startGame).toHaveBeenCalledWith(
              expect.any(Function),
              customInitOptions
            );
          });
        });
      });

      describe("start", () => {
        it("should render the gameplay UI by calling the renderGameplayUI method of the gameUIView with the correct arguments", () => {
          const players = [
            createMockPlayer(PLAYER_TYPES.REAL),
            createMockPlayer(PLAYER_TYPES.COMPUTER),
          ];
          const gameUIView = createMockGameUIView();
          const gameUIControls = createMockGameUIControls();
          const game = new Game(players, gameUIView, gameUIControls);

          // mock the getBoard method of the players to return the gameboard boards with different cell states
          players[0].getBoard.mockReturnValue(
            createGameboardBoardWithDifferentCellStates()
          );
          players[1].getBoard.mockReturnValue(
            createGameboardBoardWithDifferentCellStates()
          );

          game.start();

          expect(gameUIView.renderGameplayUI).toHaveBeenCalledTimes(1);
          expect(gameUIView.renderGameplayUI).toHaveBeenCalledWith(
            "main-content",
            game.getPlayerBoards()
          );
        });
      });
    });
  });
});
