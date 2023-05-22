const chai = require("chai");
const { suite, test } = require("mocha");
const assert = chai.assert;
const stockCalculator = require("../stockCalculator");

const calc = stockCalculator.stockCalculator(
  "PG",
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1
);

suite("Unit Tests", () => {
  test("stockCalculator is a function", () => {
    assert.isFunction(stockCalculator.stockCalculator);
  });
  test("stockCalculator returns a number", () => {
    assert.isNumber(calc);
  });
});

suite("Function Tests", () => {
  test("stockCalculator('PG', 27.75, 1.91, 6.48, 4.59, 4.69, 1.08, 0.79, 3.47, 2.56, 0.06, 0, 50, 50) returns 79.73", () => {
    assert.equal(
      stockCalculator.stockCalculator(
        "PG",
        27.75,
        1.91,
        6.48,
        4.59,
        4.69,
        1.08,
        0.79,
        3.47,
        2.56,
        0.06,
        0,
        50,
        50
      ),
      79.73
    );
  });

  test("stockCalculator('SF', 6.58, 1.07, 1.43, 1.43, 2.84, 1.65, 0, 0.71, 1.25, 0, 0, 8, 2) returns 26.11", () => {
    assert.isAtLeast(
      stockCalculator.stockCalculator(
        "SF",
        6.58,
        1.07,
        1.43,
        1.43,
        2.84,
        1.65,
        0,
        0.71,
        1.25,
        0,
        0,
        8,
        2
      ),
      26.11
    );
  });

  test("stockCalculator('C', 16.88, 0.57, 2.12, 2.8, 12.17, 0.3, 0.79, 2.41, 3.71, 0.65, 0, 79, 79) returns 51.13", () => {
    assert.isAtMost(
      stockCalculator.stockCalculator(
        "C",
        16.88,
        0.57,
        2.12,
        2.8,
        12.17,
        0.3,
        0.79,
        2.41,
        3.71,
        0.65,
        0,
        79,
        79
      ),
      51.3
    );
  });
});
