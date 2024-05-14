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
