import { useCallback, useEffect, useState } from "react";
import { obtenerTareas, crearTarea, modificarTarea, eliminarTarea }
  from "./services/tareasApi";
import TareaForm from "./components/TareaForm";
import TareaItem from "./components/TareaItem";

function App() {
  const [tareas, setTareas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [errorCarga, setErrorCarga] = useState("");
  const [aviso, setAviso] = useState(null); // { tipo: "ok" | "error", texto }

  const [apiKey, setApiKey] = useState(
    () => sessionStorage.getItem("apiKey") ?? ""
  );
 
  function guardarApiKey() {
    sessionStorage.setItem("apiKey", apiKey);
    mostrarAviso("ok", "Clave guardada durante la sesión");
  }

  function mostrarAviso(tipo, texto) {
    setAviso({ tipo, texto });
  }
 
  async function manejarEliminar(id) {
    if (!window.confirm("¿Eliminar este libro/tarea?")) return;
    try {
      await eliminarTarea(id);
      setTareas((actuales) => actuales.filter((t) => t.id !== id));
      mostrarAviso("ok", "Eliminado correctamente");
    } catch (err) {
      mostrarAviso("error", err.message);
    }
  }

  async function manejarCambiarEstado(tarea) {
    // El modelo Libro usa 'reservado' (la tabla Tarea con 'completada' ya no existe)
    const cambios = { reservado: !tarea.reservado };
    try {
      const actualizada = await modificarTarea(tarea.id, cambios);
      setTareas((actuales) =>
        actuales.map((t) =>
          t.id === tarea.id ? { ...t, ...cambios, ...actualizada } : t
        )
      );
      mostrarAviso("ok", "Estado actualizado correctamente");
    } catch (err) {
      mostrarAviso("error", err.message);
    }
  }

  async function manejarCrear(datos) {
    try {
      const nueva = await crearTarea(datos);
      setTareas((actuales) => [...actuales, nueva]); // copia nueva, sin push
      mostrarAviso("ok", "Creado con éxito");
      return true; // el formulario se vacía
    } catch (err) {
      mostrarAviso("error", err.message);
      return false; // conserva lo escrito
    }
  }

  const cargarTareas = useCallback(async () => {
    try {
      setErrorCarga("");
      setTareas(await obtenerTareas());
    } catch (err) {
      setErrorCarga(err.message);
    }
  }, []);
 
  useEffect(() => {
    cargarTareas().finally(() => setCargando(false));
  }, [cargarTareas]);
 
  function reintentar() {
    setCargando(true);
    cargarTareas().finally(() => setCargando(false));
  }
 
  return (
    <main>
      {aviso && (
        <p className={`aviso aviso-${aviso.tipo}`} role="status">
          {aviso.texto}
        </p>
      )}
 
      <section>
        <h2>Acceso a operaciones protegidas</h2>
        <input
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="API key"
        />
        <button onClick={guardarApiKey}>Guardar durante la sesión</button>
      </section>

      <TareaForm onCrear={manejarCrear} />

      <h1>Gestor de la Biblioteca</h1>
      {cargando && <p>Cargando...</p>}
      {!cargando && errorCarga && (
        <div role="alert">
          <p>{errorCarga}</p>
          <button onClick={reintentar}>Reintentar</button>
        </div>
      )}
      {!cargando && !errorCarga && tareas.length === 0 && <p>No hay libros</p>}
 
      {!cargando && !errorCarga && tareas.map((tarea) => (
        <TareaItem
          key={tarea.id}
          tarea={tarea}
          onCambiarEstado={manejarCambiarEstado}
          onEliminar={manejarEliminar}
        />
      ))}
    </main>
  );
}
 
export default App;