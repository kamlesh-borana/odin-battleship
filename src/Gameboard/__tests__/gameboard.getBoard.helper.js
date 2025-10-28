import Gameboard from "..";
import { createMockShip } from "../../test-utils/ship";
import { createGameboardBoard } from "../../utils";
import {
  DEFAULT_GAMEBOARD_DIMENSIONS,
  DIRECTIONS,
} from "../../utils/constants";
import {
  addShipToExpectedBoard,
  createAndPlaceMultipleShipsOnGameboard,
} from "../test-utils";

export function describeGetBoardTests() {
  describe("getBoard", () => {
    it("should return a 2D array representing the gameboard's current board state of being empty initially", () => {
      const gameboard = new Gameboard();
      expect(gameboard.getBoard()).toStrictEqual(
        createGameboardBoard(DEFAULT_GAMEBOARD_DIMENSIONS)
      );
    });

    it("should return a 2D array representing the gameboard's current board state after placing a ship", () => {
      const gameboard = new Gameboard();
      const ship = createMockShip(1);
      const coordinates = [0, 0];
      gameboard.placeShip(ship, coordinates, DIRECTIONS.HORIZONTAL);
      const expectedBoard = createGameboardBoard(DEFAULT_GAMEBOARD_DIMENSIONS);
      expectedBoard[coordinates[0]][coordinates[1]] = {
        hit: false,
        ship: { id: ship.id, length: ship.length },
      };
      expect(gameboard.getBoard()).toStrictEqual(expectedBoard);
    });

    it("should return a 2D array representing the gameboard's current board state after placing multiple ships in different directions", () => {
      const gameboard = new Gameboard();
      const { ships, coordinatesList, directionsList } =
        createAndPlaceMultipleShipsOnGameboard(gameboard);

      const expectedBoard = createGameboardBoard(DEFAULT_GAMEBOARD_DIMENSIONS);

      for (let i = 0; i < ships.length; i++) {
        addShipToExpectedBoard(
          expectedBoard,
          ships[i],
          coordinatesList[i],
          directionsList[i]
        );
      }

      expect(gameboard.getBoard()).toStrictEqual(expectedBoard);
    });

    it("should return a 2D array representing the gameboard's current board state after receiving an attack on a cell containing a ship", () => {
      const gameboard = new Gameboard();
      const ship = createMockShip(1);
      const coordinates = [0, 0];
      gameboard.placeShip(ship, coordinates, DIRECTIONS.HORIZONTAL);
      gameboard.receiveAttack(coordinates);
      const expectedBoard = createGameboardBoard(DEFAULT_GAMEBOARD_DIMENSIONS);
      addShipToExpectedBoard(
        expectedBoard,
        ship,
        coordinates,
        DIRECTIONS.HORIZONTAL
      );
      expectedBoard[coordinates[0]][coordinates[1]].hit = true;
      expect(gameboard.getBoard()).toStrictEqual(expectedBoard);
    });

    it("should return a 2D array representing the gameboard's current board state after receiving an attack on a cell not containing a ship", () => {
      const gameboard = new Gameboard();
      const ship = createMockShip(1);
      const coordinates = [0, 0];
      gameboard.placeShip(ship, coordinates, DIRECTIONS.HORIZONTAL);
      gameboard.receiveAttack([1, 1]);
      const expectedBoard = createGameboardBoard(DEFAULT_GAMEBOARD_DIMENSIONS);
      addShipToExpectedBoard(
        expectedBoard,
        ship,
        coordinates,
        DIRECTIONS.HORIZONTAL
      );
      expectedBoard[1][1].hit = true;
      expect(gameboard.getBoard()).toStrictEqual(expectedBoard);
    });

    it("should return a 2D array representing the gameboard's current board state after multiple ships are placed and attacks are received but all attacks miss", () => {
      const gameboard = new Gameboard();
      const { ships, coordinatesList, directionsList } =
        createAndPlaceMultipleShipsOnGameboard(gameboard);

      const expectedBoard = createGameboardBoard(DEFAULT_GAMEBOARD_DIMENSIONS);

      for (let i = 0; i < ships.length; i++) {
        addShipToExpectedBoard(
          expectedBoard,
          ships[i],
          coordinatesList[i],
          directionsList[i]
        );
      }

      // Receive attacks
      gameboard.receiveAttack([1, 0]); // Miss
      expectedBoard[1][0].hit = true;
      gameboard.receiveAttack([2, 0]); // Miss
      expectedBoard[2][0].hit = true;
      gameboard.receiveAttack([3, 0]); // Miss
      expectedBoard[3][0].hit = true;
      gameboard.receiveAttack([4, 0]); // Miss
      expectedBoard[4][0].hit = true;
      gameboard.receiveAttack([5, 0]); // Miss
      expectedBoard[5][0].hit = true;

      expect(gameboard.getBoard()).toStrictEqual(expectedBoard);
    });

    it("should return a 2D array representing the gameboard's current board state after multiple ships are placed and attacks are received but some attacks hit and some miss", () => {
      const gameboard = new Gameboard();
      const { ships, coordinatesList, directionsList } =
        createAndPlaceMultipleShipsOnGameboard(gameboard);

      const expectedBoard = createGameboardBoard(DEFAULT_GAMEBOARD_DIMENSIONS);

      for (let i = 0; i < ships.length; i++) {
        addShipToExpectedBoard(
          expectedBoard,
          ships[i],
          coordinatesList[i],
          directionsList[i]
        );
      }

      // Receive attacks
      gameboard.receiveAttack([1, 0]); // Miss
      expectedBoard[1][0].hit = true;
      gameboard.receiveAttack([1, 1]); // Hit
      expectedBoard[1][1].hit = true;
      gameboard.receiveAttack([2, 2]); // Hit
      expectedBoard[2][2].hit = true;
      gameboard.receiveAttack([4, 0]); // Miss
      expectedBoard[4][0].hit = true;
      gameboard.receiveAttack([5, 0]); // Miss
      expectedBoard[5][0].hit = true;

      expect(gameboard.getBoard()).toStrictEqual(expectedBoard);
    });
  });
}
