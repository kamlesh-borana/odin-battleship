export const gameboardInputsValidationMessages = {
  valid: {
    default: "Gameboard inputs are valid",
  },
  invalid: {
    default: "Invalid gameboard inputs",
  },
};

export const gameboardGetShipAtValidationMessages = {
  valid: {
    default: "Gameboard get ship at inputs are valid",
  },
  invalid: {
    default: "Invalid gameboard get ship at inputs",
  },
};

export const gameboardIsCellHitValidationMessages = {
  valid: {
    default: "Gameboard is cell hit inputs are valid",
  },
  invalid: {
    default: "Invalid gameboard is cell hit inputs",
  },
};

export const gameboardIsCellMissHitValidationMessages = {
  valid: {
    default: "Gameboard is cell miss hit inputs are valid",
  },
  invalid: {
    default: "Invalid gameboard is cell miss hit inputs",
  },
};

export const gameboardPlaceShipValidationMessages = {
  valid: {
    default: "Ship placed successfully",
  },
  invalid: {
    default: "Failed to place ship",
    alreadyOccupied: "Cannot place ship on a cell that is already occupied.",
    overlapsWithAnotherShip:
      "Cannot place ship that overlaps with another ship.",
    outOfBounds:
      "Cannot place ship that doesn't fit within the gameboard boundaries.",
  },
};

export const gameboardReceiveAttackValidationMessages = {
  valid: {
    default: "Attack received successfully",
  },
  invalid: {
    default: "Failed to receive attack",
    noShipsPlaced: "Cannot receive attack on a gameboard with no ships placed.",
    alreadyHit: "Cannot receive attack on a cell that is already hit.",
    alreadyMissed: "Cannot receive attack on a cell that is already missed.",
    shipHitFailedSilently:
      "Failed to hit the ship. Ship's hit() method returned false causing the attack to fail silently.",
  },
};
