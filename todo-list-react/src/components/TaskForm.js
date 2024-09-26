import React, { useState } from "react";
import axios from "axios";

const TaskForm = ({ onTaskCreated }) => {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [completada, setCompletada] = useState(false);

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    const nuevaTarea = { titulo, descripcion, completada };

    try {
      const response = await axios.post("http://localhost:8080/api/tareas", nuevaTarea);
      alert("Tarea creada con éxito");
      setTitulo("");
      setDescripcion("");
      setCompletada(false);
      onTaskCreated(response.data);  // Añadir la nueva tarea al estado de TaskList
    } catch (error) {
      console.error("Error al crear la tarea", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Crear Nueva Tarea</h2>
      <input
        type="text"
        placeholder="Título"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        required
      />
      <textarea
        placeholder="Descripción"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        required
      />
      <label>
        <input
          type="checkbox"
          checked={completada}
          onChange={(e) => setCompletada(e.target.checked)}
        />
        Completada
      </label>
      <button type="submit">Crear Tarea</button>
    </form>
  );
};

export default TaskForm;
