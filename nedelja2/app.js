const url = require("url");

const routes = [
  { pattern: /^\/csToFn\/(-?\d+)$/, handler: celsiusToFahrenheit },
  { pattern: /^\/fnToCs\/(-?\d+)$/, handler: fahrenheitToCelsius },
];

const app = (req, res) => {
  const parsedUrl = url.parse(req.url, true);

  for (const route of routes) {
    const match = route.pattern.exec(parsedUrl.pathname);

    if (match) {
      return route.handler(req, res, match);
    }
  }

  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("Not found");
};

function celsiusToFahrenheit(req, res, match) {
  const fahrenheit = match[1] * 1.8 + 32;
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ fahrenheit }));
}

function fahrenheitToCelsius(req, res, match) {
  const celsius = (match[1] - 32) / 1.8;
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ celsius }));
}

module.exports = app;
