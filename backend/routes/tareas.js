// backend/routes/tareas.js

// Ruta para crear una nueva tarea
router.post('/', async (req, res) => {
  const { titulo, descripcion } = req.body;
  console.log('Datos recibidos:', titulo, descripcion);  // Verifica que lleguen los datos correctamente

  try {
    const nuevaTarea = new Tarea({ titulo, descripcion });
    await nuevaTarea.save();
    console.log('Tarea creada:', nuevaTarea);  // Verifica que la tarea se haya guardado correctamente en la base de datos
    res.status(201).json(nuevaTarea);
  } catch (error) {
    console.error('Error al crear una nueva tarea:', error);
    res.status(500).json({ message: 'Error al crear una nueva tarea' });
  }
});
