import Game from ".";
import { createConstructorCallback } from "../test-utils";
import { createMockPlayer } from "../test-utils/player";
import { PLAYER_TYPES } from "../utils/constants";
import { testInvalidPlayersListError } from "./test-utils/validation";
import { playersListValidationMessages } from "./utils/constants";

describe("Game class module", () => {
  describe("constructor", () => {
    describe("invalid arguments", () => {
      describe("players", () => {
        testInvalidPlayersListError(
          "players",
          createConstructorCallback(Game),
          playersListValidationMessages.invalid
        );

        // TODO: Test that the players array elements contains valid player objects with required public interfaces (Duck typing)
      });
    });

    describe("valid arguments", () => {
      it("should create a game instance if players array contains 2 valid player objects", () => {
        const players = [
          createMockPlayer(PLAYER_TYPES.REAL),
          createMockPlayer(PLAYER_TYPES.COMPUTER),
        ];
        expect(new Game(players)).toBeInstanceOf(Game);
      });

      it("should create a game instance if players array contains more than 2 valid player objects", () => {
        const players = [
          createMockPlayer(PLAYER_TYPES.REAL),
          createMockPlayer(PLAYER_TYPES.COMPUTER),
          createMockPlayer(PLAYER_TYPES.REAL),
        ];
        expect(new Game(players)).toBeInstanceOf(Game);
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
          const game = new Game(players);
          expect(game.id).toBeDefined();
        });

        it("should return a unique id for each game instance", () => {
          const players1 = [
            createMockPlayer(PLAYER_TYPES.REAL),
            createMockPlayer(PLAYER_TYPES.COMPUTER),
          ];
          const game1 = new Game(players1);

          const players2 = [
            createMockPlayer(PLAYER_TYPES.REAL),
            createMockPlayer(PLAYER_TYPES.COMPUTER),
          ];
          const game2 = new Game(players2);

          expect(game1.id).not.toBe(game2.id);
        });
      });
    });
  });
});
