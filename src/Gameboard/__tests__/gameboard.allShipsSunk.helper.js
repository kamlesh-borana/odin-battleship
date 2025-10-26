import Gameboard from "..";
import { createMockShip } from "../test-utils";
import { DIRECTIONS } from "../utils/constants";

export function describeAllShipsSunkTests() {
  describe("allShipsSunk", () => {
    it("should return false if the only ship on the gameboard is not sunk", () => {
      const gameboard = new Gameboard();
      const ship = createMockShip(1);

      gameboard.placeShip(ship, [0, 0], DIRECTIONS.HORIZONTAL);

      expect(gameboard.allShipsSunk()).toBe(false);
    });

    it("should return true if the only ship on the gameboard is sunk", () => {
      const gameboard = new Gameboard();
      const ship = createMockShip(1);

      gameboard.placeShip(ship, [0, 0], DIRECTIONS.HORIZONTAL);
      gameboard.receiveAttack([0, 0]); // Ship is hit and sunk
      ship.isSunk.mockReturnValue(true); // Ship is sunk

      expect(gameboard.allShipsSunk()).toBe(true);
    });

    it("should return false if all ships on the gameboard are not sunk", () => {
      const gameboard = new Gameboard();
      const ship = createMockShip(1);
      const ship2 = createMockShip(2);

      gameboard.placeShip(ship, [0, 0], DIRECTIONS.HORIZONTAL);
      gameboard.placeShip(ship2, [1, 1], DIRECTIONS.HORIZONTAL);

      expect(gameboard.allShipsSunk()).toBe(false);
    });

    it("should return false if there are ships on the gameboard that are not sunk", () => {
      const gameboard = new Gameboard();
      const ship = createMockShip(1);
      const ship2 = createMockShip(2);

      gameboard.placeShip(ship, [0, 0], DIRECTIONS.HORIZONTAL);
      gameboard.placeShip(ship2, [1, 1], DIRECTIONS.HORIZONTAL);

      gameboard.receiveAttack([0, 0]); // First ship is hit and sunk
      ship.isSunk.mockReturnValue(true); // First ship is sunk

      gameboard.receiveAttack([1, 1]); // Second ship is hit but not sunk yet
      ship2.isSunk.mockReturnValue(false); // Second ship is not sunk

      expect(gameboard.allShipsSunk()).toBe(false);
    });

    it("should return true if all ships on the gameboard are sunk", () => {
      const gameboard = new Gameboard();
      const ship = createMockShip(1);
      const ship2 = createMockShip(2);

      gameboard.placeShip(ship, [0, 0], DIRECTIONS.HORIZONTAL);
      gameboard.placeShip(ship2, [1, 1], DIRECTIONS.HORIZONTAL);

      gameboard.receiveAttack([0, 0]); // First ship is hit
      ship.isSunk.mockReturnValue(true); // First ship is hit and sunk

      gameboard.receiveAttack([1, 1]); // Second ship is hit but not sunk yet
      gameboard.receiveAttack([1, 2]); // Second ship is hit and sunk
      ship2.isSunk.mockReturnValue(true); // Second ship is sunk

      expect(gameboard.allShipsSunk()).toBe(true);
    });

    it("should return true if there are no ships on the gameboard", () => {
      const gameboard = new Gameboard();
      expect(gameboard.allShipsSunk()).toBe(true);
    });
  });
}
