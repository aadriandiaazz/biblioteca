import express from "express";
import cors from "cors";
 
const app = express();
const PRODUCCION = process.env.NODE_ENV === "production";
 
// Orígenes permitidos: en Render, FRONTEND_URL (sin barra final);
// en local, los puertos de Vite (dev y preview).
const origenes = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL.split(",").map((o) => o.trim())
  : ["http://localhost:5173", "http://localhost:4173"];
 
app.use(cors({ origin: origenes }));   // ANTES del middleware de x-api-key
app.use(express.json());
 
app.get("/", (req, res) => {           // ruta de salud: comprobar que vive
  res.json({ estado: "ok", servicio: "biblioteca-api" });
});
 
// ... middleware de x-api-key y rutas /api/...
 
app.use((err, req, res, next) => {     // manejador de errores global
  console.error(err);                  // el detalle va a los LOGS
  res.status(500).json({
    error: PRODUCCION ? "Error interno del servidor" : err.message,
  });
});
 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));
