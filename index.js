require("dotenv").config();
const debug = require("debug")("mi-app:principal");
const express = require("express");
const { program } = require("commander");
const morgan = require("morgan");
const { response } = require("express");

const { consultarLineas } = require("./fetchApi");

const url = `${process.env.API_URL}?app_id=${process.env.API_ID}&app_key=${process.env.API_KEY}`;
consultarLineas(url);

/* program.option("-p, --puerto <puerto>", "Puerto para el servidor");
program.parse(process.argv);
const options = program.opts();
const puerto = options.puerto || process.env.PUERTO || 5000;

const app = express();

const server = app.listen(puerto, () => {
  debug(`Servidor escuchando en el puerto ${puerto}.`);
});

app.use(morgan("dev"));
app.use(express.static("public"));
app.get("/metro/:lineas", (req, res, next) => {
  const { lineas } = req.params;
  res.send("Acaba la prueba");
});
 */
