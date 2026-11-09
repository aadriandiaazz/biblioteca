import { useState } from "react";
 
function TareaForm({ onCrear }) {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [autor, setAutor] = useState("");
  const [editorial, setEditorial] = useState("");
  const [enviando, setEnviando] = useState(false);
 
  async function manejarSubmit(evento) {
    evento.preventDefault();
    setEnviando(true);
    
    // Enviamos todos los campos obligatorios limpios al backend
    const creada = await onCrear({ 
      titulo: titulo.trim(), 
      descripcion: descripcion.trim(),
      autor: autor.trim(),
      editorial: editorial.trim()
    });
    
    setEnviando(false);
    if (creada) {
      setTitulo("");
      setDescripcion("");
      setAutor("");
      setEditorial("");
    }
  }
 
  return (
    <form onSubmit={manejarSubmit}>
      <h2>Nuevo Libro</h2>
      <label>
        Título
        <input
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
          minLength={3}
        />
      </label>
      <label>
        Autor
        <input
          value={autor}
          onChange={(e) => setAutor(e.target.value)}
          required
        />
      </label>
      <label>
        Editorial
        <input
          value={editorial}
          onChange={(e) => setEditorial(e.target.value)}
          required
        />
      </label>
      <label>
        Descripción
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
      </label>
      <button type="submit" disabled={enviando}>
        {enviando ? "Añadiendo..." : "Añadir libro"}
      </button>
    </form>
  );
}
 
export default TareaForm;