import connectDB from "./config/db.js";
import dotenv from "dotenv";
import userRoutes from "../server/routes/userRoute.js";
import gestionRoutes from "../server/routes/gestionRoute.js";
import ciudadanoRoutes from "../server/routes/ciudadanoRoute.js";
import gestorRoutes from "../server/routes/gestorRoute.js";
import procedenciaRoutes from "../server/routes/procedenciaRoute.js";
import dependenciaRoutes from "../server/routes/dependenciaRoute.js";
import seguimientoRoutes from "../server/routes/seguimientoRoute.js";
import municipioRoutes from "../server/routes/municipioRoute.js";
import express from "express";
import bodyParser from "body-parser";

connectDB();
dotenv.config();
const app = express();

// create application/json parser
app.use(bodyParser.json());

//Creating API for user
app.use("/api/users", userRoutes);
//Creating API for gestion
app.use("/api/gestions", gestionRoutes);
app.use("/api/gestions/:id", gestionRoutes);
app.use("/api/gestions/curp/:curp", gestionRoutes);
app.use("/api/gestions/fechas/:fechaI/:fechaF", gestionRoutes);
app.use("/api/gestions/updtGestion/:folio", gestionRoutes);
app.use("/api/gestions/addGestion", gestionRoutes);
//Creating API for ciudadano
app.use("/api/ciudadano", ciudadanoRoutes);
app.use("/api/ciudadano/addCiudadano", ciudadanoRoutes);
app.use("/api/ciudadano/updtCiudadano/:curp", ciudadanoRoutes);
//Creating API for gestor
app.use("/api/gestor", gestorRoutes);
app.use("/api/gestor/addGestor", gestorRoutes);
//Creating API for dependencia
app.use("/api/dependencia", dependenciaRoutes);
//Creating API for procedencia
app.use("/api/procedencia", procedenciaRoutes);
//Creating API for seguimiento
app.use("/api/seguimiento", seguimientoRoutes);
app.use("/api/seguimiento/:id", seguimientoRoutes);
app.use("/api/seguimiento/addSeguimiento", seguimientoRoutes);
//Creating API for municipio
app.use("/api/municipio", municipioRoutes);

const PORT = process.env.PORT || 5000;

//Express js listen method to run project on http://localhost:5000
app.listen(
  PORT,
  console.log(`App is running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
