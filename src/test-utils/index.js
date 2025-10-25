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
