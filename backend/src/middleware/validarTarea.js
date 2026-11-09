export function validarTarea(req, res, next) {
  const { titulo } = req.body;

  if (typeof titulo !== "string" || titulo.trim().length < 3) {
    return res.status(400).json({
      error: "El titulo es obligatorio y debe tener al menos 3 caracteres"
    });
  }

  next();
}