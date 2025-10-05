export const isUndefined = (value) => {
  return value === undefined;
};

export const isNull = (value) => {
  return value === null;
};

export const hasValue = (value) => {
  return !isUndefined(value) && !isNull(value);
};

export const isNumber = (value) => {
  return typeof value === "number" && !Number.isNaN(value);
};

export const isFiniteNumber = (value) => {
  return Number.isFinite(value);
};

export const isIntegerNumber = (value) => {
  return Number.isInteger(value);
};

export const isNegativeNumber = (value) => {
  return value < 0;
};

export const isZero = (value) => {
  return value === 0;
};

export const isPositiveNumber = (value) => {
  return value > 0;
};

export const createValidationResult = (isValid, message) => {
  return { isValid, message };
};
