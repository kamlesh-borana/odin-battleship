import Gameboard from "..";
import { createMockShip } from "../../test-utils/ship";
import { createGameboardBoard } from "../../utils";
import {
  DEFAULT_GAMEBOARD_DIMENSIONS,
  DIRECTIONS,
} from "../../utils/constants";
import {
  addShipInfoToExpectedBoard,
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
      addShipInfoToExpectedBoard(
        expectedBoard,
        ship,
        coordinates,
        DIRECTIONS.HORIZONTAL
      );

      expect(gameboard.getBoard()).toStrictEqual(expectedBoard);
    });

    it("should return a 2D array representing the gameboard's current board state after placing multiple ships in different directions", () => {
      const gameboard = new Gameboard();
      const { ships, coordinatesList, directionsList } =
        createAndPlaceMultipleShipsOnGameboard(gameboard);

      const expectedBoard = createGameboardBoard(DEFAULT_GAMEBOARD_DIMENSIONS);
      for (let i = 0; i < ships.length; i++) {
        addShipInfoToExpectedBoard(
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

      const expectedBoard = createGameboardBoard(DEFAULT_GAMEBOARD_DIMENSIONS);

      // Receive attack on a cell containing a ship
      gameboard.receiveAttack(coordinates); // Hit
      expectedBoard[coordinates[0]][coordinates[1]].hit = true;

      addShipInfoToExpectedBoard(
        expectedBoard,
        ship,
        coordinates,
        DIRECTIONS.HORIZONTAL
      );

      expect(gameboard.getBoard()).toStrictEqual(expectedBoard);
    });

    it("should return a 2D array representing the gameboard's current board state after receiving an attack on a cell not containing a ship", () => {
      const gameboard = new Gameboard();
      const ship = createMockShip(1);
      const coordinates = [0, 0];
      gameboard.placeShip(ship, coordinates, DIRECTIONS.HORIZONTAL);

      const expectedBoard = createGameboardBoard(DEFAULT_GAMEBOARD_DIMENSIONS);

      // Receive attack on a cell not containing a ship
      gameboard.receiveAttack([1, 1]); // Miss
      expectedBoard[1][1].hit = true;

      addShipInfoToExpectedBoard(
        expectedBoard,
        ship,
        coordinates,
        DIRECTIONS.HORIZONTAL
      );

      expect(gameboard.getBoard()).toStrictEqual(expectedBoard);
    });

    it("should return a 2D array representing the gameboard's current board state after multiple ships are placed and attacks are received but all attacks miss", () => {
      const gameboard = new Gameboard();
      const { ships, coordinatesList, directionsList } =
        createAndPlaceMultipleShipsOnGameboard(gameboard);

      const expectedBoard = createGameboardBoard(DEFAULT_GAMEBOARD_DIMENSIONS);

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

      for (let i = 0; i < ships.length; i++) {
        addShipInfoToExpectedBoard(
          expectedBoard,
          ships[i],
          coordinatesList[i],
          directionsList[i]
        );
      }

      expect(gameboard.getBoard()).toStrictEqual(expectedBoard);
    });

    it("should return a 2D array representing the gameboard's current board state after multiple ships are placed and attacks are received but some attacks hit and some miss", () => {
      const gameboard = new Gameboard();
      const { ships, coordinatesList, directionsList } =
        createAndPlaceMultipleShipsOnGameboard(gameboard);

      const expectedBoard = createGameboardBoard(DEFAULT_GAMEBOARD_DIMENSIONS);

      // Receive attacks
      gameboard.receiveAttack([1, 0]); // Miss
      expectedBoard[1][0].hit = true;

      gameboard.receiveAttack([1, 1]); // Hit
      expectedBoard[1][1].hit = true;
      // Mock the getInfo() method of the second ship to return the correct info
      ships[1].getInfo.mockReturnValue({
        ...ships[1].getInfo(),
        hits: 1,
        isSunk: false,
      });

      gameboard.receiveAttack([2, 2]); // Hit
      expectedBoard[2][2].hit = true;
      // Mock the getInfo() method of the third ship to return the correct info
      ships[2].getInfo.mockReturnValue({
        ...ships[2].getInfo(),
        hits: 1,
        isSunk: false,
      });

      gameboard.receiveAttack([4, 0]); // Miss
      expectedBoard[4][0].hit = true;
      gameboard.receiveAttack([5, 0]); // Miss
      expectedBoard[5][0].hit = true;

      for (let i = 0; i < ships.length; i++) {
        addShipInfoToExpectedBoard(
          expectedBoard,
          ships[i],
          coordinatesList[i],
          directionsList[i]
        );
      }

      expect(gameboard.getBoard()).toStrictEqual(expectedBoard);
    });

    it("should return a 2D array representing the gameboard's current board state after multiple ships are placed and attacks are received but some attacks hit and some miss and some attacks caused the ships to sink", () => {
      const gameboard = new Gameboard();
      const { ships, coordinatesList, directionsList } =
        createAndPlaceMultipleShipsOnGameboard(gameboard);

      const expectedBoard = createGameboardBoard(DEFAULT_GAMEBOARD_DIMENSIONS);

      // Receive attacks
      // First ship is hit and sunk
      gameboard.receiveAttack([0, 0]); // Hit
      expectedBoard[0][0].hit = true;
      gameboard.receiveAttack([0, 1]); // Hit
      expectedBoard[0][1].hit = true;
      gameboard.receiveAttack([0, 2]); // Hit
      expectedBoard[0][2].hit = true;
      gameboard.receiveAttack([0, 3]); // Hit
      expectedBoard[0][3].hit = true;
      gameboard.receiveAttack([0, 4]); // Hit
      expectedBoard[0][4].hit = true;
      // Mock the getInfo() method of the first ship to return the correct info
      ships[0].getInfo.mockReturnValue({
        ...ships[0].getInfo(),
        hits: 5,
        isSunk: true,
      });

      gameboard.receiveAttack([1, 0]); // Miss
      expectedBoard[1][0].hit = true;

      // Second ship is hit but not sunk yet
      gameboard.receiveAttack([1, 1]); // Hit
      expectedBoard[1][1].hit = true;
      gameboard.receiveAttack([1, 2]); // Miss
      expectedBoard[1][2].hit = true;
      gameboard.receiveAttack([3, 1]); // Hit
      expectedBoard[3][1].hit = true;
      // Mock the getInfo() method of the second ship to return the correct info
      ships[1].getInfo.mockReturnValue({
        ...ships[1].getInfo(),
        hits: 2,
        isSunk: false,
      });

      gameboard.receiveAttack([2, 0]); // Miss
      expectedBoard[2][0].hit = true;
      gameboard.receiveAttack([3, 4]); // Miss
      expectedBoard[3][4].hit = true;

      // Fifth ship is hit and sunk
      gameboard.receiveAttack([4, 4]); // Hit
      expectedBoard[4][4].hit = true;
      gameboard.receiveAttack([5, 4]); // Miss
      expectedBoard[5][4].hit = true;
      gameboard.receiveAttack([4, 5]); // Hit
      expectedBoard[4][5].hit = true;
      // Mock the getInfo() method of the fifth ship to return the correct info
      ships[4].getInfo.mockReturnValue({
        ...ships[4].getInfo(),
        hits: 2,
        isSunk: true,
      });

      gameboard.receiveAttack([4, 0]); // Miss
      expectedBoard[4][0].hit = true;
      gameboard.receiveAttack([5, 0]); // Miss
      expectedBoard[5][0].hit = true;

      // Third ship is hit but not sunk yet
      gameboard.receiveAttack([2, 2]); // Hit
      expectedBoard[2][2].hit = true;
      // Mock the getInfo() method of the third ship to return the correct info
      ships[2].getInfo.mockReturnValue({
        ...ships[2].getInfo(),
        hits: 1,
        isSunk: false,
      });

      for (let i = 0; i < ships.length; i++) {
        addShipInfoToExpectedBoard(
          expectedBoard,
          ships[i],
          coordinatesList[i],
          directionsList[i]
        );
      }

      expect(gameboard.getBoard()).toStrictEqual(expectedBoard);
    });

    it("should return a 2D array representing the gameboard's current board state after multiple ships are placed and attacks are received causing all ships to sink", () => {
      const gameboard = new Gameboard();
      const { ships, coordinatesList, directionsList } =
        createAndPlaceMultipleShipsOnGameboard(gameboard);

      const expectedBoard = createGameboardBoard(DEFAULT_GAMEBOARD_DIMENSIONS);

      // Receive attacks
      // First ship is hit and sunk
      gameboard.receiveAttack([0, 0]); // Hit
      expectedBoard[0][0].hit = true;
      gameboard.receiveAttack([0, 1]); // Hit
      expectedBoard[0][1].hit = true;
      gameboard.receiveAttack([0, 2]); // Hit
      expectedBoard[0][2].hit = true;
      gameboard.receiveAttack([0, 3]); // Hit
      expectedBoard[0][3].hit = true;
      gameboard.receiveAttack([0, 4]); // Hit
      expectedBoard[0][4].hit = true;
      // Mock the getInfo() method of the first ship to return the correct info
      ships[0].getInfo.mockReturnValue({
        ...ships[0].getInfo(),
        hits: 5,
        isSunk: true,
      });

      // Second ship is hit and sunk
      gameboard.receiveAttack([1, 1]); // Hit
      expectedBoard[1][1].hit = true;
      gameboard.receiveAttack([2, 1]); // Hit
      expectedBoard[2][1].hit = true;
      gameboard.receiveAttack([3, 1]); // Hit
      expectedBoard[3][1].hit = true;
      gameboard.receiveAttack([4, 1]); // Hit
      expectedBoard[4][1].hit = true;
      // Mock the getInfo() method of the second ship to return the correct info
      ships[1].getInfo.mockReturnValue({
        ...ships[1].getInfo(),
        hits: 4,
        isSunk: true,
      });

      // Third ship is hit and sunk
      gameboard.receiveAttack([2, 2]); // Hit
      expectedBoard[2][2].hit = true;
      gameboard.receiveAttack([2, 3]); // Hit
      expectedBoard[2][3].hit = true;
      gameboard.receiveAttack([2, 4]); // Hit
      expectedBoard[2][4].hit = true;
      // Mock the getInfo() method of the third ship to return the correct info
      ships[2].getInfo.mockReturnValue({
        ...ships[2].getInfo(),
        hits: 3,
        isSunk: true,
      });

      // Fourth ship is hit and sunk
      gameboard.receiveAttack([3, 3]); // Hit
      expectedBoard[3][3].hit = true;
      gameboard.receiveAttack([4, 3]); // Hit
      expectedBoard[4][3].hit = true;
      gameboard.receiveAttack([5, 3]); // Hit
      expectedBoard[5][3].hit = true;
      // Mock the getInfo() method of the fourth ship to return the correct info
      ships[3].getInfo.mockReturnValue({
        ...ships[3].getInfo(),
        hits: 3,
        isSunk: true,
      });

      // Fifth ship is hit and sunk
      gameboard.receiveAttack([4, 4]); // Hit
      expectedBoard[4][4].hit = true;
      gameboard.receiveAttack([4, 5]); // Hit
      expectedBoard[4][5].hit = true;
      // Mock the getInfo() method of the fifth ship to return the correct info
      ships[4].getInfo.mockReturnValue({
        ...ships[4].getInfo(),
        hits: 2,
        isSunk: true,
      });

      for (let i = 0; i < ships.length; i++) {
        addShipInfoToExpectedBoard(
          expectedBoard,
          ships[i],
          coordinatesList[i],
          directionsList[i]
        );
      }

      expect(gameboard.getBoard()).toStrictEqual(expectedBoard);
    });
  });
}
