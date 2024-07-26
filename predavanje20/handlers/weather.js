// const fetch = require("node-fetch")
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

let cache = {};

const getCity = async (req, res) => {
  let key = process.env.API_KEY;
  let url = `http://api.weatherapi.com/v1/current.json?q=${req.params.city}&key=${key}&aqi=no`;

  if (
    cache[req.params.city] &&
    cache[req.params.city].cacheTime !== null &&
    cache[req.params.city].cacheTime + 60 * 1000 < new Date().getTime()
  ) {
    cache[req.params.city].localCache = null;
  }

  if (!cache[req.params.city] || cache[req.params.city].localCache === null) {
    let data = await fetch(url);
    cache[req.params.city] = {
      localCache: await data.json(),
      cacheTime: new Date().getTime(),
    };
  }

  return res.send(cache[req.params.city].localCache);
};

module.exports = { getCity };
