export const createGameboardBoard = (dimensions) => {
  const [rows, columns] = dimensions;
  return Array.from({ length: rows }, () =>
    Array.from({ length: columns }, () => ({ hit: false, ship: null }))
  );
};
