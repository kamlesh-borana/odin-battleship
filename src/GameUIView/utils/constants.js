import { ALLOWED_CELL_STATES } from "../../Game/utils/constants";

export const elementIdValidationMessages = {
  valid: {
    default: "Element id is valid",
  },
  invalid: {
    default: "Invalid element id",
    required: "Element id is required. It cannot be null or undefined.",
    isUndefined: "Element id is required. It cannot be null or undefined.",
    isNull: "Element id is required. It cannot be null or undefined.",
    notAString: "Element id must be a string.",
    isEmptyString: "Element id cannot be an empty string.",
    noHtmlElementWithId: "No HTML element with the given id exists.",
  },
};

export const playerBoardCellValidationMessages = {
  valid: {
    default: "Player board cell is valid",
  },
  invalid: {
    default: "Invalid player board cell",
    required: "Player board cell is required. It cannot be null or undefined.",
    isUndefined:
      "Player board cell is required. It cannot be null or undefined.",
    isNull: "Player board cell is required. It cannot be null or undefined.",
    notAString: "Player board cell must be a string.",
    isEmptyString: "Player board cell cannot be an empty string.",
    notAValidState: `Player board cell must be a valid state. Valid states are ${ALLOWED_CELL_STATES.join(
      ", "
    )}.`,
  },
};

export const playerBoardRowValidationMessages = {
  valid: {
    default: "Player board row is valid",
    cell: playerBoardCellValidationMessages.valid,
  },
  invalid: {
    default: "Invalid player board row",
    required: "Player board row is required. It cannot be null or undefined.",
    isUndefined:
      "Player board row is required. It cannot be null or undefined.",
    isNull: "Player board row is required. It cannot be null or undefined.",
    notAnArray: "Player board row must be an array.",
    emptyArray: "Player board row must not be an empty array.",
    rowLengthMismatch:
      "Player board row must have the same length as the other rows.",
    cell: playerBoardCellValidationMessages.invalid,
  },
  cell: playerBoardCellValidationMessages,
};

export const playerBoardValidationMessages = {
  valid: {
    default: "Player board is valid",
    row: playerBoardRowValidationMessages.valid,
  },
  invalid: {
    default: "Invalid player board",
    required: "Player board is required. It cannot be null or undefined.",
    isUndefined: "Player board is required. It cannot be null or undefined.",
    isNull: "Player board is required. It cannot be null or undefined.",
    notAnArray: "Player board must be an array.",
    emptyArray: "Player board must not be an empty array.",
    row: playerBoardRowValidationMessages.invalid,
  },
  row: playerBoardRowValidationMessages,
};

export const playerBoardsValidationMessages = {
  valid: {
    default: "Player boards are valid",
    playerBoard: playerBoardValidationMessages.valid,
  },
  invalid: {
    default: "Invalid player boards",
    required: "Player boards are required. It cannot be null or undefined.",
    isUndefined: "Player boards are required. It cannot be null or undefined.",
    isNull: "Player boards are required. It cannot be null or undefined.",
    notAnArray: "Player boards must be an array.",
    notAnArrayOfAtLeast2Elements:
      "Player boards must be an array of at least 2 elements.",
    playerBoard: playerBoardValidationMessages.invalid,
  },
  playerBoard: playerBoardValidationMessages,
};

export const renderGameplayUIValidationMessages = {
  valid: {
    default: "Render gameplay UI inputs are valid",
    elementId: elementIdValidationMessages.valid,
    playerBoards: playerBoardsValidationMessages.valid,
  },
  invalid: {
    default: "Invalid render gameplay UI inputs",
    elementId: elementIdValidationMessages.invalid,
    playerBoards: playerBoardsValidationMessages.invalid,
  },
  elementId: elementIdValidationMessages,
  playerBoards: playerBoardsValidationMessages,
};

export const renderPlayerBoardValidationMessages = {
  valid: {
    default: "Render player board inputs are valid",
    elementId: elementIdValidationMessages.valid,
    playerBoard: playerBoardValidationMessages.valid,
  },
  invalid: {
    default: "Invalid render player board inputs",
    elementId: elementIdValidationMessages.invalid,
    playerBoard: playerBoardValidationMessages.invalid,
  },
  elementId: elementIdValidationMessages,
  playerBoard: playerBoardValidationMessages,
};
