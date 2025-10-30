import Player from "..";
import { createMethodCallback } from "../../test-utils";
import { testInvalidShipsError } from "../../test-utils/game";
import { createMockGameboard } from "../../test-utils/gameboard";
import { createMockShip } from "../../test-utils/ship";
import {
  createCoordinatesString,
  createMessageFromTemplate,
} from "../../utils";
import {
  DIRECTIONS,
  gameboardCoordinatesValidationMessages,
  PLAYER_TYPES,
  shipsValidationMessages,
} from "../../utils/constants";
import { VALID_ADD_SHIPS_INPUTS } from "../test-utils/constants";
import {
  addShipsErrorMessageTemplate,
  placeShipFailedSilentlyErrorMessage,
} from "../utils/constants";

export function describeAddShipsTests() {
  describe("addShips", () => {
    describe("invalid arguments", () => {
      describe("ships", () => {
        const player = new Player(PLAYER_TYPES.REAL, createMockGameboard());
        const callback = createMethodCallback(player, "addShips");
        testInvalidShipsError(
          "ships",
          callback,
          shipsValidationMessages.invalid
        );
      });
    });

    describe("valid arguments", () => {
      it("should add a ship to the player's gameboard if a valid ship placement information object is provided", () => {
        const gameboard = createMockGameboard();
        const player = new Player(PLAYER_TYPES.REAL, gameboard);
        const ship = createMockShip(1);
        const coordinates = [0, 0];
        const direction = DIRECTIONS.HORIZONTAL;
        player.addShips([{ ship, coordinates, direction }]);

        // get the mocked ship info
        const shipInfo = { ...ship.getInfo() };

        // mock the gameboard.getShipAt method to return the ship info
        gameboard.getShipAt.mockReturnValueOnce(shipInfo);

        expect(player.getShipAt(coordinates)).toStrictEqual(shipInfo);
      });

      it("should add multiple ships to the player's gameboard if multiple valid ship placement information objects are provided", () => {
        const gameboard = createMockGameboard();
        const player = new Player(PLAYER_TYPES.REAL, gameboard);
        const ship1 = createMockShip(1);
        const coordinates1 = [0, 0];
        const direction1 = DIRECTIONS.HORIZONTAL;
        const ship2 = createMockShip(2);
        const coordinates2 = [1, 0];
        const direction2 = DIRECTIONS.VERTICAL;
        player.addShips([
          {
            ship: ship1,
            coordinates: coordinates1,
            direction: direction1,
          },
          {
            ship: ship2,
            coordinates: coordinates2,
            direction: direction2,
          },
        ]);

        // get the mocked ship infos
        const ship1Info = { ...ship1.getInfo() };
        const ship2Info = { ...ship2.getInfo() };

        // mock the gameboard.getShipAt method to return the ships
        gameboard.getShipAt
          .mockReturnValueOnce(ship1Info)
          .mockReturnValueOnce(ship2Info);

        expect(player.getShipAt(coordinates1)).toStrictEqual(ship1Info);
        expect(player.getShipAt(coordinates2)).toStrictEqual(ship2Info);
      });

      it.each(VALID_ADD_SHIPS_INPUTS)(
        "should call the gameboard.placeShip() method %i times for each valid ship placement information object in the ships array",
        (numberOfCalls, ships) => {
          const gameboard = createMockGameboard();
          const player = new Player(PLAYER_TYPES.REAL, gameboard);

          player.addShips(ships);

          expect(gameboard.placeShip).toHaveBeenCalledTimes(numberOfCalls);
        }
      );

      it("should return true if the ships are placed successfully", () => {
        const gameboard = createMockGameboard();
        const player = new Player(PLAYER_TYPES.REAL, gameboard);

        const ships = [
          {
            ship: createMockShip(1),
            coordinates: [0, 0],
            direction: DIRECTIONS.HORIZONTAL,
          },
          {
            ship: createMockShip(2),
            coordinates: [1, 0],
            direction: DIRECTIONS.VERTICAL,
          },
        ];

        expect(player.addShips(ships)).toBe(true);
      });

      it("should throw an error if the gameboard.placeShip() method throws an error", () => {
        const gameboard = createMockGameboard();
        const player = new Player(PLAYER_TYPES.REAL, gameboard);
        const ship = createMockShip(1);
        const coordinates = [8, -2];
        const direction = DIRECTIONS.HORIZONTAL;

        const ships = [{ ship, coordinates, direction }];

        // mock the gameboard.placeShip method to throw an error
        gameboard.placeShip.mockImplementationOnce(() => {
          throw new Error(
            gameboardCoordinatesValidationMessages.invalid.outOfBounds
          );
        });

        expect(() => player.addShips(ships)).toThrow(
          createMessageFromTemplate(addShipsErrorMessageTemplate, {
            errorMessage:
              gameboardCoordinatesValidationMessages.invalid.outOfBounds,
            shipName: ship.name,
            coordinates: createCoordinatesString(coordinates),
            direction: direction.toLowerCase(),
          })
        );
      });

      it("should throw an error if the gameboard.placeShip() method did not return true for the ship", () => {
        const gameboard = createMockGameboard();
        const player = new Player(PLAYER_TYPES.REAL, gameboard);
        const ship = createMockShip(1);
        const coordinates = [0, 0];
        const direction = DIRECTIONS.HORIZONTAL;
        const ships = [{ ship, coordinates, direction }];

        // mock the gameboard.placeShip method to return false
        gameboard.placeShip.mockReturnValueOnce(false);

        expect(() => player.addShips(ships)).toThrow(
          createMessageFromTemplate(addShipsErrorMessageTemplate, {
            errorMessage: placeShipFailedSilentlyErrorMessage,
            shipName: ship.name,
            coordinates: createCoordinatesString(coordinates),
            direction: direction.toLowerCase(),
          })
        );
      });

      it("should throw an error if the gameboard.placeShip() method throws an error for any of the ships in the list but the ships for which the placeShip() method has returned true already are added to the gameboard successfully", () => {
        const gameboard = createMockGameboard();
        const player = new Player(PLAYER_TYPES.REAL, gameboard);
        const ship1 = createMockShip(1);
        const coordinates1 = [0, 0];
        const direction1 = DIRECTIONS.HORIZONTAL;
        const ship2 = createMockShip(1);
        const coordinates2 = [1, 0];
        const direction2 = DIRECTIONS.VERTICAL;
        const ship3 = createMockShip(1);
        const coordinates3 = [1, 1];
        const direction3 = DIRECTIONS.HORIZONTAL;
        const ship4 = createMockShip(1);
        const coordinates4 = [2, 1];
        const direction4 = DIRECTIONS.VERTICAL;
        const ship5 = createMockShip(1);
        const coordinates5 = [2, 2];
        const direction5 = DIRECTIONS.HORIZONTAL;

        const ships = [
          {
            ship: ship1,
            coordinates: coordinates1,
            direction: direction1,
          },
          {
            ship: ship2,
            coordinates: coordinates2,
            direction: direction2,
          },
          {
            ship: ship3,
            coordinates: coordinates3,
            direction: direction3,
          },
          {
            ship: ship4,
            coordinates: coordinates4,
            direction: direction4,
          },
          {
            ship: ship5,
            coordinates: coordinates5,
            direction: direction5,
          },
        ];

        // get the mocked ship infos
        const ship1Info = { ...ship1.getInfo() };
        const ship2Info = { ...ship2.getInfo() };

        // mock the gameboard.placeShip method to return appropriate statuses for the ships
        gameboard.placeShip
          .mockReturnValueOnce(true) // ship1 placed status
          .mockReturnValueOnce(true) // ship2 placed status
          // mock the gameboard.placeShip method to throw an error for ship3
          .mockImplementationOnce(() => {
            throw new Error(
              gameboardCoordinatesValidationMessages.invalid.outOfBounds
            );
          });

        // mock the gameboard.getShipAt method to return appropriate data
        gameboard.getShipAt
          .mockReturnValueOnce(ship1Info) // returned ship info for ship1
          .mockReturnValueOnce(ship2Info) // returned ship info for ship2
          .mockReturnValueOnce(null) // returned null for ship3 as it is not placed
          .mockReturnValueOnce(null) // returned null for ship4 as it is not placed
          .mockReturnValueOnce(null); // returned null for ship5 as it is not placed

        // expect an error to be thrown while adding ships to the gameboard due to the placeShip() method throwing an error for ship3
        expect(() => player.addShips(ships)).toThrow(
          createMessageFromTemplate(addShipsErrorMessageTemplate, {
            errorMessage:
              gameboardCoordinatesValidationMessages.invalid.outOfBounds,
            shipName: ship3.name,
            coordinates: createCoordinatesString(coordinates3),
            direction: direction3.toLowerCase(),
          })
        );

        // expect the ships for which the placeShip() method has returned true already to be added to the gameboard
        expect(player.getShipAt([0, 0])).toStrictEqual(ship1Info);
        expect(player.getShipAt([1, 0])).toStrictEqual(ship2Info);

        // expect the ship for which the placeShip() method has thrown an error to not be added to the gameboard
        expect(player.getShipAt([1, 1])).toBeNull();

        // expect the ships in the list after the ship for which the placeShip() method has thrown an error to not be added to the gameboard
        expect(player.getShipAt([2, 1])).toBeNull();
        expect(player.getShipAt([2, 2])).toBeNull();

        // expect the gameboard.placeShip() method to have been called only 3 times since ship3 has thrown an error
        expect(gameboard.placeShip).toHaveBeenCalledTimes(3);
      });

      it("should throw an error if the gameboard.placeShip() method did not return true for any of the ships in the list but the ships for which the placeShip() method has returned true already are added to the gameboard successfully", () => {
        const gameboard = createMockGameboard();
        const player = new Player(PLAYER_TYPES.REAL, gameboard);
        const ship1 = createMockShip(1);
        const coordinates1 = [0, 0];
        const direction1 = DIRECTIONS.HORIZONTAL;
        const ship2 = createMockShip(1);
        const coordinates2 = [1, 0];
        const direction2 = DIRECTIONS.VERTICAL;
        const ship3 = createMockShip(1);
        const coordinates3 = [1, 1];
        const direction3 = DIRECTIONS.HORIZONTAL;
        const ship4 = createMockShip(1);
        const coordinates4 = [2, 1];
        const direction4 = DIRECTIONS.VERTICAL;
        const ship5 = createMockShip(1);
        const coordinates5 = [2, 2];
        const direction5 = DIRECTIONS.HORIZONTAL;

        const ships = [
          {
            ship: ship1,
            coordinates: coordinates1,
            direction: direction1,
          },
          {
            ship: ship2,
            coordinates: coordinates2,
            direction: direction2,
          },
          {
            ship: ship3,
            coordinates: coordinates3,
            direction: direction3,
          },
          {
            ship: ship4,
            coordinates: coordinates4,
            direction: direction4,
          },
          {
            ship: ship5,
            coordinates: coordinates5,
            direction: direction5,
          },
        ];

        // get the mocked ship infos
        const ship1Info = { ...ship1.getInfo() };
        const ship2Info = { ...ship2.getInfo() };

        // mock the gameboard.placeShip method to return appropriate statuses for the ships
        gameboard.placeShip
          .mockReturnValueOnce(true) // ship1 placed status
          .mockReturnValueOnce(true) // ship2 placed status
          .mockReturnValueOnce(false); // ship3 placed status

        // mock the gameboard.getShipAt method to return appropriate data
        gameboard.getShipAt
          .mockReturnValueOnce(ship1Info) // returned ship info for ship1
          .mockReturnValueOnce(ship2Info) // returned ship info for ship2
          .mockReturnValueOnce(null) // returned null for ship3 as it is not placed
          .mockReturnValueOnce(null) // returned null for ship4 as it is not placed
          .mockReturnValueOnce(null); // returned null for ship5 as it is not placed

        // expect an error to be thrown while adding ships to the gameboard due to the placeShip() method not returning true for ship3
        expect(() => player.addShips(ships)).toThrow(
          createMessageFromTemplate(addShipsErrorMessageTemplate, {
            errorMessage: placeShipFailedSilentlyErrorMessage,
            shipName: ship3.name,
            coordinates: createCoordinatesString(coordinates3),
            direction: direction3.toLowerCase(),
          })
        );

        // expect the ships for which the placeShip() method has returned true already to be added to the gameboard
        expect(player.getShipAt([0, 0])).toStrictEqual(ship1Info);
        expect(player.getShipAt([1, 0])).toStrictEqual(ship2Info);

        // expect the ship for which the placeShip() method has not returned true to not be added to the gameboard
        expect(player.getShipAt([1, 1])).toBeNull();

        // expect the ships in the list after the ship for which the placeShip() method has not returned true to not be added to the gameboard
        expect(player.getShipAt([2, 1])).toBeNull();
        expect(player.getShipAt([2, 2])).toBeNull();

        // expect the gameboard.placeShip() method to have been called only 3 times since ship3 has caused an error
        expect(gameboard.placeShip).toHaveBeenCalledTimes(3);
      });
    });
  });
}
