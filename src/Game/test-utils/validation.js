import { testIsNotAnArrayOfAtLeast2ElementsError } from "../../test-utils/validation";

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

  it(`should throw an error if ${argumentName} is not an array of objects`, () => {
    expect(() => callback(["not an object", "not an object"])).toThrow(
      errorMessagesObj.notAnArrayOfObjects
    );
  });
};
