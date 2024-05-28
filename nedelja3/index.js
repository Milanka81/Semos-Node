const express = require("express");
const app = express();

/***************************************************************************************
 * Domaci  27. 05.
 *
 * Prebacivanje prethodnog domaces u Express framework, kalkulator, konverziju Fh u Cs
 * --- to su tri rute:
 *  1) jedna ce primati operaciju, podatak a i podatak b i u zavisnosti od operacije vracati rezultat
 *  2) Druga ce konvertovati iz Fh u Cs
 *  3) Treca ruta konvertuje iz Cs u Fh
 ****************************************************************************************/
console.log(
  "------------------------DOMAĆI--- 27. 05. --------------------------"
);
// Zadatak 1:
const multiply = (a, b) => {
  return a * b;
};
const divide = (a, b) => {
  return a / b;
};
const add = (a, b) => {
  return a + b;
};
const substract = (a, b) => {
  return a - b;
};
const convertToNumber = (req) => {
  const { a, b } = req.query;
  const num1 = Number(a);
  const num2 = Number(b);
  return { num1, num2 };
};

const operationResult = (req, res, operation) => {
  const { num1, num2 } = convertToNumber(req);
  const result = operation(num1, num2);
  result === Infinity ? res.send("Cannot divide by zero") : res.json(result);
};

app.get("/:operation", (req, res) => {
  const { operation } = req.params;
  let result;
  switch (operation) {
    case "add":
      result = operationResult(req, res, add);
      break;
    case "substract":
      result = operationResult(req, res, substract);
      break;
    case "multiply":
      result = operationResult(req, res, multiply);
      break;
    case "divide":
      result = operationResult(req, res, divide);
      break;

    default:
      console.log("operation is not valid");
      break;
  }

  res.send(result);
});

// Zadatak 2:
app.get("/csToFn/:degree", (req, res) => {
  const { degree } = req.params;
  const fahrenheit = degree * 1.8 + 32;
  res.send(`${degree} celsius is ${fahrenheit} fahrenheit`);
});

app.get("/fnToCs/:degree", (req, res) => {
  const { degree } = req.params;
  const celsius = (degree - 32) / 1.8;
  res.send(`${degree} fahrenheit is ${celsius} celsius`);
});

app.listen(3000, "localhost", () => {
  console.log("server is listening 3000");
});
