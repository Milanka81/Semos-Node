const http = require("http");
const url = require("url");

// console.log(
//   "------------------------DOMAĆI--- 20. 05. --------------------------"
// );
//Zadatak broj 1:
// Dodavanje novih ruta na projekat koji smo radili na času (izlaz je bilo sta) - misli se na switch koji smo radili
const serverSwitch = http.createServer((req, res) => {
  switch (req.url) {
    case "/":
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/plain");
      res.end("Welcome to our homepage");
      break;
    case "/about":
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/plain");
      res.end("Read more about who we are");
      break;
    case "/contact":
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/plain");
      res.end("Our contact info");
      break;
    default:
      res.statusCode = 404;
      res.setHeader("Content-Type", "text/plain");
      res.end("Page doesn't exist");
  }
});

serverSwitch.listen(3000, "localhost", () => {
  console.log("listening for requests on port 3000");
});

//Zadatak broj 2:
//- Proširivanje kalkulatora sa novim vrstama računanja (dva broja - ili ukoliko se pogodi ruta koliko god da je stavljeno u ?) - prosledivanje 3 parametra koji ce biti operacija, prva vrednost i druga vrednost, izlaz (response rezultat operacije => 10+20 = 30)

const serverRequest1 = http.createServer((req, res) => {
  const parametersArray = req.url.slice(2).split("&");
  const queryNumbers = [];
  let operation = "";

  for (const parameter of parametersArray) {
    const value = parameter.split("=")[1];
    if (+value) queryNumbers.push(value);
    if (
      (!operation && value === "sabiranje") ||
      value === "oduzimanje" ||
      value === "mnozenje" ||
      value === "deljenje"
    )
      operation = value;
  }

  switch (operation) {
    case "sabiranje":
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/plain");
      const zbir = queryNumbers.reduce((acc, cur) => acc + Number(cur), 0);
      res.end(`${zbir}`);
      break;
    case "oduzimanje":
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/plain");
      const razlika = queryNumbers.reduce(
        (acc, cur) => acc - Number(cur),
        queryNumbers[0] * 2
      );
      res.end(`${razlika}`);
      break;
    case "mnozenje":
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/plain");
      const proizvod = queryNumbers.reduce((acc, cur) => acc * cur, 1);
      res.end(`${proizvod}`);
      break;
    case "deljenje":
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/plain");
      const kolicnik = queryNumbers.reduce(
        (acc, cur) => acc / cur,
        queryNumbers[0] ** 2
      );
      res.end(`${kolicnik}`);
      break;

    default:
      res.statusCode = 404;
      res.setHeader("Content-Type", "text/plain");
      res.end("Invalid parameters");
      break;
  }
});

serverRequest1.listen(3001, "localhost", () => {
  console.log("listening for requests on port 3001");
});

//Zadatak broj 3:
//- Definisanje rute koja služi za konverziju vrednosti iz jednog u drugi sistem (cs u fn i obrnuto)
//  ruta 1: localhost:3000/csToFn => pretvara iz celzijus u Farenhajt tako sto prosledjujemo parametar primer => vrednost: 50
// izlaz je konvertovana vrednost
// ruta 2: localhost:3000/fnToCs => pretvara iz Farenhajt u Celzijus tako sto prosledjujemo parametar primer => vrednost: 50
// izlaz je konvertovana vrednost

const serverConvertTemperature = http.createServer((req, res) => {
  const parameter = Number(req.url.split("/")[2]);
  console.log(parameter);
  switch (req.url) {
    case `/csToFn/${parameter}`:
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/plain");
      res.end(`${parameter * 1.8 + 32}`);
      break;
    case `/fnToCs/${parameter}`:
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/plain");
      res.end(`${(parameter - 32) / 1.8}`);
      break;
    default:
      res.statusCode = 404;
      res.setHeader("Content-Type", "text/plain");
      res.end("Something went wrong");
  }
});

serverConvertTemperature.listen(3002, "localhost", () => {
  console.log("listening for requests on port 3002");
});

// DRUGI NAČIN

const serverPostTemperature = http.createServer((req, res) => {
  if (req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      if (req.url === "/csToFn") {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/plain");
        res.end(`${body} celsius = ${body * 1.8 + 32} fahrenheit`);
      }

      if (req.url === "/fnToCs") {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/plain");
        res.end(`${body} fahrenheit = ${(body - 32) / 1.8} celsius`);
      }
    });
  } else {
    res.statusCode = 400;
    res.setHeader("Content-Type", "text/plain");
    res.end("To see the result you should use POST method");
  }
});

serverPostTemperature.listen(3003, "localhost", () => {
  console.log("listening for requests on port 3003");
});

console.log(
  "------------------------DOMAĆI--- 23. 05. --------------------------"
);

// Zadatak:1
//Preneti funkcionalnosti iz prethodnog domaćeg zadatka u novi projekat sa novim ruterom
const app = require("./app");
const server = http.createServer(app);
server.listen(8000, "localhost", () => {
  console.log("listening for requests on port 8000");
});

// Zadatak 2:
//- Napisati 10 različitih regularnih izraza - potraziti na web-u stranice za Regex

const reg1 = /[a-z]/i;

const reg2 = new RegExp(/[a-z]/, "i");

const personInfoRegex = {
  fullName: /^([A-Z][a-z]+\s?)+$/,
  birthYear: /^\d{4}$/,
  age: /^\d{1,2}$/,
  gender: /^(male|female)$/,
  country: /^([A-Z][a-z]\s?)+$/,
  address: /^([A-Z][a-z]+\s?)+([0-9a-z/?])+$/,
  city: /^([A-Z][a-z]\s?)+$/,
  phoneNumber: /^[\d-\-\/]+$/,
  username: /^[a-z\d]{8,15}$/i,
  password: /^[^\s]{6,20}/,
  email: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
};
