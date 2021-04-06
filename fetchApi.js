const chalk = require("chalk");
const { default: fetch } = require("node-fetch");

const consultarLineas = async (url) => {
  const pedirApi = await fetch(url);
  const respuestaJson = await pedirApi.json();
  return respuestaJson;
};

module.exports = { consultarLineas };
