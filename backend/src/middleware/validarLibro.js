export function validarLibro(req, res, next) {
  const { titulo, autor, editorial, anioPublicacion } = req.body ?? {};

  if (typeof titulo !== "string" || titulo.trim().length < 3) {
    return res.status(400).json({
      error: "El titulo es obligatorio y debe tener al menos 3 caracteres"
    });
  }

  if (typeof autor !== "string" || !autor.trim()) {
    return res.status(400).json({ error: "El autor es obligatorio" });
  }

  if (typeof editorial !== "string" || !editorial.trim()) {
    return res.status(400).json({ error: "La editorial es obligatoria" });
  }

  if (
    anioPublicacion !== undefined &&
    anioPublicacion !== null &&
    anioPublicacion !== "" &&
    (!Number.isInteger(Number(anioPublicacion)) || Number(anioPublicacion) < 0)
  ) {
    return res.status(400).json({
      error: "El año de publicación debe ser un número entero válido"
    });
  }

  next();
}
