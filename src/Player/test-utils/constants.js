import { createMockShip } from "../../test-utils/ship";
import { DIRECTIONS } from "../../utils/constants";

export const VALID_ADD_SHIPS_INPUTS = [
  [
    1,
    [
      {
        ship: createMockShip(1),
        coordinates: [0, 0],
        direction: DIRECTIONS.HORIZONTAL,
      },
    ],
  ],
  [
    2,
    [
      {
        ship: createMockShip(1),
        coordinates: [0, 0],
        direction: DIRECTIONS.HORIZONTAL,
      },
      {
        ship: createMockShip(2),
        coordinates: [2, 0],
        direction: DIRECTIONS.HORIZONTAL,
      },
    ],
  ],
  [
    5,
    [
      {
        ship: createMockShip(1),
        coordinates: [0, 0],
        direction: DIRECTIONS.HORIZONTAL,
      },
      {
        ship: createMockShip(2),
        coordinates: [2, 0],
        direction: DIRECTIONS.HORIZONTAL,
      },
      {
        ship: createMockShip(3),
        coordinates: [3, 0],
        direction: DIRECTIONS.HORIZONTAL,
      },
      {
        ship: createMockShip(4),
        coordinates: [4, 0],
        direction: DIRECTIONS.HORIZONTAL,
      },
      {
        ship: createMockShip(5),
        coordinates: [5, 0],
        direction: DIRECTIONS.HORIZONTAL,
      },
    ],
  ],
];
