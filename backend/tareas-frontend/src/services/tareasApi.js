const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:3000";
const API_URL = `${API_BASE}/api/biblioteca`;

 
function obtenerApiKey() {
  return sessionStorage.getItem("apiKey") ?? "";
}

 
async function peticion(url, opciones, mensajeError) {
  let respuesta;
  try {
    respuesta = await fetch(url, opciones);
  } catch {
    // fetch solo lanza error si no hay conexión, CORS, servidor apagado...
    throw new Error(
      "No se puede conectar con el servidor. ¿Está arrancado el Backend?"
    );
  }
  if (!respuesta.ok) {
    // fetch NO lanza error con 4xx/5xx: lo detectamos nosotros
    const cuerpo = await respuesta.json().catch(() => ({}));
    throw new Error(
      cuerpo.error ?? `${mensajeError} (código ${respuesta.status})`
    );
  }
  const texto = await respuesta.text();          // admite 204 y cuerpos vacíos
  return texto ? JSON.parse(texto) : null;
}
 
function cabecerasProtegidas() {
  return { "Content-Type": "application/json", "x-api-key": obtenerApiKey() };
}
 
export function obtenerTareas() {
  return peticion(API_URL, undefined, "No se pudieron cargar las tareas");
}
 
export function crearTarea(datos) {
  return peticion(
    API_URL,
    {
      method: "POST",
      headers: cabecerasProtegidas(),
      body: JSON.stringify(datos),
    },
    "No se pudo crear la tarea"
  );
}
 
export function modificarTarea(id, cambios) {
  return peticion(
    `${API_URL}/${id}`,
    {
      method: "PATCH",
      headers: cabecerasProtegidas(),
      body: JSON.stringify(cambios),
    },
    "No se pudo modificar la tarea"
  );
}
 
export function eliminarTarea(id) {
  return peticion(
    `${API_URL}/${id}`,
    { 
      method: "DELETE", 
      headers: cabecerasProtegidas()
    },
    "No se pudo eliminar la tarea"
  );
}
