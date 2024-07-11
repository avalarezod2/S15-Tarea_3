// backend/server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/base_tasks', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('MongoDB Connected');
  })
  .catch((error) => {
    console.error('MongoDB Connection Error:', error);
  });

const tareaSchema = new mongoose.Schema({
  titulo: String,
  descripcion: String,
});

const Tarea = mongoose.model('Tarea', tareaSchema);

// Ruta para obtener todas las tareas
app.get('/api/tareas', async (req, res) => {
  try {
    const tareas = await Tarea.find();
    res.json(tareas);
  } catch (error) {
    console.error('Error al obtener las tareas:', error);
    res.status(500).json({ message: 'Error al obtener las tareas' });
  }
});

// Ruta para crear una nueva tarea
app.post('/api/tareas', async (req, res) => {
  const { titulo, descripcion } = req.body;

  try {
    const nuevaTarea = new Tarea({ titulo, descripcion });
    await nuevaTarea.save();
    res.status(201).json(nuevaTarea);
  } catch (error) {
    console.error('Error al crear una nueva tarea:', error);
    res.status(500).json({ message: 'Error al crear una nueva tarea' });
  }
});

// Ruta para eliminar una tarea por su ID
app.delete('/api/tareas/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Tarea.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    console.error('Error al eliminar la tarea:', error);
    res.status(500).json({ message: 'Error al eliminar la tarea' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
