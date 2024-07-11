// frontend/src/components/ListaTareas.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ListaTareas = () => {
  const [tareas, setTareas] = useState([]);

  useEffect(() => {
    const fetchTareas = async () => {
      try {
        const response = await axios.get('/api/tareas');
        setTareas(response.data);
      } catch (error) {
        console.error('Error al obtener las tareas:', error);
      }
    };

    fetchTareas();
  }, []);

  const handleEliminarTarea = async (id) => {
    try {
      await axios.delete(`/api/tareas/${id}`);
      setTareas(tareas.filter(tarea => tarea._id !== id));
    } catch (error) {
      console.error('Error al eliminar la tarea:', error);
    }
  };

  return (
    <div>
      <h2>Lista de Tareas</h2>
      <ul>
        {tareas.map(tarea => (
          <li key={tarea._id}>
            <strong>{tarea.titulo}</strong>: {tarea.descripcion}
            <button onClick={() => handleEliminarTarea(tarea._id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaTareas;
