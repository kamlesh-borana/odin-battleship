export const playerInputsValidationMessages = {
  valid: {
    default: "Player inputs are valid",
  },
  invalid: {
    default: "Invalid player inputs",
  },
};

export const getShipAtErrorMessageTemplate =
  "Failed to get ship at coordinates {coordinates} - {errorMessage}";

export const playerAddShipsInputsValidationMessages = {
  valid: {
    default: "Player add ships inputs are valid",
  },
  invalid: {
    default: "Invalid player add ships inputs",
  },
};

export const addShipErrorMessageTemplate =
  "Failed to place the {shipName} at coordinates {coordinates} in the {direction} direction - {errorMessage}";
export const addShipsErrorMessageTemplate =
  "Failed to place all ships on the gameboard. Some ships might be placed successfully but an error occurred while placing the {shipName} at coordinates {coordinates} in the {direction} direction - {errorMessage}";
export const receiveAttackErrorMessageTemplate =
  "Failed to receive an attack on the player's gameboard at coordinates {coordinates} - {errorMessage}";
