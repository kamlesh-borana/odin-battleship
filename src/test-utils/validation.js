export const testUndefinedError = (
  argumentName,
  callback,
  errorMessagesObj
) => {
  it.each([
    ["not provided", , errorMessagesObj.required],
    ["undefined", undefined, errorMessagesObj.isUndefined],
  ])(
    `should throw an error if ${argumentName} is %s`,
    (_, value, errorMessage) => {
      expect(() => callback(value)).toThrow(errorMessage);
    }
  );
};

export const testNullError = (argumentName, callback, errorMessagesObj) => {
  it(`should throw an error if ${argumentName} is null`, () => {
    expect(() => callback(null)).toThrow(errorMessagesObj.isNull);
  });
};

export const testHasNoValueError = (
  argumentName,
  callback,
  errorMessagesObj,
  isOptional = false
) => {
  if (!isOptional) {
    testUndefinedError(argumentName, callback, errorMessagesObj);
  }
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

export const testIsNotAnArrayError = (
  argumentName,
  callback,
  errorMessagesObj,
  isOptional = false
) => {
  testHasNoValueError(argumentName, callback, errorMessagesObj, isOptional);

  it(`should throw an error if ${argumentName} is not an array`, () => {
    expect(() => callback("not an array")).toThrow(errorMessagesObj.notAnArray);
  });
};

export const testIsNotAnArrayOfTwoElementsError = (
  argumentName,
  callback,
  errorMessagesObj,
  isOptional = false
) => {
  testIsNotAnArrayError(argumentName, callback, errorMessagesObj, isOptional);

  it.each([
    ["array is empty", [], errorMessagesObj.notAnArrayOf2Elements],
    [
      "array length is less than 2",
      [1],
      errorMessagesObj.notAnArrayOf2Elements,
    ],
    [
      "array length is greater than 2",
      [1, 2, 3],
      errorMessagesObj.notAnArrayOf2Elements,
    ],
  ])(
    `should throw an error if ${argumentName} %s`,
    (_, value, errorMessage) => {
      expect(() => callback(value)).toThrow(errorMessage);
    }
  );
};

export const testIsNotAnArrayOfTwoNumbersError = (
  argumentName,
  callback,
  errorMessagesObj,
  isOptional = false
) => {
  testIsNotAnArrayOfTwoElementsError(
    argumentName,
    callback,
    errorMessagesObj,
    isOptional
  );

  it.each([
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
  ])(
    `should throw an error if ${argumentName} %s`,
    (_, value, errorMessage) => {
      expect(() => callback(value)).toThrow(errorMessage);
    }
  );
};

export const testIsNotAnArrayOfTwoFiniteNumbersError = (
  argumentName,
  callback,
  errorMessagesObj,
  isOptional = false
) => {
  testIsNotAnArrayOfTwoNumbersError(
    argumentName,
    callback,
    errorMessagesObj,
    isOptional
  );

  it.each([
    [
      "array elements are not finite numbers",
      [1, Infinity],
      errorMessagesObj.notAnArrayOfTwoFiniteNumbers,
    ],
  ])(
    `should throw an error if ${argumentName} %s`,
    (_, value, errorMessage) => {
      expect(() => callback(value)).toThrow(errorMessage);
    }
  );
};

export const testIsNotAnArrayOfTwoIntegerNumbersError = (
  argumentName,
  callback,
  errorMessagesObj,
  isOptional = false
) => {
  testIsNotAnArrayOfTwoFiniteNumbersError(
    argumentName,
    callback,
    errorMessagesObj,
    isOptional
  );

  it.each([
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

export const testIsNotAnArrayOfTwoPositiveIntegerNumbersError = (
  argumentName,
  callback,
  errorMessagesObj,
  isOptional = false
) => {
  testIsNotAnArrayOfTwoIntegerNumbersError(
    argumentName,
    callback,
    errorMessagesObj,
    isOptional
  );

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

export const testIsNotAnObjectError = (
  argumentName,
  callback,
  errorMessagesObj
) => {
  testHasNoValueError(argumentName, callback, errorMessagesObj);

  it(`should throw an error if ${argumentName} is not an object`, () => {
    expect(() => callback("not an object")).toThrow(
      errorMessagesObj.notAnObject
    );
  });
};

export const testIsNotAStringError = (
  argumentName,
  callback,
  errorMessagesObj
) => {
  testHasNoValueError(argumentName, callback, errorMessagesObj);

  it(`should throw an error if ${argumentName} is not a string`, () => {
    expect(() => callback(1)).toThrow(errorMessagesObj.notAString);
  });
};
