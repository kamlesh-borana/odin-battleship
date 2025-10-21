export const createConstructorCallback = (ClassName, additionalArgs = []) => {
  if (additionalArgs.length > 0) {
    return (value) => new ClassName(...additionalArgs, value);
  }
  return (value) => new ClassName(value);
};

export const createMethodCallback = (
  instanceObject,
  methodName,
  additionalArgs = []
) => {
  if (additionalArgs.length > 0) {
    return (value) => instanceObject[methodName](...additionalArgs, value);
  }
  return (value) => instanceObject[methodName](value);
};

export const testUndefinedError = (
  argumentName,
  callback,
  errorMessagesObj
) => {
  it.each([
    ["not provided", , errorMessagesObj.required],
    ["undefined", undefined, errorMessagesObj.undefined],
  ])(
    `should throw an error if ${argumentName} is %s`,
    (_, value, errorMessage) => {
      expect(() => callback(value)).toThrow(errorMessage);
    }
  );
};

export const testNullError = (argumentName, callback, errorMessagesObj) => {
  it(`should throw an error if ${argumentName} is null`, () => {
    expect(() => callback(null)).toThrow(errorMessagesObj.null);
  });
};

export const testHasValueError = (argumentName, callback, errorMessagesObj) => {
  testUndefinedError(argumentName, callback, errorMessagesObj);
  testNullError(argumentName, callback, errorMessagesObj);
};

export const testArrayOfAtLeast2ElementsError = (
  argumentName,
  callback,
  errorMessagesObj
) => {
  testHasValueError(argumentName, callback, errorMessagesObj);
  it.each([
    ["is not an array", "not an array", errorMessagesObj.notAnArray],
    ["array is empty", [], errorMessagesObj.notAnArrayOfAtLeast2Elements],
    [
      "array length is less than 2",
      [1],
      errorMessagesObj.notAnArrayOfAtLeast2Elements,
    ],
  ])(
    `should throw an error if ${argumentName} %s`,
    (_, value, errorMessage) => {
      expect(() => callback(value)).toThrow(errorMessage);
    }
  );
};

export const testArrayOfTwoIntegerNumbersError = (
  argumentName,
  callback,
  errorMessagesObj
) => {
  it.each([
    ["is not an array", "not an array", errorMessagesObj.notAnArray],
    ["array is empty", [], errorMessagesObj.notAnArrayOfTwoElements],
    [
      "array length is greater than 2",
      [1, 2, 3],
      errorMessagesObj.notAnArrayOfTwoElements,
    ],
    [
      "array length is less than 2",
      [1],
      errorMessagesObj.notAnArrayOfTwoElements,
    ],
    [
      "array elements are not numbers",
      [1, "2"],
      errorMessagesObj.notAnArrayOfTwoNumbers,
    ],
    [
      "array elements contain NaN",
      [1, NaN],
      errorMessagesObj.notAnArrayOfTwoNumbers,
    ],
    [
      "array elements are not finite numbers",
      [1, Infinity],
      errorMessagesObj.notAnArrayOfTwoFiniteNumbers,
    ],
    [
      "array elements are not integer numbers",
      [1, 1.5],
      errorMessagesObj.notAnArrayOfTwoIntegerNumbers,
    ],
  ])(
    `should throw an error if ${argumentName} %s`,
    (_, value, errorMessage) => {
      expect(() => callback(value)).toThrow(errorMessage);
    }
  );
};

export const testArrayOfTwoPositiveIntegerNumbersError = (
  argumentName,
  callback,
  errorMessagesObj
) => {
  testArrayOfTwoIntegerNumbersError(argumentName, callback, errorMessagesObj);
  it.each([
    [
      "array elements contain negative numbers",
      [-1, 1],
      errorMessagesObj.notAnArrayOfTwoPositiveIntegerNumbers,
    ],
    [
      "array elements contain zero",
      [0, 1],
      errorMessagesObj.notAnArrayOfTwoPositiveIntegerNumbers,
    ],
  ])(
    `should throw an error if ${argumentName} %s`,
    (_, value, errorMessage) => {
      expect(() => callback(value)).toThrow(errorMessage);
    }
  );
};
