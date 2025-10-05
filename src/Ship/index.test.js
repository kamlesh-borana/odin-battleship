import Ship from ".";
import { shipLengthValidationMessages } from "./utils/constants";

describe("Ship class module", () => {
  describe("constructor", () => {
    describe("invalid arguments", () => {
      describe("length", () => {
        it("should throw an error if no length is provided", () => {
          expect(() => new Ship()).toThrow(
            shipLengthValidationMessages.invalid.required
          );
        });

        it("should throw an error if length is undefined", () => {
          expect(() => new Ship(undefined)).toThrow(
            shipLengthValidationMessages.invalid.required
          );
        });

        it("should throw an error if length is null", () => {
          expect(() => new Ship(null)).toThrow(
            shipLengthValidationMessages.invalid.required
          );
        });

        it("should throw an error if length is not a number", () => {
          expect(() => new Ship("not a number")).toThrow(
            shipLengthValidationMessages.invalid.notANumber
          );
        });

        it("should throw an error if length is NaN", () => {
          expect(() => new Ship(NaN)).toThrow(
            shipLengthValidationMessages.invalid.notANumber
          );
        });

        it("should throw an error if length is not a finite number", () => {
          expect(() => new Ship(Infinity)).toThrow(
            shipLengthValidationMessages.invalid.notAFiniteNumber
          );
        });

        it("should throw an error if length is not an integer number", () => {
          expect(() => new Ship(1.5)).toThrow(
            shipLengthValidationMessages.invalid.notAnIntegerNumber
          );
        });

        it("should throw an error if length is a negative number", () => {
          expect(() => new Ship(-1)).toThrow(
            shipLengthValidationMessages.invalid.isNegativeNumber
          );
        });

        it("should throw an error if length is zero", () => {
          expect(() => new Ship(0)).toThrow(
            shipLengthValidationMessages.invalid.isZero
          );
        });
      });
    });

    describe("valid arguments", () => {
      it("should create a ship instance if length is a positive integer number", () => {
        expect(new Ship(3)).toBeInstanceOf(Ship);
      });
    });
  });

  describe("ship instance", () => {
    describe("properties", () => {
      describe("id", () => {
        it("should return the id of the ship", () => {
          const ship = new Ship(3);
          expect(ship.id).toBeDefined();
        });

        it("should return a unique id for each ship instance", () => {
          const ship1 = new Ship(3);
          const ship2 = new Ship(3);
          expect(ship1.id).not.toBe(ship2.id);
        });
      });

      describe("length", () => {
        it("should return the length of the ship passed to the constructor", () => {
          const ship = new Ship(3);
          expect(ship.length).toBe(3);
        });
      });

      describe("hits", () => {
        it("should return zero as it is the default value for hits", () => {
          const ship = new Ship(3);
          expect(ship.hits).toBe(0);
        });
      });
    });

    describe("methods", () => {
      describe("hit", () => {
        it("should increment the hits count by one", () => {
          const ship = new Ship(3);
          ship.hit();
          expect(ship.hits).toBe(1);
        });

        it("should return true when the ship is hit successfully", () => {
          const ship = new Ship(3);
          expect(ship.hit()).toBe(true);
        });

        it("should not increment the hits count to be greater than the ship's length", () => {
          const ship = new Ship(3);

          // Hit the ship until it's sunk
          ship.hit(); // hits: 1; length: 3
          ship.hit(); // hits: 2; length: 3
          ship.hit(); // hits: 3; length: 3; the ship is sunk

          // Further hits should not increment the hits count
          ship.hit();
          expect(ship.hits).toBe(3);
        });

        it("should return false when the ship is hit unsuccessfully as it does not increment the hits count", () => {
          const ship = new Ship(3);

          // Hit the ship until it's sunk
          ship.hit(); // hits: 1; length: 3
          ship.hit(); // hits: 2; length: 3
          ship.hit(); // hits: 3; length: 3; the ship is sunk

          // Further hits should return false
          expect(ship.hit()).toBe(false);
        });

        it.each([1, 2, 3, 4, 5, 50])(
          "should correctly track hits and return values for a ship of length %i",
          (length) => {
            const ship = new Ship(length);

            expect(ship.hits).toBe(0);

            // Hit the ship until it's sunk
            for (let i = 0; i < length; i++) {
              expect(ship.hit()).toBe(true);
              expect(ship.hits).toBe(i + 1); // Hits count should increment by one after each hit
            }

            // The ship is sunk
            expect(ship.hit()).toBe(false); // Further hits should return false
            expect(ship.hits).toBe(length); // Hits count should not change after further hits
          }
        );
      });

      describe("isSunk", () => {
        it("should return false if the ship has not been hit yet", () => {
          const ship = new Ship(3);
          expect(ship.isSunk()).toBe(false);
        });

        it("should return false if the hits count is less than the ship's length", () => {
          const ship = new Ship(3);

          ship.hit(); // hits: 1; length: 3
          expect(ship.isSunk()).toBe(false);

          ship.hit(); // hits: 2; length: 3
          expect(ship.isSunk()).toBe(false);
        });

        it("should return true if hits is equal to the ship's length", () => {
          const ship = new Ship(3);

          ship.hit(); // hits: 1; length: 3
          ship.hit(); // hits: 2; length: 3
          ship.hit(); // hits: 3; length: 3

          expect(ship.isSunk()).toBe(true);
        });

        it("should return true if a sunk ship receives further hits", () => {
          const ship = new Ship(3);

          ship.hit(); // hits: 1; length: 3
          ship.hit(); // hits: 2; length: 3
          ship.hit(); // hits: 3; length: 3

          // The ship is sunk
          expect(ship.isSunk()).toBe(true);

          // Further hits should not change the isSunk value
          ship.hit();
          expect(ship.isSunk()).toBe(true);
        });

        it.each([1, 2, 3, 4, 5, 50])(
          "should correctly track the isSunk value for a ship of length %i",
          (length) => {
            const ship = new Ship(length);

            // Hit the ship until it's sunk
            for (let i = 0; i < length; i++) {
              expect(ship.isSunk()).toBe(false); // Before each hit, the ship should not be sunk
              ship.hit();
            }

            // The ship is sunk
            expect(ship.isSunk()).toBe(true);

            // Further hits should not change the isSunk value
            ship.hit();
            expect(ship.isSunk()).toBe(true);
          }
        );
      });
    });
  });
});
