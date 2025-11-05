import { testInvalidPlayerError } from "../../test-utils/player";
import {
  testIsAnEmptyStringError,
  testIsNotABooleanError,
  testIsNotAnArrayOfAtLeast2ElementsError,
  testIsNotAnObjectError,
} from "../../test-utils/validation";

export const testInvalidPlayersListError = (
  argumentName,
  callback,
  errorMessagesObj
) => {
  testIsNotAnArrayOfAtLeast2ElementsError(
    argumentName,
    callback,
    errorMessagesObj
  );

  testInvalidPlayerError(
    "player",
    (value) => callback([value, value]),
    errorMessagesObj.player
  );
};

export const testInvalidGameUIViewError = (
  argumentName,
  callback,
  errorMessagesObj
) => {
  testIsNotAnObjectError(argumentName, callback, errorMessagesObj);

  it(`should throw an error if ${argumentName} object does not have an id property`, () => {
    expect(() => callback({})).toThrow(errorMessagesObj.noIdProperty);
  });

  it(`should throw an error if ${argumentName} object does not have a renderGameplayUI method`, () => {
    expect(() => callback({ id: "123" })).toThrow(
      errorMessagesObj.noRenderGameplayUIMethod
    );
  });

  it(`should throw an error if ${argumentName} object has a renderGameplayUI method that is not a function`, () => {
    expect(() =>
      callback({ id: "123", renderGameplayUI: "not a function" })
    ).toThrow(errorMessagesObj.renderGameplayUIMethodNotAFunction);
  });
};

export const testInvalidGameUIControlsError = (
  argumentName,
  callback,
  errorMessagesObj
) => {
  testIsNotAnObjectError(argumentName, callback, errorMessagesObj);

  it(`should throw an error if ${argumentName} object does not have an id property`, () => {
    expect(() => callback({})).toThrow(errorMessagesObj.noIdProperty);
  });

  it(`should throw an error if ${argumentName} object does not have a startGame method`, () => {
    expect(() => callback({ id: "123" })).toThrow(
      errorMessagesObj.noStartGameMethod
    );
  });

  it(`should throw an error if ${argumentName} object has a startGame method that is not a function`, () => {
    expect(() => callback({ id: "123", startGame: "not a function" })).toThrow(
      errorMessagesObj.startGameMethodNotAFunction
    );
  });

  it(`should throw an error if ${argumentName} object does not have an addAttackEventListenerOnOpponentBoard method`, () => {
    expect(() => callback({ id: "123", startGame: () => {} })).toThrow(
      errorMessagesObj.noAddAttackEventListenerOnOpponentBoardMethod
    );
  });

  it(`should throw an error if ${argumentName} object has an addAttackEventListenerOnOpponentBoard method that is not a function`, () => {
    expect(() =>
      callback({
        id: "123",
        startGame: () => {},
        addAttackEventListenerOnOpponentBoard: "not a function",
      })
    ).toThrow(
      errorMessagesObj.addAttackEventListenerOnOpponentBoardMethodNotAFunction
    );
  });

  it(`should throw an error if ${argumentName} object does not have an endGame method`, () => {
    expect(() =>
      callback({
        id: "123",
        startGame: () => {},
        addAttackEventListenerOnOpponentBoard: () => {},
      })
    ).toThrow(errorMessagesObj.noEndGameMethod);
  });

  it(`should throw an error if ${argumentName} object has an endGame method that is not a function`, () => {
    expect(() =>
      callback({
        id: "123",
        startGame: () => {},
        addAttackEventListenerOnOpponentBoard: () => {},
        endGame: "not a function",
      })
    ).toThrow(errorMessagesObj.endGameMethodNotAFunction);
  });
};

export const testInvalidInitOptionsError = (
  argumentName,
  callback,
  errorMessagesObj
) => {
  const isOptional = true;
  testIsNotAnObjectError(argumentName, callback, errorMessagesObj, isOptional);

  describe("startGameOnLoad property", () => {
    const isOptional = true;
    testIsNotABooleanError(
      "startGameOnLoad",
      (value) => callback({ startGameOnLoad: value }),
      errorMessagesObj.startGameOnLoad,
      isOptional
    );
  });

  describe("startGameOnInteraction property", () => {
    const isOptional = true;
    testIsNotABooleanError(
      "startGameOnInteraction",
      (value) =>
        callback({ startGameOnLoad: false, startGameOnInteraction: value }),
      errorMessagesObj.startGameOnInteraction,
      isOptional
    );
  });

  describe("buttonSelector property", () => {
    const isOptional = true;
    testIsAnEmptyStringError(
      "buttonSelector",
      (value) =>
        callback({
          startGameOnLoad: false,
          startGameOnInteraction: true,
          buttonSelector: value,
        }),
      errorMessagesObj.buttonSelector,
      isOptional
    );
  });
};
