const chalk = require("chalk");
const { default: fetch } = require("node-fetch");

const consultarLineas = async (url) => {
  const pedirApi = await fetch(url);
  const respuestaJson = await pedirApi.json();
  return respuestaJson;
};

const consultarLinea = async (url, lineaElegida) => {
  const lineas = await consultarLineas(url);
  const lineaBuscada = lineas.features.find(
    linea => linea.properties.NOM_LINIA.toLowerCase() === lineaElegida.toLowerCase()
  );
  return lineaBuscada;
};

module.exports = { consultarLineas, consultarLinea };
