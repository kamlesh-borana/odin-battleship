export const gamePlayersValidationMessages = {
  valid: {
    default: "Game players are valid",
  },
  invalid: {
    default: "Invalid game players",
    required: "Game players are required. It cannot be null or undefined.",
    undefined: "Game players are required. It cannot be null or undefined.",
    null: "Game players are required. It cannot be null or undefined.",
    notAnArray: "Game players must be an array.",
    notAnArrayOfAtLeast2Elements:
      "Game players must be an array of at least 2 elements.",
    notAnArrayOfPlayerObjects:
      "Game players must be an array of player objects.",
  },
};
