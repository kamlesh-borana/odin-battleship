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

export const isArray = (value) => {
  return Array.isArray(value);
};

export const isObject = (value) => {
  return typeof value === "object" && value !== null;
};

export const isFunction = (value) => {
  return typeof value === "function";
};

export const isBoolean = (value) => {
  return typeof value === "boolean";
};

export const isString = (value) => {
  return typeof value === "string";
};

export const isEmptyString = (value) => {
  return isString(value) && value.trim() === "";
};

export const hasProperty = (object, propertyName) => {
  return Object.hasOwn(object, propertyName);
};

export const createValidationResult = (isValid, message) => {
  return { isValid, message };
};

export const createUniqueId = () => {
  return crypto.randomUUID();
};

export const createGameboardBoard = (dimensions) => {
  const [rows, columns] = dimensions;
  return Array.from({ length: rows }, () =>
    Array.from({ length: columns }, () => ({ hit: false, ship: null }))
  );
};
