function TareaItem({ tarea, onCambiarEstado, onEliminar }) {
  return (
    <article>
      <h3>{tarea.titulo}</h3>
      <p><strong>Autor:</strong> {tarea.autor}</p>
      <p><strong>Editorial:</strong> {tarea.editorial}</p>
      {tarea.descripcion && <p>{tarea.descripcion}</p>}
      <p>Estado: {tarea.reservado ? "Reservado" : "Disponible"}</p>
      <button onClick={() => onCambiarEstado(tarea)}>
        {tarea.reservado ? "Devolver" : "Reservar"}
      </button>
      <button onClick={() => onEliminar(tarea.id)}>Eliminar</button>
    </article>
  );
}
 
export default TareaItem;