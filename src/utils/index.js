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
  /**
   * Note: We are using the 'in' operator instead of Object.hasOwn() here.
   *
   * Object.hasOwn() only checks for properties directly defined on the object
   * and does not traverse the prototype chain. This would cause issues with
   * correctly identifying methods, getters, and setters, which are typically
   * defined on the class's prototype and not directly on the object instance.
   *
   * The 'in' operator, by contrast, correctly checks for property existence
   * on both the object itself and its entire prototype chain.
   */
  return propertyName in object;
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

export const createMessageFromTemplate = (template, args) => {
  return template.replace(/{(\w+)}/g, (match, key) => args[key] ?? match);
};

export const createCoordinatesString = (coordinates) => {
  return `[${coordinates.join(", ")}]`;
};
