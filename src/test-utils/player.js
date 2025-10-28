import { createUniqueId } from "../utils";
import { testIsNotAStringError } from "./validation";

export const createMockPlayer = (type, options = {}) => {
  const { id = createUniqueId() } = options;
  return {
    id,
    type,
  };
};

export const testInvalidPlayerTypeError = (
  argumentName,
  callback,
  errorMessagesObj
) => {
  testIsNotAStringError(argumentName, callback, errorMessagesObj);

  it(`should throw an error if ${argumentName} is not a valid type`, () => {
    expect(() => callback("not a valid type")).toThrow(
      errorMessagesObj.notAValidType
    );
  });
};
