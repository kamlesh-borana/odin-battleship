import Player from "..";
import { createConstructorCallback } from "../../test-utils";
import {
  createMockGameboard,
  testInvalidGameboardError,
} from "../../test-utils/gameboard";
import { testInvalidPlayerTypeError } from "../../test-utils/player";
import {
  gameboardValidationMessages,
  PLAYER_TYPES,
  playerTypeValidationMessages,
} from "../../utils/constants";
import { describeAddShipsTests } from "./player.addShips.helper";
import { describeGetBoardTests } from "./player.getBoard.helper";
import { describeGetShipAtTests } from "./player.getShipAt.helper";

describe("Player class module", () => {
  describe("constructor", () => {
    describe("invalid arguments", () => {
      describe("type", () => {
        testInvalidPlayerTypeError(
          "type",
          createConstructorCallback(Player),
          playerTypeValidationMessages.invalid
        );
      });

      describe("gameboard", () => {
        testInvalidGameboardError(
          "gameboard",
          createConstructorCallback(Player, [PLAYER_TYPES.REAL]),
          gameboardValidationMessages.invalid
        );
      });
    });

    describe("valid arguments", () => {
      it("should create a player instance if valid type and gameboard arguments are provided", () => {
        expect(
          new Player(PLAYER_TYPES.REAL, createMockGameboard())
        ).toBeInstanceOf(Player);
      });

      it("should create a player instance if a valid lowercase type and gameboard arguments are provided", () => {
        expect(new Player("real", createMockGameboard())).toBeInstanceOf(
          Player
        );
      });

      it("should create a player instance if a valid uppercase type and gameboard arguments are provided", () => {
        expect(new Player("REAL", createMockGameboard())).toBeInstanceOf(
          Player
        );
      });

      it("should create a player instance if a valid mixed case type and gameboard arguments are provided", () => {
        expect(new Player("CoMpUtEr", createMockGameboard())).toBeInstanceOf(
          Player
        );
      });
    });

    describe("player instance", () => {
      describe("properties", () => {
        describe("id", () => {
          it("should return the id of the player", () => {
            const player = new Player(PLAYER_TYPES.REAL, createMockGameboard());
            expect(player.id).toBeDefined();
          });

          it("should return a unique id for each player instance", () => {
            const player1 = new Player(
              PLAYER_TYPES.REAL,
              createMockGameboard()
            );
            const player2 = new Player(
              PLAYER_TYPES.REAL,
              createMockGameboard()
            );
            expect(player1.id).not.toBe(player2.id);
          });
        });

        describe("type", () => {
          it("should return the type of the player passed to the constructor", () => {
            const player = new Player(PLAYER_TYPES.REAL, createMockGameboard());
            const player2 = new Player(
              PLAYER_TYPES.COMPUTER,
              createMockGameboard()
            );

            expect(player.type).toBe(PLAYER_TYPES.REAL);
            expect(player2.type).toBe(PLAYER_TYPES.COMPUTER);
          });

          it("should return the type of the player passed to the constructor in lowercase", () => {
            const player = new Player("REAL", createMockGameboard());
            const player2 = new Player("cOmPuTeR", createMockGameboard());

            expect(player.type).toBe(PLAYER_TYPES.REAL);
            expect(player2.type).toBe(PLAYER_TYPES.COMPUTER);
          });
        });
      });

      describe("methods", () => {
        // Run get ship at tests
        describeGetShipAtTests();

        // Run add ships tests
        describeAddShipsTests();

        // Run get board tests
        describeGetBoardTests();
      });
    });
  });
});
