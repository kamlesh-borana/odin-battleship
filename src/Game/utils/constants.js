import { playerValidationMessages } from "../../utils/constants";

export const CELL_STATES = {
  EMPTY: "empty",
  SHIP: "ship",
  HIT: "hit",
  MISS: "miss",
  SUNK: "sunk",
};
export const ALLOWED_CELL_STATES = Object.values(CELL_STATES);

export const DEFAULT_START_GAME_BUTTON_SELECTOR = "#play-button";
export const DEFAULT_PLAY_AGAIN_BUTTON_ID = "play-again-button";

export const DEFAULT_GAME_INIT_OPTIONS = {
  startGameOnLoad: false,
  startGameOnInteraction: true,
  buttonSelector: DEFAULT_START_GAME_BUTTON_SELECTOR,
};

export const DEFAULT_MY_BOARD_ID = "my-board";
export const DEFAULT_OPPONENT_BOARD_ID = "opponent-board";

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
    player: playerValidationMessages.valid,
  },
  invalid: {
    default: "Invalid players list",
    required: "Players list is required. It cannot be null or undefined.",
    isUndefined: "Players list is required. It cannot be null or undefined.",
    isNull: "Players list is required. It cannot be null or undefined.",
    notAnArray: "Players list must be an array.",
    notAnArrayOfAtLeast2Elements:
      "Players list must be an array of at least 2 elements.",
    player: playerValidationMessages.invalid,
  },
  player: playerValidationMessages,
};

export const gameUIViewValidationMessages = {
  valid: {
    default: "GameUIView is valid",
  },
  invalid: {
    default: "Invalid GameUIView",
    noIdProperty: "GameUIView must have an id property.",
    noRenderGameplayUIMethod: "GameUIView must have a renderGameplayUI method.",
    renderGameplayUIMethodNotAFunction:
      "GameUIView's renderGameplayUI method must be a function.",
  },
};

export const gameUIControlsValidationMessages = {
  valid: {
    default: "GameUIControls is valid",
  },
  invalid: {
    default: "Invalid GameUIControls",
    noIdProperty: "GameUIControls must have an id property.",
    noStartGameMethod: "GameUIControls must have a startGame method.",
    startGameMethodNotAFunction:
      "GameUIControls' startGame method must be a function.",
    noAddAttackEventListenerOnOpponentBoardMethod:
      "GameUIControls must have an addAttackEventListenerOnOpponentBoard method.",
    addAttackEventListenerOnOpponentBoardMethodNotAFunction:
      "GameUIControls' addAttackEventListenerOnOpponentBoard method must be a function.",
    noEndGameMethod: "GameUIControls must have an endGame method.",
    endGameMethodNotAFunction:
      "GameUIControls' endGame method must be a function.",
  },
};

export const initOptionsStartGameOnLoadValidationMessages = {
  valid: {
    default: "Init options' startGameOnLoad property is valid",
  },
  invalid: {
    default: "Invalid init options' startGameOnLoad property",
    required:
      "Init options' startGameOnLoad property is required. It cannot be null or undefined.",
    isUndefined:
      "Init options' startGameOnLoad property is required. It cannot be null or undefined.",
    isNull:
      "Init options' startGameOnLoad property is required. It cannot be null or undefined.",
    notABoolean: "Init options' startGameOnLoad property must be a boolean.",
  },
};

export const initOptionsStartGameOnInteractionValidationMessages = {
  valid: {
    default: "Init options' startGameOnInteraction property is valid",
  },
  invalid: {
    default: "Invalid init options' startGameOnInteraction property",
    required:
      "Init options' startGameOnInteraction property is required. It cannot be null or undefined.",
    isUndefined:
      "Init options' startGameOnInteraction property is required. It cannot be null or undefined.",
    isNull:
      "Init options' startGameOnInteraction property is required. It cannot be null or undefined.",
    notABoolean:
      "Init options' startGameOnInteraction property must be a boolean.",
  },
};

export const initOptionsButtonSelectorValidationMessages = {
  valid: {
    default: "Init options' buttonSelector property is valid",
  },
  invalid: {
    default: "Invalid init options' buttonSelector property",
    required:
      "Init options' buttonSelector property is required. It cannot be null or undefined.",
    isUndefined:
      "Init options' buttonSelector property is required. It cannot be null or undefined.",
    isNull:
      "Init options' buttonSelector property is required. It cannot be null or undefined.",
    notAString: "Init options' buttonSelector property must be a string.",
    isEmptyString:
      "Init options' buttonSelector property must be a non-empty string.",
  },
};

export const initOptionsValidationMessages = {
  valid: {
    default: "Init options are valid",
    startGameOnLoad: initOptionsStartGameOnLoadValidationMessages.valid,
    startGameOnInteraction:
      initOptionsStartGameOnInteractionValidationMessages.valid,
    buttonSelector: initOptionsButtonSelectorValidationMessages.valid,
  },
  invalid: {
    default: "Invalid init options",
    notAnObject: "Init options must be an object.",
    noStartGameOnLoadProperty:
      "Init options must have a startGameOnLoad property.",
    startGameOnLoad: initOptionsStartGameOnLoadValidationMessages.invalid,
    noStartGameOnInteractionProperty:
      "Init options must have a startGameOnInteraction property.",
    startGameOnInteraction:
      initOptionsStartGameOnInteractionValidationMessages.invalid,
    noButtonSelectorProperty:
      "Init options must have a buttonSelector property.",
    buttonSelector: initOptionsButtonSelectorValidationMessages.invalid,
  },
  startGameOnLoad: initOptionsStartGameOnLoadValidationMessages,
  startGameOnInteraction: initOptionsStartGameOnInteractionValidationMessages,
  buttonSelector: initOptionsButtonSelectorValidationMessages,
};

export const initInputsValidationMessages = {
  valid: {
    default: "Init inputs are valid",
    options: initOptionsValidationMessages.valid,
  },
  invalid: {
    default: "Invalid init inputs",
    options: initOptionsValidationMessages.invalid,
  },
  options: initOptionsValidationMessages,
};
