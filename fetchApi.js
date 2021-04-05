const chalk = require("chalk");
const { default: fetch } = require("node-fetch");

const url = `${process.env.API_URL}?app_id=${process.env.API_ID}&app_key=${process.env.API_KEY}`;
const consultarLineas = (url) => {
  fetch(url)
    .then(respuesta => respuesta.json())
    .then(lineas => {
      const lineaEncontrada = lineas.features.find(linea => linea.properties.NOM_LINIA.toLowerCase());
      if (!lineaEncontrada) {
        console.log(chalk.red.bold("No existe la línea."));
        process.exit(0);
      } else {
        const {
          properties: {
            CODI_LINIA,
            NOM_LINIA,
            DESC_LINIA
          }
        } = lineaEncontrada;
        console.log(`
        {
          id: ${CODI_LINIA},
          linea: ${NOM_LINIA},
          descripcion: ${DESC_LINIA}
        }`);
      }
    });
};

module.exports = { consultarLineas };
