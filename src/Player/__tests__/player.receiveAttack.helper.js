import Player from "..";
import { createMockGameboard } from "../../test-utils/gameboard";
import {
  createCoordinatesString,
  createMessageFromTemplate,
} from "../../utils";
import {
  gameboardCoordinatesValidationMessages,
  PLAYER_TYPES,
} from "../../utils/constants";
import { receiveAttackErrorMessageTemplate } from "../utils/constants";

export function describeReceiveAttackTests() {
  describe("receiveAttack", () => {
    it("should receive an attack on the player's gameboard and mark the cell as hit if valid coordinates are provided", () => {
      const gameboard = createMockGameboard();
      const player = new Player(PLAYER_TYPES.REAL, gameboard);
      const coordinates = [0, 0];

      player.receiveAttack(coordinates);

      // Mock the isCellHit method of the gameboard to return true
      gameboard.isCellHit.mockReturnValue(true);

      expect(gameboard.isCellHit(coordinates)).toBe(true);
    });

    it("should return true returned by the gameboard.receiveAttack() method if the attack successfully marks the cell as hit", () => {
      const gameboard = createMockGameboard();
      const player = new Player(PLAYER_TYPES.REAL, gameboard);
      const coordinates = [0, 0];

      // Mock the receiveAttack method of the gameboard to return true
      gameboard.receiveAttack.mockReturnValue(true);

      expect(player.receiveAttack(coordinates)).toBe(true);
    });

    it("should call the gameboard.receiveAttack() method with the correct coordinates", () => {
      const gameboard = createMockGameboard();
      const player = new Player(PLAYER_TYPES.REAL, gameboard);
      const coordinates = [0, 0];

      player.receiveAttack(coordinates);

      expect(gameboard.receiveAttack).toHaveBeenCalledWith(coordinates);
    });

    it("should throw an error if the gameboard.receiveAttack() method throws an error", () => {
      const gameboard = createMockGameboard();
      const player = new Player(PLAYER_TYPES.REAL, gameboard);
      const coordinates = [8, -2];

      // Mock the receiveAttack method of the gameboard to throw an error
      gameboard.receiveAttack.mockImplementation(() => {
        throw new Error(
          gameboardCoordinatesValidationMessages.invalid.outOfBounds
        );
      });

      expect(() => player.receiveAttack(coordinates)).toThrow(
        createMessageFromTemplate(receiveAttackErrorMessageTemplate, {
          errorMessage:
            gameboardCoordinatesValidationMessages.invalid.outOfBounds,
          coordinates: createCoordinatesString(coordinates),
        })
      );
    });
  });
}
