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

export const placeShipFailedSilentlyErrorMessage =
  "Place ship method did not return true for the ship. The ship was not placed successfully.";
export const addShipsErrorMessageTemplate =
  "Failed to place all ships on the gameboard. Some ships were not placed successfully. An error occurred while placing the {shipName} at coordinates {coordinates} in the {direction} direction - {errorMessage}";
