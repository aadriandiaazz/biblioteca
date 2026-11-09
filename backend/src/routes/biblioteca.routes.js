import { Router } from "express";
import {
  listarLibros,
  obtenerLibro,
  crearLibro,
  actualizarLibro,
  eliminarLibro
} from "../controllers/biblioteca.controller.js";
import { validarLibro } from "../middleware/validarLibro.js";
import { comprobarApiKey } from "../middleware/apiKey.js";

const router = Router();

router.get("/", listarLibros);
router.get("/:id", obtenerLibro);
router.post("/", comprobarApiKey, validarLibro, crearLibro);
router.patch("/:id", comprobarApiKey, actualizarLibro);
router.delete("/:id", comprobarApiKey, eliminarLibro);

export default router;
