import React from "react";
import axios from "axios";

const TaskList = ({ tareas, setTareas }) => {
  // Función para eliminar una tarea
  const eliminarTarea = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/tareas/${id}`);
      // Actualizar la lista de tareas sin hacer un nuevo fetch
      setTareas(tareas.filter((tarea) => tarea.id !== id));
    } catch (error) {
      console.error("Error al eliminar la tarea", error);
    }
  };

  // Función para cambiar el estado de la tarea
  const cambiarEstadoTarea = async (id, completada) => {
    try {
      await axios.put(`http://localhost:8080/api/tareas/${id}`, {
        completada: !completada,
      });
      // Actualizar el estado de la tarea en la lista sin hacer un nuevo fetch
      setTareas(
        tareas.map((tarea) =>
          tarea.id === id ? { ...tarea, completada: !completada } : tarea
        )
      );
    } catch (error) {
      console.error("Error al cambiar el estado de la tarea", error);
    }
  };

  return (
    <div className="task-list-container">
      <h2>Lista de Tareas</h2>
      <ul>
        {tareas.map((tarea) => (
          <li key={tarea.id} className="task-item">
            <div className="task-details">
              <h4>{tarea.titulo}</h4>
              <p>{tarea.descripcion}</p>
              <span
                className={`task-status ${
                  tarea.completada ? "completed" : "incomplete"
                }`}
              >
                {tarea.completada ? "✔️ Completada" : "❌ Incompleta"}
              </span>
            </div>
            <div className="task-actions">
              <button
                onClick={() => cambiarEstadoTarea(tarea.id, tarea.completada)}
              >
                {tarea.completada
                  ? "Marcar como Incompleta"
                  : "Marcar como Completada"}
              </button>
              <button
                onClick={() => eliminarTarea(tarea.id)}
                className="delete-button"
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
