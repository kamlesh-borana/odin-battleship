export const createElement = (elementType, options = {}) => {
  const { id, classNames = [], innerHTML, attributes = {} } = options;

  const newElement = document.createElement(elementType);

  Object.entries(attributes).forEach(([key, value]) => {
    newElement.setAttribute(key, value);
  });

  if (id) {
    newElement.id = id;
  }

  if (classNames.length > 0) {
    newElement.className = classNames.join(" ");
  }

  if (innerHTML) {
    newElement.innerHTML = innerHTML;
  }

  return newElement;
};
