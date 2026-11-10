import express from "express";
import cors from "cors";
// 1. IMPORTA EL ENRUTADOR DE LIBROS AQUÍ ABAJO:
import librosRouter from "./routes/biblioteca.routes.js"; 
 
const app = express();
const PRODUCCION = process.env.NODE_ENV === "production";
 
const origenes = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL.split(",").map((o) => o.trim())
  : ["http://localhost:5173", "http://localhost:4173"];
 
app.use(cors({ origin: origenes }));   
app.use(express.json());
 
app.get("/", (req, res) => {           
  res.json({ estado: "ok", servicio: "biblioteca-api" });
});
 
// 2. ACTIVA LAS RUTAS PARA QUE EXPRESS LAS DETECTE:
app.use("/api/libros", librosRouter);
 
app.use((err, req, res, next) => {     
  console.error(err);                  
  res.status(500).json({
    error: PRODUCCION ? "Error interno del servidor" : err.message,
  });
});
 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));