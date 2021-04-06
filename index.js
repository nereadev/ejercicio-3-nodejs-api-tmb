require("dotenv").config();
const debug = require("debug")("mi-app:principal");
const express = require("express");
const { program } = require("commander");
const morgan = require("morgan");
const { response } = require("express");
const { consultarLineas, consultarLinea } = require("./fetchApi");

const url = `${process.env.API_URL}?app_id=${process.env.API_ID}&app_key=${process.env.API_KEY}`;
consultarLineas(url);

program.option("-p, --puerto <puerto>", "Puerto para el servidor");
program.parse(process.argv);
const options = program.opts();
const puerto = options.puerto || process.env.PUERTO || 5000;

const app = express();

const server = app.listen(puerto, () => {
  debug(`Servidor escuchando en el puerto ${puerto}.`);
});
// npm portscanner permite evaluar qué puertos están disponibles

app.use(morgan("dev"));
app.use(express.static("public"));
app.get("/metro/lineas", async (req, res, next) => {
  consultarLineas(url).then(lineas => {
    const lineaBuscada = lineas.features.map(linea => (
      {
        id: linea.properties.NOM_LINIA,
        linea: linea.properties.NOM_LINIA,
        descripcion: linea.properties.DESC_LINIA
      }
    ));
    res.json(lineaBuscada);
  });
});
app.get("/metro/linea/:linea", async (req, res, next) => {
  const lineaBuscada = await consultarLinea(url, req.params.linea);
  if (lineaBuscada) {
    const codigoLinea = lineaBuscada.properties.CODI_LINIA;
    const respuesta = {
      linea: lineaBuscada.properties.NOM_LINIA,
      descripcion: lineaBuscada.properties.DESC_LINIA,
    };
    res.json(respuesta);
  }
});
app.get("/", (req, res, next) => {
  res.redirect("/metro/lineas");
});
app.use((req, res, next) => {
  res.status(404).send({ error: true, mensaje: "Recurso no encontrado" });
});
app.use((err, req, res, nett) => {
  debug(err);
  res.status(500).send({ error: true, mensaje: "Error general" });
});
