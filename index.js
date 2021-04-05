require("dotenv").config();
const debug = require("debug")("mi-app:principal");
const express = require("express");
const { program } = require("commander");
const morgan = require("morgan");
const { response } = require("express");

const { consultarLineas } = require("./fetchApi");

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

app.use(morgan("dev"));
app.use(express.static("public"));
app.get("/metro/lineas", (req, res, next) => {
  res.send("respuesta lineas API");
  next();
});
app.get("/metro/:linea?", (req, res, next) => {
  const { linea } = req.params;
  res.send("linea API");
  next();
});
app.get("/", (req, res, next) => {
  res.redirect("/metro/:lineas");
});
app.use((err, req, res, nett) => {
  debug(err);
  res.status(500).send("Ha fallado algo.");
});
