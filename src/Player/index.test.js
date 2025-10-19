import Player from ".";
import { createConstructorCallback, testHasValueError } from "../test-utils";
import {
  PLAYER_TYPES,
  playerGameboardValidationMessages,
  playerTypeValidationMessages,
} from "./utils/constants";

describe("Player class module", () => {
  describe("constructor", () => {
    describe("invalid arguments", () => {
      describe("type", () => {
        const callback = createConstructorCallback(Player);
        testHasValueError(
          "type",
          callback,
          playerTypeValidationMessages.invalid
        );

        it("should throw an error if type is not a string", () => {
          expect(() => new Player(123)).toThrow(
            playerTypeValidationMessages.invalid.notAString
          );
        });

        it("should throw an error if type is not a valid type", () => {
          expect(() => new Player("not a valid type")).toThrow(
            playerTypeValidationMessages.invalid.notAValidType
          );
        });
      });

      describe("gameboard", () => {
        const callback = createConstructorCallback(Player, [PLAYER_TYPES.REAL]);
        testHasValueError(
          "gameboard",
          callback,
          playerGameboardValidationMessages.invalid
        );

        it("should throw an error if gameboard is not an object", () => {
          expect(() => new Player(PLAYER_TYPES.REAL, "not an object")).toThrow(
            playerGameboardValidationMessages.invalid.notAnObject
          );
        });
      });
    });

    describe("valid arguments", () => {
      it("should create a player instance if valid type and gameboard arguments are provided", () => {
        expect(new Player(PLAYER_TYPES.REAL, {})).toBeInstanceOf(Player);
      });
    });

    describe("player instance", () => {
      describe("properties", () => {
        describe("id", () => {
          it("should return the id of the player", () => {
            const player = new Player(PLAYER_TYPES.REAL, {});
            expect(player.id).toBeDefined();
          });

          it("should return a unique id for each player instance", () => {
            const player1 = new Player(PLAYER_TYPES.REAL, {});
            const player2 = new Player(PLAYER_TYPES.REAL, {});
            expect(player1.id).not.toBe(player2.id);
          });
        });

        describe("type", () => {
          it("should return the type of the player passed to the constructor", () => {
            const player = new Player(PLAYER_TYPES.REAL, {});
            const player2 = new Player(PLAYER_TYPES.COMPUTER, {});

            expect(player.type).toBe(PLAYER_TYPES.REAL);
            expect(player2.type).toBe(PLAYER_TYPES.COMPUTER);
          });
        });
      });
    });
  });
});
