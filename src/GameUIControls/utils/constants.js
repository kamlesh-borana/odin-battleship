export const startGameCallbackValidationMessages = {
  valid: {
    default: "Start game callback is valid",
  },
  invalid: {
    default: "Invalid start game callback",
    required:
      "Start game callback is required. It cannot be null or undefined.",
    isUndefined:
      "Start game callback is required. It cannot be null or undefined.",
    isNull: "Start game callback is required. It cannot be null or undefined.",
    notAFunction: "Start game callback must be a function.",
  },
};

export const startGameOptionsValidationMessages = {
  valid: {
    default: "Start game options are valid",
  },
  invalid: {
    default: "Invalid start game options",
    required:
      "Start game options are required. It cannot be null or undefined.",
    isUndefined:
      "Start game options are required. It cannot be null or undefined.",
    isNull: "Start game options are required. It cannot be null or undefined.",
    notAnObject: "Start game options must be an object.",
    startGameOnLoadOrStartGameOnInteractionOneOfThemIsRequired:
      "Start game options must have either startGameOnLoad or startGameOnInteraction set to true.",
    buttonSelectorRequiresStartGameOnInteractionToBeTrue:
      "Start game options must have startGameOnInteraction set to true if buttonSelector is provided.",
  },
};

export const startGameInputsValidationMessages = {
  valid: {
    default: "Start game inputs are valid",
    callback: startGameCallbackValidationMessages.valid,
    options: startGameOptionsValidationMessages.valid,
  },
  invalid: {
    default: "Invalid start game inputs",
    callback: startGameCallbackValidationMessages.invalid,
    options: startGameOptionsValidationMessages.invalid,
  },
  callback: startGameCallbackValidationMessages,
  options: startGameOptionsValidationMessages,
};
