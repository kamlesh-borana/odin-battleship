import { createValidationResult, hasProperty, isFunction } from "../../utils";
import { validatePlayer } from "../../utils/player";
import {
  validateIsArrayOfAtLeast2Elements,
  validateIsBoolean,
  validateIsNotAnEmptyString,
  validateIsObject,
} from "../../utils/validation";
import {
  gameInputsValidationMessages,
  gameUIControlsValidationMessages,
  gameUIViewValidationMessages,
  initInputsValidationMessages,
  initOptionsValidationMessages,
  playersListValidationMessages,
} from "./constants";

const validatePlayersList = (
  players,
  validationMessagesObj = playersListValidationMessages
) => {
  const isArrayOfAtLeast2ElementsValidationResult =
    validateIsArrayOfAtLeast2Elements(players, validationMessagesObj);
  if (!isArrayOfAtLeast2ElementsValidationResult.isValid) {
    return isArrayOfAtLeast2ElementsValidationResult;
  }

  for (const player of players) {
    const playerValidationResult = validatePlayer(
      player,
      validationMessagesObj.player
    );
    if (!playerValidationResult.isValid) {
      return playerValidationResult;
    }
  }

  return createValidationResult(true, validationMessagesObj.valid.default);
};

const validateGameUIView = (
  gameUIView,
  validationMessagesObj = gameUIViewValidationMessages
) => {
  const isObjectValidationResult = validateIsObject(
    gameUIView,
    validationMessagesObj
  );
  if (!isObjectValidationResult.isValid) {
    return isObjectValidationResult;
  }

  if (!hasProperty(gameUIView, "id")) {
    return createValidationResult(
      false,
      validationMessagesObj.invalid.noIdProperty
    );
  }

  if (!hasProperty(gameUIView, "renderGameplayUI")) {
    return createValidationResult(
      false,
      validationMessagesObj.invalid.noRenderGameplayUIMethod
    );
  }

  if (!isFunction(gameUIView.renderGameplayUI)) {
    return createValidationResult(
      false,
      validationMessagesObj.invalid.renderGameplayUIMethodNotAFunction
    );
  }

  return createValidationResult(true, validationMessagesObj.valid.default);
};

export const validateGameUIControls = (
  gameUIControls,
  validationMessagesObj = gameUIControlsValidationMessages
) => {
  const isObjectValidationResult = validateIsObject(
    gameUIControls,
    validationMessagesObj
  );
  if (!isObjectValidationResult.isValid) {
    return isObjectValidationResult;
  }

  if (!hasProperty(gameUIControls, "id")) {
    return createValidationResult(
      false,
      validationMessagesObj.invalid.noIdProperty
    );
  }

  if (!hasProperty(gameUIControls, "startGame")) {
    return createValidationResult(
      false,
      validationMessagesObj.invalid.noStartGameMethod
    );
  }

  if (!isFunction(gameUIControls.startGame)) {
    return createValidationResult(
      false,
      validationMessagesObj.invalid.startGameMethodNotAFunction
    );
  }

  if (!hasProperty(gameUIControls, "addAttackEventListenerOnOpponentBoard")) {
    return createValidationResult(
      false,
      validationMessagesObj.invalid
        .noAddAttackEventListenerOnOpponentBoardMethod
    );
  }

  if (!isFunction(gameUIControls.addAttackEventListenerOnOpponentBoard)) {
    return createValidationResult(
      false,
      validationMessagesObj.invalid
        .addAttackEventListenerOnOpponentBoardMethodNotAFunction
    );
  }

  if (!hasProperty(gameUIControls, "endGame")) {
    return createValidationResult(
      false,
      validationMessagesObj.invalid.noEndGameMethod
    );
  }

  if (!isFunction(gameUIControls.endGame)) {
    return createValidationResult(
      false,
      validationMessagesObj.invalid.endGameMethodNotAFunction
    );
  }

  return createValidationResult(true, validationMessagesObj.valid.default);
};

export const validateGameInputs = (players, gameUIView, gameUIControls) => {
  const playersListValidationResult = validatePlayersList(
    players,
    playersListValidationMessages
  );
  if (!playersListValidationResult.isValid) {
    return playersListValidationResult;
  }

  const gameUIViewValidationResult = validateGameUIView(
    gameUIView,
    gameUIViewValidationMessages
  );
  if (!gameUIViewValidationResult.isValid) {
    return gameUIViewValidationResult;
  }

  const gameUIControlsValidationResult = validateGameUIControls(
    gameUIControls,
    gameUIControlsValidationMessages
  );
  if (!gameUIControlsValidationResult.isValid) {
    return gameUIControlsValidationResult;
  }

  return createValidationResult(
    true,
    gameInputsValidationMessages.valid.default
  );
};

const validateInitOptions = (
  options,
  validationMessagesObj = initOptionsValidationMessages
) => {
  const isObjectValidationResult = validateIsObject(
    options,
    validationMessagesObj
  );
  if (!isObjectValidationResult.isValid) {
    return isObjectValidationResult;
  }

  if (!hasProperty(options, "startGameOnLoad")) {
    return createValidationResult(
      false,
      validationMessagesObj.invalid.noStartGameOnLoadProperty
    );
  }

  const startGameOnLoadValidationResult = validateIsBoolean(
    options.startGameOnLoad,
    validationMessagesObj.startGameOnLoad
  );
  if (!startGameOnLoadValidationResult.isValid) {
    return startGameOnLoadValidationResult;
  }

  if (!hasProperty(options, "startGameOnInteraction")) {
    return createValidationResult(
      false,
      validationMessagesObj.invalid.noStartGameOnInteractionProperty
    );
  }

  const startGameOnInteractionValidationResult = validateIsBoolean(
    options.startGameOnInteraction,
    validationMessagesObj.startGameOnInteraction
  );
  if (!startGameOnInteractionValidationResult.isValid) {
    return startGameOnInteractionValidationResult;
  }

  if (!hasProperty(options, "buttonSelector")) {
    return createValidationResult(
      false,
      validationMessagesObj.invalid.noButtonSelectorProperty
    );
  }

  const buttonSelectorValidationResult = validateIsNotAnEmptyString(
    options.buttonSelector,
    validationMessagesObj.buttonSelector
  );
  if (!buttonSelectorValidationResult.isValid) {
    return buttonSelectorValidationResult;
  }

  return createValidationResult(true, validationMessagesObj.valid.default);
};

export const validateInitInputs = (options) => {
  const validationResult = validateInitOptions(
    options,
    initOptionsValidationMessages
  );
  if (!validationResult.isValid) {
    return validationResult;
  }

  return createValidationResult(
    true,
    initInputsValidationMessages.valid.default
  );
};
