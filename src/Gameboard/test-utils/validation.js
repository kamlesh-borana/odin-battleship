import { testIsNotAnArrayOfTwoPositiveIntegerNumbersError } from "../../test-utils/validation";

export const testInvalidGameboardDimensionsError = (
  argumentName,
  callback,
  errorMessagesObj,
  isOptional = false
) => {
  testIsNotAnArrayOfTwoPositiveIntegerNumbersError(
    argumentName,
    callback,
    errorMessagesObj,
    isOptional
  );
};
