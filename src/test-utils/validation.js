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

export const testHasNoValueError = (
  argumentName,
  callback,
  errorMessagesObj
) => {
  testUndefinedError(argumentName, callback, errorMessagesObj);
  testNullError(argumentName, callback, errorMessagesObj);
};

export const testIsNotANumberError = (
  argumentName,
  callback,
  errorMessagesObj
) => {
  testHasNoValueError(argumentName, callback, errorMessagesObj);

  it.each([
    ["not a number", "not a number", errorMessagesObj.notANumber],
    ["NaN", NaN, errorMessagesObj.notANumber],
  ])(
    `should throw an error if ${argumentName} is %s`,
    (_, value, errorMessage) => {
      expect(() => callback(value)).toThrow(errorMessage);
    }
  );
};

export const testIsNotAFiniteNumberError = (
  argumentName,
  callback,
  errorMessagesObj
) => {
  testIsNotANumberError(argumentName, callback, errorMessagesObj);

  it.each([
    ["not a finite number", Infinity, errorMessagesObj.notAFiniteNumber],
  ])(
    `should throw an error if ${argumentName} is %s`,
    (_, value, errorMessage) => {
      expect(() => callback(value)).toThrow(errorMessage);
    }
  );
};

export const testIsNotAnIntegerNumberError = (
  argumentName,
  callback,
  errorMessagesObj
) => {
  testIsNotAFiniteNumberError(argumentName, callback, errorMessagesObj);

  it.each([
    ["not an integer number", 1.5, errorMessagesObj.notAnIntegerNumber],
  ])(
    `should throw an error if ${argumentName} is %s`,
    (_, value, errorMessage) => {
      expect(() => callback(value)).toThrow(errorMessage);
    }
  );
};

export const testIsNegativeIntegerNumberError = (
  argumentName,
  callback,
  errorMessagesObj
) => {
  testIsNotAnIntegerNumberError(argumentName, callback, errorMessagesObj);

  it.each([["a negative number", -1, errorMessagesObj.isNegativeNumber]])(
    `should throw an error if ${argumentName} is %s`,
    (_, value, errorMessage) => {
      expect(() => callback(value)).toThrow(errorMessage);
    }
  );
};

export const testIsNotAPositiveIntegerNumberError = (
  argumentName,
  callback,
  errorMessagesObj
) => {
  testIsNegativeIntegerNumberError(argumentName, callback, errorMessagesObj);

  it(`should throw an error if ${argumentName} is zero`, () => {
    expect(() => callback(0)).toThrow(errorMessagesObj.isZero);
  });
};

export const testArrayOfAtLeast1ElementsError = (
  argumentName,
  callback,
  errorMessagesObj
) => {
  testHasValueError(argumentName, callback, errorMessagesObj);
  it.each([
    ["is not an array", "not an array", errorMessagesObj.notAnArray],
    ["array is empty", [], errorMessagesObj.notAnArrayOfAtLeast1Element],
  ])(
    `should throw an error if ${argumentName} %s`,
    (_, value, errorMessage) => {
      expect(() => callback(value)).toThrow(errorMessage);
    }
  );
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
