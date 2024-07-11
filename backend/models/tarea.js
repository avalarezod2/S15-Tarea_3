// backend/models/tarea.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tareaSchema = new Schema({
  titulo: { type: String, required: true },
  descripcion: { type: String, required: true },
  fechaCreacion: { type: Date, default: Date.now }
});

const Tarea = mongoose.model('Tarea', tareaSchema);

module.exports = Tarea;
