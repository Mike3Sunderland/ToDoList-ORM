import React, { useState, useEffect } from "react";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import './App.css'
import axios from "axios"; // Importamos axios aquí para la llamada inicial

function App() {
  const [tareas, setTareas] = useState([]); // Estado para manejar la lista de tareas

  // Función para obtener todas las tareas inicialmente
  const fetchTareas = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/tareas");
      setTareas(response.data);
    } catch (error) {
      console.error("Error al obtener las tareas", error);
    }
  };

  // Llamar a la función para obtener las tareas al cargar la página
  useEffect(() => {
    fetchTareas();
  }, []);

  // Función para manejar la creación de nuevas tareas
  const handleTaskCreated = (newTask) => {
    setTareas([...tareas, newTask]); // Añadir la nueva tarea al estado actual de tareas
  };

  return (
    <div className="App">
      <h1>To Do List</h1>
      {/* Pasa la función handleTaskCreated al componente TaskForm */}
      <TaskForm onTaskCreated={handleTaskCreated} />
      {/* Pasa las tareas al componente TaskList */}
      <TaskList tareas={tareas} setTareas={setTareas} />
    </div>
  );
}

export default App;
