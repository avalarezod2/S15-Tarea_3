// frontend/src/App.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './app.css'; // Importa el archivo CSS aquí

const App = () => {
  const [tareas, setTareas] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');

  useEffect(() => {
    const fetchTareas = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/tareas');
        setTareas(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTareas();
  }, []);

  const handleCrearTarea = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/tareas', {
        titulo,
        descripcion,
      });
      setTareas([...tareas, response.data]);
      setTitulo('');
      setDescripcion('');
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <div className="container">
      <h1>Lista de Tareas</h1>
      <form onSubmit={(e) => { e.preventDefault(); handleCrearTarea(); }}>
        <input
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Titulo de la tarea"
          required
        />
        <br />
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Descripción de la tarea"
          required
        ></textarea>
        <br />
        <button type="submit">Crear Tarea</button>
      </form>
      <ul>
        {tareas.map((tarea) => (
          <li key={tarea._id}>
            <h3>{tarea.titulo}</h3>
            <p>{tarea.descripcion}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
