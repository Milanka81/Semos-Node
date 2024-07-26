let cache = {};

const getCharacter = async (req, res) => {
  const url = `https://rickandmortyapi.com/api/character/${req.params.id}`;

  if (
    cache[req.params.id] &&
    cache[req.params.id].cacheTime !== null &&
    cache[req.params.id].cacheTime + 60 * 1000 < new Date().getTime()
  ) {
    cache[req.params.id].localCache = null;
  }

  if (!cache[req.params.id] || cache[req.params.id].localCache === null) {
    let data = await fetch(url);
    cache[req.params.id] = {
      localCache: await data.json(),
      cacheTime: new Date().getTime(),
    };
  }

  return res.send(cache[req.params.id].localCache);
};
module.exports = { getCharacter };
