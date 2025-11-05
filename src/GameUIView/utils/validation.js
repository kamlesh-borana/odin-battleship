import { ALLOWED_CELL_STATES } from "../../Game/utils/constants";
import { createValidationResult } from "../../utils";
import {
  validateIsArray,
  validateIsArrayOfAtLeast2Elements,
  validateIsNotAnEmptyString,
  validateIsString,
} from "../../utils/validation";
import {
  elementIdValidationMessages,
  playerBoardsValidationMessages,
  playerBoardValidationMessages,
  renderGameplayUIValidationMessages,
  renderPlayerBoardValidationMessages,
} from "./constants";

export const validateElementId = (
  elementId,
  validationMessagesObj = elementIdValidationMessages
) => {
  const isNotAnEmptyStringValidationResult = validateIsNotAnEmptyString(
    elementId,
    validationMessagesObj
  );
  if (!isNotAnEmptyStringValidationResult.isValid) {
    return isNotAnEmptyStringValidationResult;
  }

  const element = document.getElementById(elementId);
  if (!element) {
    return createValidationResult(
      false,
      validationMessagesObj.invalid.noHtmlElementWithId
    );
  }

  return createValidationResult(true, validationMessagesObj.valid.default);
};

export const validatePlayerBoard = (
  playerBoard,
  validationMessagesObj = playerBoardValidationMessages
) => {
  // 1. Check if the board itself is an array
  const isArrayValidationResult = validateIsArray(
    playerBoard,
    validationMessagesObj
  );
  if (!isArrayValidationResult.isValid) {
    return isArrayValidationResult;
  }

  // 2. Check if the board is empty (must have at least one row)
  if (playerBoard.length === 0) {
    return createValidationResult(
      false,
      validationMessagesObj.invalid.emptyArray
    );
  }

  // Store the length of the first row to ensure all rows have consistent length
  let expectedRowLength = -1;

  // 3. Iterate through each row to validate it
  for (let i = 0; i < playerBoard.length; i++) {
    const row = playerBoard[i];

    // 3.1. Check if the current row is an array
    const isArrayValidationResult = validateIsArray(
      row,
      validationMessagesObj.row
    );
    if (!isArrayValidationResult.isValid) {
      return isArrayValidationResult;
    }

    // 3.2. Check if the current row is empty (must have at least one cell)
    if (row.length === 0) {
      return createValidationResult(
        false,
        validationMessagesObj.row.invalid.emptyArray
      );
    }

    // 3.3. Set expected row length from the first row
    if (expectedRowLength === -1) {
      expectedRowLength = row.length;
    } else if (row.length !== expectedRowLength) {
      // 3.4 Ensure all rows have the same number of cells (rectangular board)
      return createValidationResult(
        false,
        validationMessagesObj.row.invalid.rowLengthMismatch
      );
    }

    // 3.5. Iterate through each cell in the current row to validate it
    for (let j = 0; j < row.length; j++) {
      const cell = row[j];

      // 3.5.1. Check if the current cell is a string
      const isStringValidationResult = validateIsString(
        cell,
        validationMessagesObj.row.cell
      );
      if (!isStringValidationResult.isValid) {
        return isStringValidationResult;
      }

      // 3.5.2. Check if the cell's string value is one of the allowed states
      if (!ALLOWED_CELL_STATES.includes(cell.toLowerCase())) {
        return createValidationResult(
          false,
          validationMessagesObj.row.cell.invalid.notAValidState
        );
      }
    }
  }

  return createValidationResult(true, validationMessagesObj.valid.default);
};

export const validatePlayerBoards = (
  playerBoards,
  validationMessagesObj = playerBoardsValidationMessages
) => {
  const isArrayOfAtLeast2ElementsValidationResult =
    validateIsArrayOfAtLeast2Elements(playerBoards, validationMessagesObj);
  if (!isArrayOfAtLeast2ElementsValidationResult.isValid) {
    return isArrayOfAtLeast2ElementsValidationResult;
  }

  for (const playerBoard of playerBoards) {
    const playerBoardValidationResult = validatePlayerBoard(
      playerBoard,
      validationMessagesObj.playerBoard
    );
    if (!playerBoardValidationResult.isValid) {
      return playerBoardValidationResult;
    }
  }

  return createValidationResult(true, validationMessagesObj.valid.default);
};

export const validateRenderGameplayUIInputs = (elementId, playerBoards) => {
  const elementIdValidationResult = validateElementId(
    elementId,
    renderGameplayUIValidationMessages.elementId
  );
  if (!elementIdValidationResult.isValid) {
    return elementIdValidationResult;
  }

  const playerBoardsValidationResult = validatePlayerBoards(
    playerBoards,
    renderGameplayUIValidationMessages.playerBoards
  );
  if (!playerBoardsValidationResult.isValid) {
    return playerBoardsValidationResult;
  }

  return createValidationResult(
    true,
    renderGameplayUIValidationMessages.valid.default
  );
};

export const validateRenderPlayerBoardInputs = (elementId, playerBoard) => {
  const elementIdValidationResult = validateElementId(
    elementId,
    renderPlayerBoardValidationMessages.elementId
  );
  if (!elementIdValidationResult.isValid) {
    return elementIdValidationResult;
  }

  const playerBoardValidationResult = validatePlayerBoard(
    playerBoard,
    renderPlayerBoardValidationMessages.playerBoard
  );
  if (!playerBoardValidationResult.isValid) {
    return playerBoardValidationResult;
  }

  return createValidationResult(
    true,
    renderPlayerBoardValidationMessages.valid.default
  );
};
