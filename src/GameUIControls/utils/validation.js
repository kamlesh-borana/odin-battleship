import { createValidationResult } from "../../utils";
import { validateIsFunction, validateIsObject } from "../../utils/validation";
import { startGameInputsValidationMessages } from "./constants";

export const validateStartGameInputs = (callback, options) => {
  const validationMessagesObj = startGameInputsValidationMessages;

  const isFunctionValidationResult = validateIsFunction(
    callback,
    validationMessagesObj.callback
  );
  if (!isFunctionValidationResult.isValid) {
    return isFunctionValidationResult;
  }

  const isObjectValidationResult = validateIsObject(
    options,
    validationMessagesObj.options
  );
  if (!isObjectValidationResult.isValid) {
    return isObjectValidationResult;
  }

  if (!options.startGameOnLoad && !options.startGameOnInteraction) {
    return createValidationResult(
      false,
      validationMessagesObj.options.invalid
        .startGameOnLoadOrStartGameOnInteractionOneOfThemIsRequired
    );
  }

  if (options.buttonSelector && !options.startGameOnInteraction) {
    return createValidationResult(
      false,
      validationMessagesObj.options.invalid
        .buttonSelectorRequiresStartGameOnInteractionToBeTrue
    );
  }

  return createValidationResult(true, validationMessagesObj.valid.default);
};
