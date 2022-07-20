import connectDB from "./config/db.js";
import dotenv from "dotenv";
import gestionRoutes from "../server/routes/gestionRoute.js";
import ciudadanoRoutes from "../server/routes/ciudadanoRoute.js";
import gestorRoutes from "../server/routes/gestorRoute.js";
import procedenciaRoutes from "../server/routes/procedenciaRoute.js";
import dependenciaRoutes from "../server/routes/dependenciaRoute.js";
import seguimientoRoutes from "../server/routes/seguimientoRoute.js";
import municipioRoutes from "../server/routes/municipioRoute.js";
import localidadRoutes from "../server/routes/localidadRoute.js";
import coloniaRoutes from "../server/routes/coloniaRoute.js";
import eventoRoutes from "../server/routes/eventoRoute.js";
import sendEmail from "./config/mailer.js";
import express from "express";
import bodyParser from "body-parser";
import autentificacion from "../server/routes/auth.js";
import fileUpload from "express-fileupload";

connectDB();
dotenv.config();
const app = express();

// create application/json parser
app.use(bodyParser.json());

//Creating API for gestion
app.use("/api/gestions", gestionRoutes);
//Creating API for ciudadano
app.use("/api/ciudadano", ciudadanoRoutes);
//Creating API for gestor
app.use("/api/gestor", gestorRoutes);
//Creating API for dependencia
app.use("/api/dependencia", dependenciaRoutes);
//Creating API for procedencia
app.use("/api/procedencia", procedenciaRoutes);
//Creating API for seguimiento
app.use("/api/seguimiento", seguimientoRoutes);
//Creating API for municipio
app.use("/api/municipio", municipioRoutes);
//Creating API for localidad
app.use("/api/localidad", localidadRoutes);
//Creating API for colonia
app.use("/api/colonia", coloniaRoutes);
//Creating API for evento
app.use("/api/evento", eventoRoutes);
//Sending email
app.post("/api/sendEmail", (req, res) => {
  sendEmail(req.body.gestor);
});
//Autentificación
app.use("/api/auth", autentificacion);
//Upload file
app.use(fileUpload());
app.post("/api/uploadFiles", function(req, res) {
  const archivo = req.files.archivo;
  archivo.mv("uploads//" + archivo.name, async (err) => {
    if (err) throw err;
    res.status(200).json({ status: "File upload" });
  });
});
//DownloadFile
app.get("/api/downloadFile/:archivo", function(req, res) {
  res.download("uploads//" + req.params.archivo, function(err) {
    if (err) {
      console.log(err);
    }
  });
});

const PORT = process.env.PORT || 5000;

//Express js listen method to run project on http://localhost:5000
app.listen(
  PORT,
  console.log(`App is running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
