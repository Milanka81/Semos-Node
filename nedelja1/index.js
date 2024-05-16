// 13. 05.

console.log(
  "------------------------DOMAĆI--- 13. 05. --------------------------"
);
const array = [
  { name: "John", age: 30, city: "New York" },
  { name: "Jane", age: 25, city: "Los Angeles" },
  { name: "Doe", age: 35, city: "Chicago" },
  { name: "Alice", age: 28, city: "New York" },
  { name: "Bob", age: 40, city: "Los Angeles" },
  { name: "John", age: 60, city: "New York" },
];

//filter
const cityChicago = array.filter((el) => el.city === "Chicago");
const citiesExeptNY = array.filter((el) => el.city !== "New York");

//sort (acs i desc),

const oldestASC = array.sort((curr, next) => curr.age - next.age);
const oldestDSC = array.sort((curr, next) => next.age - curr.age);

//reduce,

const youngest = array.reduce(
  (acc, curr) => (acc < curr.age ? acc : curr.age),
  array[0].age
);
const oldest = array.reduce(
  (acc, curr) => (acc > curr.age ? acc : curr.age),
  0
);

//find,
const aliceObj = array.find((person) => person.name === "Alice");

// forEach,
const introducePerson = array.forEach((person) =>
  console.log(
    `My name is ${person.name}, I am ${person.age} old and I live in ${person.city}.`
  )
);

//map,

const names = array.map((person) => person.name);

//every,
const isAdult = array.every((person) => person.age > 18);

//some (istraziti sta vraca every i some)
const isPensioner = array.some((person) => person.age > 65);

///////////////////////////////////////////////////////////////////////////////////////////////////////////

//  16. 05.

console.log(
  "------------------------DOMAĆI--- 16. 05. --------------------------"
);

//Zadatak broj 1:

// Da se kreira funkcionalni izraz sa imenom c2f koji prima jedan parametar celsius i konvertuje tu vrednost u Farenhajt pomoću formule (celsius * 9/5) + 32.

function c2f(celsius) {
  return celsius * 1.8 + 32;
}

console.log(`Fahrenheit: ${c2f(30)}`);

// Zadatak broj 2:

// Da se kreira Fat Arrow Function sa imenom f2c koja prima jedan parametar fahrenheit i konvertuje tu vrednost u Celzijusove stepene pomoću formule (fahrenheit - 32) * 5/9.

const f2c = (fahrenheit) => (fahrenheit - 32) / 1.8;

console.log(`Celsius: ${f2c(86)}`);

//Zadatak dodatni:

// HIGH ORDER FUNCTIONS
// ZA upis i ispis u odvojenom modulu koji se poziva preko koristeći destrukturiranje

const { multiplication, division } = require("./calculator.js");

const multiplicand = multiplication(3);
const product = multiplicand(5);
console.log(product);

const dividend = division(18);
const quotient = dividend(3);
console.log(quotient);
