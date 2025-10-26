import { createUniqueId } from "../../utils";

export const createMockShip = (length, options = {}) => {
  const {
    id = createUniqueId(),
    hitReturnValue = true,
    isSunkReturnValue = false,
  } = options;
  return {
    id,
    length,
    hit: jest.fn().mockReturnValue(hitReturnValue),
    isSunk: jest.fn().mockReturnValue(isSunkReturnValue),
  };
};
