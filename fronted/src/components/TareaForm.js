// frontend/src/components/TareaForm.js

import React, { useState } from 'react';
import axios from 'axios';

const TareaForm = ({ onCrearTarea }) => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/tareas', {
        titulo,
        descripcion,
      });
      onCrearTarea(response.data);  // Asegúrate de cómo procesas la nueva tarea creada en tu componente principal
      setTitulo('');
      setDescripcion('');
    } catch (error) {
      console.error('Error al crear la tarea:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Título"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />
      <textarea
        placeholder="Descripción"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
      ></textarea>
      <button type="submit">Crear Tarea</button>
    </form>
  );
};

export default TareaForm;
