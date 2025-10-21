import Game from ".";
import {
  createConstructorCallback,
  testArrayOfAtLeast2ElementsError,
} from "../test-utils";
import { gamePlayersValidationMessages } from "./utils/constants";

describe("Game class module", () => {
  describe("constructor", () => {
    describe("invalid arguments", () => {
      describe("players", () => {
        const callback = createConstructorCallback(Game);
        testArrayOfAtLeast2ElementsError(
          "players",
          callback,
          gamePlayersValidationMessages.invalid
        );

        it("should throw an error if players array elements are not objects", () => {
          expect(() => new Game(["not an object", "not an object"])).toThrow(
            gamePlayersValidationMessages.invalid.notAnArrayOfPlayerObjects
          );
        });

        // TODO: Test that the players array elements contains valid player objects with required public interfaces (Duck typing)
      });
    });

    describe("valid arguments", () => {
      it("should create a game instance if players array contains 2 valid player objects", () => {
        expect(new Game([{}, {}])).toBeInstanceOf(Game);
      });

      it("should create a game instance if players array contains more than 2 valid player objects", () => {
        expect(new Game([{}, {}, {}])).toBeInstanceOf(Game);
      });
    });
  });

  describe("game instance", () => {
    describe("properties", () => {
      describe("id", () => {
        it("should return the id of the game", () => {
          const game = new Game([{}, {}]);
          expect(game.id).toBeDefined();
        });

        it("should return a unique id for each game instance", () => {
          const game1 = new Game([{}, {}]);
          const game2 = new Game([{}, {}]);
          expect(game1.id).not.toBe(game2.id);
        });
      });
    });
  });
});
