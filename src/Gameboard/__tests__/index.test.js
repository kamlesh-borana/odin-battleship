import Gameboard from "..";
import { createConstructorCallback } from "../../test-utils";
import { testInvalidGameboardDimensionsError } from "../test-utils/validation";
import {
  DEFAULT_GAMEBOARD_DIMENSIONS,
  gameboardDimensionsValidationMessages,
} from "../utils/constants";
import { describeAllShipsSunkTests } from "./gameboard.allShipsSunk.helper";
import { describeGetShipAtTests } from "./gameboard.getShipAt.helper";
import { describeIsCellHitTests } from "./gameboard.isCellHit.helper";
import { describeIsCellMissTests } from "./gameboard.isCellMiss.helper";
import { describePlaceShipTests } from "./gameboard.placeShip.helper";
import { describeReceiveAttackTests } from "./gameboard.receiveAttack.helper";

describe("Gameboard class module", () => {
  describe("constructor", () => {
    describe("invalid arguments", () => {
      describe("dimensions", () => {
        const isOptional = true;
        testInvalidGameboardDimensionsError(
          "dimensions",
          createConstructorCallback(Gameboard),
          gameboardDimensionsValidationMessages.invalid,
          isOptional
        );
      });
    });

    describe("valid arguments", () => {
      it("should create a gameboard instance if dimensions is a valid array of two positive integer numbers", () => {
        expect(new Gameboard([10, 10])).toBeInstanceOf(Gameboard);
      });

      it("should create a default gameboard instance if no dimensions is provided", () => {
        expect(new Gameboard()).toBeInstanceOf(Gameboard);
      });
    });
  });

  describe("gameboard instance", () => {
    describe("properties", () => {
      describe("id", () => {
        it("should return the id of the gameboard", () => {
          const gameboard = new Gameboard([10, 10]);
          expect(gameboard.id).toBeDefined();
        });

        it("should return a unique id for each gameboard instance", () => {
          const gameboard1 = new Gameboard([10, 10]);
          const gameboard2 = new Gameboard([10, 10]);
          expect(gameboard1.id).not.toBe(gameboard2.id);
        });
      });

      describe("dimensions", () => {
        it("should return the dimensions of the gameboard passed to the constructor", () => {
          const gameboard = new Gameboard([15, 15]);
          expect(gameboard.dimensions).toStrictEqual([15, 15]);
        });

        it("should return the default dimensions of the gameboard if no dimensions is provided", () => {
          const gameboard = new Gameboard();
          expect(gameboard.dimensions).toStrictEqual(
            DEFAULT_GAMEBOARD_DIMENSIONS
          );
        });
      });
    });

    describe("methods", () => {
      // Run get ship at tests
      describeGetShipAtTests();

      // Run is cell hit tests
      describeIsCellHitTests();

      // Run is cell miss tests
      describeIsCellMissTests();

      // Run place ship tests
      describePlaceShipTests();

      // Run receive attack tests
      describeReceiveAttackTests();

      // Run all ships sunk tests
      describeAllShipsSunkTests();
    });
  });
});
