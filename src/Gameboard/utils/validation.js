import { createValidationResult } from "../../utils";
import {
  DIRECTIONS,
  gameboardCoordinatesValidationMessages,
  gameboardDimensionsValidationMessages,
  gameboardDirectionValidationMessages,
  shipValidationMessages,
} from "../../utils/constants";
import {
  validateGameboardCoordinates,
  validateGameboardDimensions,
  validateGameboardDirection,
} from "../../utils/gameboard";
import { validateShip } from "../../utils/ship";
import {
  gameboardGetShipAtValidationMessages,
  gameboardInputsValidationMessages,
  gameboardIsCellHitValidationMessages,
  gameboardIsCellMissValidationMessages,
  gameboardPlaceShipValidationMessages,
  gameboardReceiveAttackValidationMessages,
} from "./constants";

export const validateGameboardInputs = (dimensions) => {
  const gameboardDimensionsValidationResult = validateGameboardDimensions(
    dimensions,
    gameboardDimensionsValidationMessages
  );
  if (!gameboardDimensionsValidationResult.isValid) {
    return gameboardDimensionsValidationResult;
  }

  return createValidationResult(
    true,
    gameboardInputsValidationMessages.valid.default
  );
};

export const validateGetShipAtInputs = (coordinates, dimensions) => {
  const gameboardCoordinatesValidationResult = validateGameboardCoordinates(
    coordinates,
    dimensions,
    gameboardCoordinatesValidationMessages
  );
  if (!gameboardCoordinatesValidationResult.isValid) {
    return gameboardCoordinatesValidationResult;
  }

  return createValidationResult(
    true,
    gameboardGetShipAtValidationMessages.valid.default
  );
};

export const validateIsCellHitInputs = (coordinates, dimensions) => {
  const gameboardCoordinatesValidationResult = validateGameboardCoordinates(
    coordinates,
    dimensions,
    gameboardCoordinatesValidationMessages
  );
  if (!gameboardCoordinatesValidationResult.isValid) {
    return gameboardCoordinatesValidationResult;
  }

  return createValidationResult(
    true,
    gameboardIsCellHitValidationMessages.valid.default
  );
};

export const validateIsCellMissInputs = (coordinates, dimensions) => {
  const gameboardCoordinatesValidationResult = validateGameboardCoordinates(
    coordinates,
    dimensions,
    gameboardCoordinatesValidationMessages
  );
  if (!gameboardCoordinatesValidationResult.isValid) {
    return gameboardCoordinatesValidationResult;
  }

  return createValidationResult(
    true,
    gameboardIsCellMissValidationMessages.valid.default
  );
};

export const validatePlaceShipInputs = (
  ship,
  coordinates,
  dimensions,
  direction,
  board
) => {
  const shipValidationResult = validateShip(ship, shipValidationMessages);
  if (!shipValidationResult.isValid) {
    return shipValidationResult;
  }

  const gameboardCoordinatesValidationResult = validateGameboardCoordinates(
    coordinates,
    dimensions,
    gameboardCoordinatesValidationMessages
  );
  if (!gameboardCoordinatesValidationResult.isValid) {
    return gameboardCoordinatesValidationResult;
  }

  const gameboardDirectionValidationResult = validateGameboardDirection(
    direction,
    gameboardDirectionValidationMessages
  );
  if (!gameboardDirectionValidationResult.isValid) {
    return gameboardDirectionValidationResult;
  }

  const [row, column] = coordinates;
  const lowerCaseDirection = direction.toLowerCase();

  if (board[row][column].ship) {
    return createValidationResult(
      false,
      gameboardPlaceShipValidationMessages.invalid.alreadyOccupied
    );
  }

  if (lowerCaseDirection === DIRECTIONS.HORIZONTAL) {
    if (column + ship.length > dimensions[1]) {
      return createValidationResult(
        false,
        gameboardPlaceShipValidationMessages.invalid.outOfBounds
      );
    }
  } else if (lowerCaseDirection === DIRECTIONS.VERTICAL) {
    if (row + ship.length > dimensions[0]) {
      return createValidationResult(
        false,
        gameboardPlaceShipValidationMessages.invalid.outOfBounds
      );
    }
  }

  for (let i = 0; i < ship.length; i++) {
    if (lowerCaseDirection === DIRECTIONS.HORIZONTAL) {
      if (board[row][column + i].ship) {
        return createValidationResult(
          false,
          gameboardPlaceShipValidationMessages.invalid.overlapsWithAnotherShip
        );
      }
    } else if (lowerCaseDirection === DIRECTIONS.VERTICAL) {
      if (board[row + i][column].ship) {
        return createValidationResult(
          false,
          gameboardPlaceShipValidationMessages.invalid.overlapsWithAnotherShip
        );
      }
    }
  }

  return createValidationResult(
    true,
    gameboardPlaceShipValidationMessages.valid.default
  );
};

export const validateReceiveAttackInputs = (
  coordinates,
  dimensions,
  board,
  placedShipsCount
) => {
  const gameboardCoordinatesValidationResult = validateGameboardCoordinates(
    coordinates,
    dimensions,
    gameboardCoordinatesValidationMessages
  );
  if (!gameboardCoordinatesValidationResult.isValid) {
    return gameboardCoordinatesValidationResult;
  }

  if (placedShipsCount <= 0) {
    return createValidationResult(
      false,
      gameboardReceiveAttackValidationMessages.invalid.noShipsPlaced
    );
  }

  const [row, column] = coordinates;
  const cell = board[row][column];

  if (cell.hit) {
    if (cell.ship) {
      return createValidationResult(
        false,
        gameboardReceiveAttackValidationMessages.invalid.alreadyHit
      );
    }

    return createValidationResult(
      false,
      gameboardReceiveAttackValidationMessages.invalid.alreadyMissed
    );
  }

  return createValidationResult(
    true,
    gameboardReceiveAttackValidationMessages.valid.default
  );
};
