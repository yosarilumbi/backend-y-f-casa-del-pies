const express = require('express');
const router = express.Router();





 // Ruta para leer registros
 router.get('/readImagenes', (req, res) => {
    // Utiliza la instancia de la base de datos pasada como parámetro
    // Realizar una consulta SQL para seleccionar todos los registros
    const sql = 'SELECT * FROM imagenes';
  
    // Ejecutar la consulta
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al leer registros:', err);
        res.status(500).json({ error: 'Error al leer registros' });
      } else {
        // Devolver los registros en formato JSON como respuesta
        res.status(200).json(result);
      }
    });
  });
  
  
  // Ruta para crear un nuevo registro con ID específico
  router.post('/createimagenes', (req, res) => {
    // Recibe los datos del nuevo registro desde el cuerpo de la solicitud (req.body)
    const { nombre,imagenUrl } = req.body;
  
    // Verifica si se proporcionaron los datos necesarios
    if (!nombre || !imagenUrl) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }
  
    // Realiza la consulta SQL para insertar un nuevo registro con ID específico
    const sql = `INSERT INTO imagenes (nombre, imagenUrl) VALUES ( ?, ?)`;
    const values = [nombre, imagenUrl];
  
    // Ejecuta la consulta
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error al insertar registro:', err);
        res.status(500).json({ error: 'Error al insertar registro' });
      } else {
        // Devuelve el ID del nuevo registro como respuesta
        res.status(200).json({ text: "" });
      }
    });
  });
  
  
   // Ruta para actualizar un registro existente por ID
   router.put('/updateimagenes/:id', (req, res) => {
    // Obtén el ID del registro a actualizar desde los parámetros de la URL
    const id = req.params.id;
  
    // Recibe los datos actualizados desde el cuerpo de la solicitud (req.body)
    const {nombre, imagenUrl } = req.body;
  
    // Verifica si se proporcionaron los datos necesarios
    if (!nombre || !imagenUrl) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }
  
    // Realiza la consulta SQL para actualizar el registro por ID
    const sql = `
      UPDATE imagenes
      SET nombre = ?,imagenUrl = ?
      WHERE id= ?
    `;
  
    const values = [nombre, imagenUrl];
  
    // Ejecuta la consulta
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error al actualizar el registro:', err);
        res.status(500).json({ error: 'Error al actualizar el registro' });
      } else {
        // Devuelve un mensaje de éxito
        res.status(200).json({ message: 'Registro actualizado con éxito' });
      }
    });
  });
  
  
  
  // Ruta para eliminar un registro existente por ID
  router.delete('/deleteimagenes/:id', (req, res) => {
    // Obtén el ID del registro a eliminar desde los parámetros de la URL
    const id = req.params.id;
  
    // Realiza la consulta SQL para eliminar el registro por ID
    const sql = 'DELETE FROM imagenes WHERE id= ?';
  
    // Ejecuta la consulta
    db.query(sql, [id], (err, result) => {
      if (err) {
        console.error('Error al eliminar el registro:', err);
        res.status(500).json({ error: 'Error al eliminar el registro' });
      } else {
        // Devuelve un mensaje de éxito
        res.status(200).json({ message: 'Registro eliminado con éxito' });
      }
    });
  });

  // Ruta para guardar una iamgen
router.post('/guardarImagen', upload.single('image'), (req, res) => {
  const imagenUrl = `/uploads/${req.file.filename}`;

  // Inserta la ruta de la imagen en la base de datos
  const query = 'INSERT INTO imagenes (nombre, imagenUrl) VALUES (?, ?)';
  db.query(query, [req.file.originalname, imagenUrl], (err, result) => {
    if (err) {
      console.error('Error al insertar la imagen en la base de datos:', err);
      res.status(500).json({ error: 'Error al insertar la imagen en la base de datos' });
    } else {
      res.status(200).json({ imagenUrl });
    }
  });
});


return router;