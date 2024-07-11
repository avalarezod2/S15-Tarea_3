// backend/controllers/tareasController.js

const Tarea = require('../models/tarea');

exports.crearTarea = async (req, res) => {
  try {
    const tarea = new Tarea(req.body);
    await tarea.save();
    res.status(201).json(tarea);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
