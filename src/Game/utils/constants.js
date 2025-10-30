import { playerTypeValidationMessages } from "../../utils/constants";

export const gameInputsValidationMessages = {
  valid: {
    default: "Game inputs are valid",
  },
  invalid: {
    default: "Invalid game inputs",
  },
};

export const playersListValidationMessages = {
  valid: {
    default: "Players list is valid",
    playerType: playerTypeValidationMessages.valid,
  },
  invalid: {
    default: "Invalid players list",
    required: "Players list is required. It cannot be null or undefined.",
    isUndefined: "Players list is required. It cannot be null or undefined.",
    isNull: "Players list is required. It cannot be null or undefined.",
    notAnArray: "Players list must be an array.",
    notAnArrayOfAtLeast2Elements:
      "Players list must be an array of at least 2 elements.",
    notAnArrayOfObjects: "Players list must be an array of objects.",
    noIdProperty: "Players list objects must have an id property.",
    noTypeProperty: "Players list objects must have a type property.",
    playerType: playerTypeValidationMessages.invalid,
    noGetShipAtMethod: "Players list objects must have a getShipAt method.",
    getShipAtMethodNotAFunction:
      "Players list objects getShipAt method must be a function.",
    noAddShipsMethod: "Players list objects must have an addShips method.",
    addShipsMethodNotAFunction:
      "Players list objects addShips method must be a function.",
    noGetBoardMethod: "Players list objects must have a getBoard method.",
    getBoardMethodNotAFunction:
      "Players list objects getBoard method must be a function.",
  },
  playerType: playerTypeValidationMessages,
};
