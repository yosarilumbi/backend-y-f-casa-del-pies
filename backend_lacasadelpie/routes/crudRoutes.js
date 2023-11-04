const express = require('express');
const router = express.Router();

module.exports = (db) => {
  // Ruta para leer registros
  router.get('/readcategorias', (req, res) => {
    // Utiliza la instancia de la base de datos pasada como parámetro
    // Realizar una consulta SQL para seleccionar todos los registros
    const sql = 'SELECT * FROM Categorias';

    // Ejecutar la consulta
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al leer registros:', err);
        res.status(500).json({ error: 'Error al leer registros'
       });
      } else {
        // Devolver los registros en formato JSON como respuesta
        res.status(200).json(result);
      }
    });
  });




 
// Ruta para leer registros
router.get('/readcategorias', (req, res) => {
  // Utiliza la instancia de la base de datos pasada como parámetro
  // Realizar una consulta SQL para seleccionar todos los registros
  const sql = 'SELECT * FROM Categorias';

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
router.post('/createcategorias', (req, res) => {
  // Recibe los datos del nuevo registro desde el cuerpo de la solicitud (req.body)
  const { id_Categoria, nombre_C,  descripcion } = req.body;

  // Verifica si se proporcionaron los datos necesarios
  if (!id_Categoria || !nombre_C || !descripcion) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  // Realiza la consulta SQL para insertar un nuevo registro con ID específico
  const sql = `INSERT INTO categorias (id_categoria,nombre_C,  descripcion) VALUES ( ?, ?, ?)`;
  const values = [id_Categoria, nombre_C,  descripcion];

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
router.put('/updatecategorias/:id_Categoria', (req, res) => {
  // Obtén el ID del registro a actualizar desde los parámetros de la URL
  const id_Categoria = req.params.id_Categoria;

  // Recibe los datos actualizados desde el cuerpo de la solicitud (req.body)
  const { nombre_C,  descripcion} = req.body;

  // Verifica si se proporcionaron los datos necesarios
  if (!nombre_C || !descripcion) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  // Realiza la consulta SQL para actualizar el registro por ID
  const sql = `
    UPDATE categorias
    SET id_Categoria = ?,  nombre_C= ?, descripcion = ?
    WHERE ID_Categorias = ?
  `;

  const values = [nombre_C,  descripcion, id_Categoria];

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
router.delete('/deletecategorias/:id_Categoria', (req, res) => {
  // Obtén el ID del registro a eliminar desde los parámetros de la URL
  const id_Categoria = req.params.id_Categoria;

  // Realiza la consulta SQL para eliminar el registro por ID
  const sql = 'DELETE FROM categorias WHERE ID_Categorias = ?';

  // Ejecuta la consulta
  db.query(sql, [id_Categoria], (err, result) => {
    if (err) {
      console.error('Error al eliminar el registro:', err);
      res.status(500).json({ error: 'Error al eliminar el registro' });
    } else {
      // Devuelve un mensaje de éxito
      res.status(200).json({ message: 'Registro eliminado con éxito' });
    }
  });
});




// Ruta para leer registros
router.get('/readmarca', (req, res) => {
  // Utiliza la instancia de la base de datos pasada como parámetro
  // Realizar una consulta SQL para seleccionar todos los registros
  const sql = 'SELECT * FROM Marcas';

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
router.post('/createMarcas', (req, res) => {
  // Recibe los datos del nuevo registro desde el cuerpo de la solicitud (req.body)
  const { nombre_Marca } = req.body

  // Verifica si se proporcionaron los datos necesarios
  if (!nombre_Marca) {
    return res.status(400).json({ error: 'El campo "nombre_Marca" es obligatorio' });
  }
  

  // Realiza la consulta SQL para insertar un nuevo registro con ID específico
  const sql = 'INSERT INTO Marcas (Nombre_Marca) VALUES (?)';
  const values = [nombre_Marca];

  // Ejecuta la consulta
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error al insertar registro:', err);
      res.status(500).json({ error: 'Error al insertar registro' });
    } else {
      // Devuelve el ID del nuevo registro como respuesta
      res.status(201).json({ id: result.insertId, nombre_Marca });
    }
  });
});



  // Ruta para actualizar un registro existente por ID
router.put('/updateMarca/:id_Marca', (req, res) => {
  // Obtén el ID del registro a actualizar desde los parámetros de la URL
  const id_Marca = req.params.id_Marca;

  // Recibe los datos actualizados desde el cuerpo de la solicitud (req.body)
  const { nombre_Marca} = req.body;

  // Verifica si se proporcionaron los datos necesarios
  if (!nombre_Marca) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  // Realiza la consulta SQL para actualizar el registro por ID
  const sql = `
    UPDATE Marcas
    SET Nombre_Marca = ?
    WHERE ID_Marcas = ?
  `;

  const values = [nombre_Marca,id_Marca];

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
router.delete('/deleteMarcas/:id_Marca', (req, res) => {
  // Obtén el ID del registro a eliminar desde los parámetros de la URL
  const id_Marca = req.params.id_Marca;

  // Realiza la consulta SQL para eliminar el registro por ID
  const sql = 'DELETE FROM Marcas WHERE ID_Marca = ?';

  // Ejecuta la consulta
  db.query(sql, [id_Marca], (err, result) => {
    if (err) {
      console.error('Error al eliminar el registro:', err);
      res.status(500).json({ error: 'Error al eliminar el registro' });
    } else {
      // Devuelve un mensaje de éxito
      res.status(200).json({ message: 'Registro eliminado con éxito' });
    }
  });
});

 



// Ruta para leer registros
router.get('/readmodopagos', (req, res) => {
  // Utiliza la instancia de la base de datos pasada como parámetro
  // Realizar una consulta SQL para seleccionar todos los registros
  const sql = 'SELECT * FROM modopagos';

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
router.post('/createmodoPagos', (req, res) => {
  // Recibe los datos del nuevo registro desde el cuerpo de la solicitud (req.body)
  const { Nombre_ModoPago } = req.body;

  // Verifica si se proporcionaron los datos necesarios
  if ( !Nombre_ModoPago ) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  // Realiza la consulta SQL para insertar un nuevo registro con ID específico
  const sql = `INSERT INTO modopagos (!Nombre_ModoPago) VALUES (?)`;
  const values = [Nombre_ModoPago ];

  // Ejecuta la consulta
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error al insertar registro:', err);
      res.status(500).json({ error: 'Error al insertar registro' });
    } else {
      // Devuelve el ID del nuevo registro como respuesta
      res.status(201).json({ id_ModoPago });
    }
  });
});

  // Ruta para actualizar un registro existente por ID
router.put('/updateModoPagos/:id_ModoPago', (req, res) => {
  // Obtén el ID del registro a actualizar desde los parámetros de la URL
  const id_ModoPago = req.params.id_ModoPago;

  // Recibe los datos actualizados desde el cuerpo de la solicitud (req.body)
  const {Nombre_ModoPago} = req.body;

  // Verifica si se proporcionaron los datos necesarios
  if ( !Nombre_ModoPago) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  // Realiza la consulta SQL para actualizar el registro por ID
  const sql = `
    UPDATE modopagos
    SET Nombre_ModoPago = ?
    WHERE id_ModoPago = ?
  `;

  const values = [ Nombre_ModoPago,id_ModoPago];

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
router.delete('/deleteModoPagos/:id_ModoPago', (req, res) => {
  // Obtén el ID del registro a eliminar desde los parámetros de la URL
  const id_ModoPago = req.params.id_ModoPago;

  // Realiza la consulta SQL para eliminar el registro por ID
  const sql = 'DELETE FROM modopagos WHERE id_ModoPago = ?';

  // Ejecuta la consulta
  db.query(sql, [id_ModoPago], (err, result) => {
    if (err) {
      console.error('Error al eliminar el registro:', err);
      res.status(500).json({ error: 'Error al eliminar el registro' });
    } else {
      // Devuelve un mensaje de éxito
      res.status(200).json({ message: 'Registro eliminado con éxito' });
    }
  });
});



 // Ruta para leer registros
 router.get('/readpromociones', (req, res) => {
  // Utiliza la instancia de la base de datos pasada como parámetro
  // Realizar una consulta SQL para seleccionar todos los registros
  const sql = 'SELECT * FROM promocionesydescuentos';

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
router.post('/createPromocionesyDescuentos', (req, res) => {
  // Recibe los datos del nuevo registro desde el cuerpo de la solicitud (req.body)
  const { codigoDescuentos, condiciones, fecha_Inicio, fecha_Fin } = req.body;

  // Verifica si se proporcionaron los datos necesarios
  if (!codigoDescuentos || !condiciones || !fecha_Inicio || !fecha_Fin) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  // Realiza la consulta SQL para insertar un nuevo registro con ID específico
  const sql = `INSERT INTO promocionesydescuentos (codigoDescuentos, condiciones, fecha_Inicio, fecha_Fin) VALUES ( ?, ?, ?, ?)`;
  const values = [codigoDescuentos, condiciones, fecha_Inicio, fecha_Fin];

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
 router.put('/updatePromocionesyDescuentos/:id_Promociones', (req, res) => {
  // Obtén el ID del registro a actualizar desde los parámetros de la URL
  const id_Promociones = req.params.id_Promociones;

  // Recibe los datos actualizados desde el cuerpo de la solicitud (req.body)
  const {codigoDescuentos, condiciones, fecha_Inicio, fecha_Fin } = req.body;

  // Verifica si se proporcionaron los datos necesarios
  if (!codigoDescuentos || !condiciones || !fecha_Inicio || !fecha_Fin) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  // Realiza la consulta SQL para actualizar el registro por ID
  const sql = `
    UPDATE promocionesydescuentos
    SET CodigoDescuentos = ?, Condiciones = ?, Fecha_Inicio = ?, Fecha_Fin = ?
    WHERE ID_Promociones = ?
  `;

  const values = [codigoDescuentos, condiciones, fecha_Inicio, fecha_Fin, id_Promociones];

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
router.delete('/deletePromocionesyDescuentos/:id_Promociones', (req, res) => {
  // Obtén el ID del registro a eliminar desde los parámetros de la URL
  const id_Promociones = req.params.id_Promociones;

  // Realiza la consulta SQL para eliminar el registro por ID
  const sql = 'DELETE FROM promocionesydescuentos WHERE ID_Promociones = ?';

  // Ejecuta la consulta
  db.query(sql, [id_Promociones], (err, result) => {
    if (err) {
      console.error('Error al eliminar el registro:', err);
      res.status(500).json({ error: 'Error al eliminar el registro' });
    } else {
      // Devuelve un mensaje de éxito
      res.status(200).json({ message: 'Registro eliminado con éxito' });
    }
  });
});







// Ruta para leer registros
router.get('/readusuario', (req, res) => {
  // Utiliza la instancia de la base de datos pasada como parámetro
  // Realizar una consulta SQL para seleccionar todos los registros
  const sql = 'SELECT * FROM Usuario';
  
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
  
// Ruta para crear un nuevo registro
router.post('/createUsuario', (req, res) => {
  const {id_Usuario, nombre_Usuario, contrasena,rol} = req.body;

  if (!id_Usuario|| !nombre_Usuario || !contrasena ||!rol) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  const sql = `INSERT INTO Usuario (id_Usuario, Nombre_Usuario, contraseña,rol) VALUES (?,?,?, ?)`;
  const values = [id_Usuario, nombre_Usuario, contrasena, rol];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error al insertar registro:', err);
      res.status(500).json({ error: 'Error al insertar registro' });
    } else {
      res.status(201).json({ id_Usuario });
    }
  });
});

// Ruta para actualizar un registro existente por ID
router.put('/updateUsuario/:id_Usuario', (req, res) => {
  const id_Usuario = req.params.id_Usuario;
  const { nombre_Usuario, contrasena,rol } = req.body;

  if (!nombre_Usuario|| !contrasena ||!rol) {
    return res.status(400).json({ error: 'El nombre es obligatorio' });
  }

// Consulta Sql Para actualizar el registro por ID
  const sql = `
    UPDATE Usuario
    SET Nombre_Usuario= ?, Contraseña = ?, rol =?
    WHERE id_Usuario = ?
  `;

  const values = [ nombre_Usuario, contrasena,rol, id_Usuario];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error al actualizar el registro:', err);
      res.status(500).json({ error: 'Error al actualizar el registro' });
    } else {
      res.status(200).json({ message: 'Registro actualizado con éxito' });
    }
  });
});

// Ruta para eliminar un registro existente por ID
router.delete('/deleteUsuario/:id_Usuario', (req, res) => {
  const id_Usuario = req.params.id_Usuario;
  const sql = 'DELETE FROM Usuario WHERE id Usuarios   = ?';

  db.query(sql, [id_Usuario], (err, result) => {
    if (err) {
      console.error('Error al eliminar el registro:', err);
      res.status(500).json({ error: 'Error al eliminar el registro' });
    } else {
      res.status(200).json({ message: 'Registro eliminado con éxito' });
    }
  });
});

// Ruta para leer registros
router.get('/readusuario', (req, res) => {
// Utiliza la instancia de la base de datos pasada como parámetro
// Realizar una consulta SQL para seleccionar todos los registros
const sql = 'SELECT * FROM Usuario';

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

  
  
   // Ruta para obtener datos de ambas tablas usuario y vendedor
   router.get('/readUsuarioyClientes', (req, res) => {
  
  const router = express.Router();
  
  router.get('/readUsuarioyClientes', (req, res) => {
    const sql = 'SELECT U.*, C.* FROM clientes INNER JOIN Usuario U ON C.id_Usuario = U.id_Usuario';
  
    db.query(sql, (err, results) => {
      if (err) {
        console.error('Error al obtener los datos de Vendedor y Usuario:', err);
        res.status(500).json({ error: 'Error al obtener los datos de Vendedor y Usuario' });
      } else {
        res.json(results);
      }
    });
  });
  });
  
  router.put('/updateClientes', (req, res) => {
    const {
      id_Cliente,
      cedula ,
      nombre, 
      apellido,
      historialdecompras,
    } = req.body;
  
    if (!id_Cliente|| !cedula|| !nombre|| !apellido || !historialdecompras) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }
  
    const sqlUsuario = 'UPDATE Usuario SET id_Usuario = ? WHERE ID_Usuario = ?';
    const valuesUsuario = [id_Cliente, id_Cliente];
  
    db.query(sqlUsuario, valuesUsuario, (err, resultUsuario) => {
      if (err) {
        console.error('Error al actualizar el registro en Usuario:', err);
        return res.status(500).json({ error: 'Error al actualizar el registro en Usuario' });
      }
  
      const sqlclientes = 'UPDATE clientes SET id_Cliente = ?, cedula = ?, nombre = ?, apellido = ?, historialdecompras = ? WHERE id_Cliente = ?';
      const valuesclientes = [id_Cliente,cedula, nombre, apellido,historialdecompras, id_Cliente];
  
      db.query(sqlclientes, valuesclientes, (err, resultclientes) => {
        if (err) {
          console.error('Error al actualizar el registro en clientes:', err);
          return res.status(500).json({ error: 'Error al actualizar el registro en clientes' });
        }
  
        res.status(200).json({ message: 'Registro actualizado con éxito' });
      });
    });
  });
  
  router.delete('/deleteClienteUsuario/:id_Usuario', (req, res) => {
    const id_Usuario = req.params.id_Usuario;
    
    db.beginTransaction((err) => {
      if (err) {
        console.error('Error al iniciar la transacción:', err);
        return res.status(500).json({ error: 'Error al eliminar el cliente' });
      }
  
      const deleteclientesSQL = 'DELETE FROM clientes WHERE id_Usuario = ?';
      db.query(deleteclientesSQL, [id_Usuario], (err, result) => {
        if (err) {
          db.rollback(() => {
            console.error('Error al eliminar el Cliente:', err);
            return res.status(500).json({ error: 'Error al eliminar el vendedor' });
          });
        }
  
        const deleteUsuarioSQL = 'DELETE FROM Usuario WHERE id_Usuario = ?';
        db.query(deleteUsuarioSQL, [id_Usuario], (err, result) => {
          if (err) {
            db.rollback(() => {
              console.error('Error al eliminar el usuario:', err);
              return res.status(500).json({ error: 'Error al eliminar el usuario' });
            });
          }
  
          db.commit((err) => {
            if (err) {
              db.rollback(() => {
                console.error('Error al confirmar la transacción:', err);
                return res.status(500).json({ error: 'Error al eliminar el cliente' });
              });
            }
  
            res.status(200).json({ message: 'Cliente eliminado con éxito' });
            });
          });
        });
      });
  
    });
  
    router.post('/createClientes', (req, res) => {
      const {
        cedula ,
        nombre, 
        apellido,
        historialdecompras,
        nombre_Usuario,  // Agregar el campo nombre_Usuario
        contrasena,      // Agregar el campo contrasena
        rol
      } = req.body;
    
      if (!cedula || !nombre || !apellido|| !historialdecompras|| !nombre_Usuario || !contrasena ||!rol) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
      }
    
      const sqlUsuario = 'INSERT INTO Usuario (nombre_Usuario, contrasena, rol) VALUES (?,?, ?)';
      const valuesUsuario = [nombre_Usuario, contrasena,rol];
    
      db.query(sqlUsuario, valuesUsuario, (err, result) => {
        if (err) {
          console.error('Error al insertar registro en Usuario:', err);
          res.status(500).json({ error: 'Error al insertar registro en Usuario' });
        } else {
          const id_Usuario = result.insertId;
    
          const sqlclientes = 'INSERT INTO clientes (cedula, nombre,apellido,historialdecompras, id_Usuario) VALUES (?, ?, ?, ?,?)';
          const valuesclientes = [cedula, nombre, apellido,historialdecompras, id_Usuario]; // Usar el ID_Usuario obtenido anteriormente
    
          db.query(sqlclientes, valuesclientes, (err, result) => {
            if (err) {
              console.error('Error al insertar registro en clientes:', err);
              res.status(500).json({ error: 'Error al insertar registro en Vendedor' });
            } else {
              res.status(201).json({ id_Usuario: id_Usuario });
            }
          });
        }
      });
    });
    
  
  




 // Ruta para leer registros
 router.get('/readclientes', (req, res) => {
  // Utiliza la instancia de la base de datos pasada como parámetro
  // Realizar una consulta SQL para seleccionar todos los registros
  const sql = 'SELECT * FROM clientes';

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

  // Ruta para actualizar un registro existente por ID
router.put('/updateclientes/:id_Cliente', (req, res) => {
  // Obtén el ID del registro a actualizar desde los parámetros de la URL
  const id_Cliente = req.params.id_Cliente;

  // Recibe los datos actualizados desde el cuerpo de la solicitud (req.body)
  const { cedula, nombre, apellido,historialdecompras, id_Usuario } = req.body;

  // Verifica si se proporcionaron los datos necesarios
  if (!cedula ||!nombre || !apellido || !historialdecompras|| !id_Usuario) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  // Realiza la consulta SQL para actualizar el registro por ID
  const sql = `
    UPDATE Vendedor
    SET cedula = ?, nombre = ?, apellido = ?, historialdecompras = ?,ID_Usuario = ?
    WHERE ID Clientes = ?
  `;
 
  const values = [cedula, nombre, apellido,historialdecompras, id_Usuario];

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
router.delete('/deleteclientes/:id_Cliente', (req, res) => {
  // Obtén el ID del registro a eliminar desde los parámetros de la URL
  const id_Vendedor = req.params.id_Vendedor;

  // Realiza la consulta SQL para eliminar el registro por ID
  const sql = 'DELETE FROM clientes WHERE ID_Cliente = ?';

  // Ejecuta la consulta
  db.query(sql, [id_Cliente], (err, result) => {
    if (err) {
      console.error('Error al eliminar el registro:', err);
      res.status(500).json({ error: 'Error al eliminar el registro' });
    } else {
      // Devuelve un mensaje de éxito
      res.status(200).json({ message: 'Registro eliminado con éxito' });
    }
  });
});









 // Ruta para leer registros
 router.get('/readdetalle', (req, res) => {
  // Utiliza la instancia de la base de datos pasada como parámetro
  // Realizar una consulta SQL para seleccionar todos los registros
  const sql = 'SELECT * FROM DetalleVenta';

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
router.post('/createDetalleVenta', (req, res) => {
  // Recibe los datos del nuevo registro desde el cuerpo de la solicitud (req.body)
  const { id_detalleVenta,id_Producto,cod_Venta,id_Categoria } = req.body;

  // Verifica si se proporcionaron los datos necesarios
  if (!id_detalleVenta || !id_Producto || !cod_Venta || !id_Categoria) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  // Realiza la consulta SQL para insertar un nuevo registro con ID específico
  const sql = `INSERT INTO DetalleVenta (id_detalleVenta,id_Producto,cod_Venta,id_Categoria) VALUES (?, ?, ?, ?)`;
  const values = [id_detalleVenta,id_Producto,cod_Venta,id_Categoria];

  // Ejecuta la consulta
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error al insertar registro:', err);
      res.status(500).json({ error: 'Error al insertar registro' });
    } else {
      // Devuelve el ID del nuevo registro como respuesta
      res.status(201).json({ id_detalleVenta });
    }
  });
}); 

  // Ruta para actualizar un registro existente por ID
router.put('/updateDetalleVenta/:id_detalleVenta', (req, res) => {
  // Obtén el ID del registro a actualizar desde los parámetros de la URL
  const id_detalleVenta = req.params.id_detalleVenta;

  // Recibe los datos actualizados desde el cuerpo de la solicitud (req.body)
  const {id_Producto,cod_Venta,id_Categoria } = req.body;

  // Verifica si se proporcionaron los datos necesarios
  if (!id_Producto || !cod_Venta || !id_Categoria) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  // Realiza la consulta SQL para actualizar el registro por ID
  const sql = `
    UPDATE DetalleVenta
    SET id_Producto = ?, cod_Venta = ?, id_Categoria = ?
    WHERE id_detalleVenta = ?
  `;

  const values = [id_Producto,cod_Venta,id_Categoria,id_detalleVenta];

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
router.delete('/deleteDetalleVenta/:id_detalleVenta', (req, res) => {
  // Obtén el ID del registro a eliminar desde los parámetros de la URL
  const id_detalleVenta = req.params.id_detalleVenta;

  // Realiza la consulta SQL para eliminar el registro por ID
  const sql = 'DELETE FROM DetalleVenta WHERE id_detalleVenta = ?';

  // Ejecuta la consulta
  db.query(sql, [id_detalleVenta], (err, result) => {
    if (err) {
      console.error('Error al eliminar el registro:', err);
      res.status(500).json({ error: 'Error al eliminar el registro' });
    } else {
      // Devuelve un mensaje de éxito
      res.status(200).json({ message: 'Registro eliminado con éxito' });
    }
  });
});





// Ruta para leer registros
router.get('/readVenta', (req, res) => {
  // Utiliza la instancia de la base de datos pasada como parámetro
  // Realizar una consulta SQL para seleccionar todos los registros
  const sql = 'SELECT * FROM ventas';

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
router.post('/createVentas', (req, res) => {
  // Recibe los datos del nuevo registro desde el cuerpo de la solicitud (req.body)
  const {  id_Cliente, id_Vendedor,cantidadProducto,id_ModoPago, fecha, Estado, TipoVentas,DireccionEnvio,TotalVenta } = req.body;

  // Verifica si se proporcionaron los datos necesarios
  if (!id_Cliente|| !id_Vendedor|| !cantidadProducto || !id_ModoPago || !fecha || !Estado|| !TipoVentas || !DireccionEnvio || !TotalVenta) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  // Realiza la consulta SQL para insertar un nuevo registro con ID específico
  const sql = `INSERT INTO Ventas (id_Cliente, id_Vendedor,cantidadProducto,id_ModoPago, fecha, Estado, TipoVentas,DireccionEnvio,TotalVenta  ) VALUES (?, ?, ?, ?, ?, ?,?,?,?)`;
  const values = [id_Cliente, id_Vendedor,cantidadProducto,id_ModoPago, fecha, Estado, TipoVentas,DireccionEnvio,TotalVenta  ];

  // Ejecuta la consulta
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error al insertar registro:', err);
      res.status(500).json({ error: 'Error al insertar registro' });
    } else {
      // Devuelve el ID del nuevo registro como respuesta
      res.status(201).json({ cod_Venta });
    }
  });
});

  // Ruta para actualizar un registro existente por ID
router.put('/updateVentas/:cod_Venta', (req, res) => {
  // Obtén el ID del registro a actualizar desde los parámetros de la URL
  const cod_Venta = req.params.cod_Venta;

  // Recibe los datos actualizados desde el cuerpo de la solicitud (req.body)
  const {id_Cliente, id_Vendedor,cantidadProducto,id_ModoPago, fecha, Estado, TipoVentas,DireccionEnvio,TotalVenta } = req.body;

  // Verifica si se proporcionaron los datos necesarios
  if (!id_Cliente|| !id_Vendedor|| !cantidadProducto || !id_ModoPago || !fecha || !Estado|| !TipoVentas || !DireccionEnvio || !TotalVenta) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  // Realiza la consulta SQL para actualizar el registro por ID
  const sql = `
    UPDATE ventas
    SET id_Cliente = ?, id_Vendedor = ?,cantidadProducto=?, id_ModoPago=? , fecha = ?, Estado = ?, TipoVentas = ?,DireccionEnvio= ?,TotalVenta= ?
    WHERE cod_Venta= ?
  `;
 
  const values = [id_Cliente, id_Vendedor,cantidadProducto,id_ModoPago, fecha, Estado, TipoVentas,DireccionEnvio,TotalVenta,cod_Venta];

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
router.delete('/deleteVentas/:cod_Venta', (req, res) => {
  // Obtén el ID del registro a eliminar desde los parámetros de la URL
  const cod_Venta = req.params.cod_Venta;

  // Realiza la consulta SQL para eliminar el registro por ID
  const sql = 'DELETE FROM Ventas WHERE cod_Venta = ?';

  // Ejecuta la consulta
  db.query(sql, [cod_Venta], (err, result) => {
    if (err) {
      console.error('Error al eliminar el registro:', err);
      res.status(500).json({ error: 'Error al eliminar el registro' });
    } else {
      // Devuelve un mensaje de éxito
      res.status(200).json({ message: 'Registro eliminado con éxito' });
    }
  });
});







// Ruta para leer registros
router.get('/readProductos', (req, res) => {
  // Utiliza la instancia de la base de datos pasada como parámetro
  // Realizar una consulta SQL para seleccionar todos los registros
  const sql = 'SELECT * FROM Productos';

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


// Ruta para crear un nuevo registro
router.post('/createProductos', (req, res) => {
  const {id_Categoria, nombre,descripcion,precio,id_Marca,id_Promociones} = req.body;

  if (!id_Categoria||! nombre ||!descripcion ||!precio ||!id_Marca||!id_Promociones) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  const sql = `INSERT INTO Productos (id_Categoria, Nombre,Descripcion,Precio,id_Marca,id_Promociones) VALUES (?,?,?,?,?,?)`;
  const values = [id_Categoria, nombre,descripcion,precio,id_Marca,id_Promociones];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error al insertar registro:', err);
      res.status(500).json({ error: 'Error al insertar registro' });
    } else {
      res.status(200).json({ text: '' });
    }
  });
});

// Ruta para actualizar un registro existente por ID
router.put('/updateProducto/:id_Producto', (req, res) => {
  const id_Producto = req.params.id_Producto;
  const { id_Categoria, nombre, descripcion, precio, id_Marca,id_Promociones } = req.body;

  if (!id_Categoria || !nombre || !descripcion || !precio || !id_Marca|| !id_Promociones) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  const sql = `
    UPDATE Productos
    SET id_Categoria=?, nombre=?, descripcion=?, precio=?, id_Marca=?,id_Promociones =?
    WHERE id_Producto= ?
  `;

  const values = [id_Categoria, nombre, descripcion, precio, id_Marca,id_Promociones, id_Producto];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error al actualizar el registro:', err);
      res.status(500).json({ error: 'Error al actualizar el registro' });
    } else {
      res.status(200).json({ message: 'Registro actualizado con éxito' });
    }
  });
});


// Ruta para eliminar un registro existente por ID
router.delete('/deleteProductos/:id_Producto', (req, res) => {
  const id_Producto = req.params.id_Producto;
  const sql = 'DELETE FROM Productos WHERE id_producto = ?';

  db.query(sql, [id_Producto], (err, result) => {
    if (err) {
      console.error('Error al eliminar el registro:', err);
      res.status(500).json({ error: 'Error al eliminar el registro' });
    } else {
      res.status(200).json({ message: 'Registro eliminado con éxito' });
    }
  });
});



  // Ruta para verificar las credenciales y obtener el rol del usuario
  router.post('/login', (req, res) => {
    const { nombre_Usuario, contrasena } = req.body;

    if (!nombre_Usuario || !contrasena) {
      return res.status(400).json({ error: 'Nombre de usuario y contraseña son obligatorios' });
    }

    // Realizar la consulta para verificar las credenciales en la base de datos
    const sql = `SELECT rol FROM Usuario WHERE nombre_Usuario = ? AND contrasena = ?`;
    db.query(sql, [nombre_Usuario, contrasena], (err, result) => {
      if (err) {
        console.error('Error al verificar credenciales:', err);
        return res.status(500).json({ error: 'Error al verificar credenciales' });
      }

      if (result.length === 1) {
        const { rol } = result[0];
        res.json({ rol }); // Devolver el rol si las credenciales son correctas
      } else {
        res.status(401).json({ error: 'Credenciales incorrectas' });
      }
    });
  });






// Ruta para leer registros
router.get('/readUsuario', (req, res) => {
  // Utiliza la instancia de la base de datos pasada como parámetro
  // Realizar una consulta SQL para seleccionar todos los registros
  const sql = 'SELECT * FROM Usuario';

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


// Ruta para crear un nuevo registro
router.post('/createUsuario', (req, res) => {
  const {id_Usuario, nombre_Usuario, contrasena,rol} = req.body;

  if (!id_Usuario|| !nombre_Usuario || !contrasena || !rol) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  const sql = `INSERT INTO Usuario (id_Usuario, Nombre_Usuario, contraseña,rol) VALUES (?,?, ?,?)`;
  const values = [id_Usuario, nombre_Usuario, contrasena,rol];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error al insertar registro:', err);
      res.status(500).json({ error: 'Error al insertar registro' });
    } else {
      res.status(201).json({ id_Usuario });
    }
  });
});

// Ruta para actualizar un registro existente por ID
router.put('/updateUsuario/:id_Usuario', (req, res) => {
  const id_Usuario = req.params.id_Usuario;
  const { nombre_Usuario, contrasena,rol } = req.body;

  if (!nombre_Usuario|| !contrasena || !rol) {
    return res.status(400).json({ error: 'El nombre es obligatorio' });
  }

// Consulta Sql Para actualizar el registro por ID
  const sql = `
    UPDATE Usuario
    SET Nombre_Usuario= ?, Contraseña = ?, rol= ?
    WHERE id_Usuario = ?
  `;

  const values = [ nombre_Usuario, contrasena, id_Usuario,rol];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error al actualizar el registro:', err);
      res.status(500).json({ error: 'Error al actualizar el registro' });
    } else {
      res.status(200).json({ message: 'Registro actualizado con éxito' });
    }
  });
});

// Ruta para eliminar un registro existente por ID
router.delete('/deleteUsuario/:id_Usuario', (req, res) => {
  const id_Usuario = req.params.id_Usuario;
  const sql = 'DELETE FROM Usuario WHERE id Usuarios   = ?';

  db.query(sql, [id_U], (err, result) => {
    if (err) {
      console.error('Error al eliminar el registro:', err);
      res.status(500).json({ error: 'Error al eliminar el registro' });
    } else {
      res.status(200).json({ message: 'Registro eliminado con éxito' });
    }
  });
});

// Ruta para leer registros
router.get('/readusuario', (req, res) => {
// Utiliza la instancia de la base de datos pasada como parámetro
// Realizar una consulta SQL para seleccionar todos los registros
const sql = 'SELECT * FROM Usuario';

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



 // Ruta para obtener datos de ambas tablas usuario y vendedor
 router.get('/readUsuarioyVendedor', (req, res) => {

const router = express.Router();

router.get('/readUsuarioyVendedor', (req, res) => {
  const sql = 'SELECT U.*, V.* FROM Vendedor INNER JOIN Usuario U ON V.id_Usuario = U.id_Usuario';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error al obtener los datos de Vendedor y Usuario:', err);
      res.status(500).json({ error: 'Error al obtener los datos de Vendedor y Usuario' });
    } else {
      res.json(results);
    }
  });
});
});

router.put('/updateVendedor', (req, res) => {
  const {
    id_Vendedor,
    direccion,
    telefono,
    nombre,
    apellido,
  } = req.body;

  if (!id_Vendedor || !direccion || !telefono || !nombre || !apellido) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  const sqlUsuario = 'UPDATE Usuario SET id_Usuario = ? WHERE ID_Usuario = ?';
  const valuesUsuario = [id_Vendedor, id_Vendedor];

  db.query(sqlUsuario, valuesUsuario, (err, resultUsuario) => {
    if (err) {
      console.error('Error al actualizar el registro en Usuario:', err);
      return res.status(500).json({ error: 'Error al actualizar el registro en Usuario' });
    }

    const sqlVendedor = 'UPDATE Vendedor SET id_Vendedor = ?, direccion = ?, telefono = ?, nombre = ?, apellido = ? WHERE id_Vendedor = ?';
    const valuesVendedor = [id_Vendedor, direccion, telefono, nombre, apellido, id_Vendedor];

    db.query(sqlVendedor, valuesVendedor, (err, resultVendedor) => {
      if (err) {
        console.error('Error al actualizar el registro en Vendedor:', err);
        return res.status(500).json({ error: 'Error al actualizar el registro en Vendedor' });
      }

      res.status(200).json({ message: 'Registro actualizado con éxito' });
    });
  });
});

router.delete('/deleteVendedorUsuario/:id_Usuario', (req, res) => {
  const id_Usuario = req.params.id_Usuario;
  
  db.beginTransaction((err) => {
    if (err) {
      console.error('Error al iniciar la transacción:', err);
      return res.status(500).json({ error: 'Error al eliminar el vendedor' });
    }

    const deleteVendedorSQL = 'DELETE FROM Vendedor WHERE id_Usuario = ?';
    db.query(deleteVendedorSQL, [id_Usuario], (err, result) => {
      if (err) {
        db.rollback(() => {
          console.error('Error al eliminar el Vendedor:', err);
          return res.status(500).json({ error: 'Error al eliminar el vendedor' });
        });
      }

      const deleteUsuarioSQL = 'DELETE FROM Usuario WHERE id_Usuario = ?';
      db.query(deleteUsuarioSQL, [id_Usuario], (err, result) => {
        if (err) {
          db.rollback(() => {
            console.error('Error al eliminar el usuario:', err);
            return res.status(500).json({ error: 'Error al eliminar el usuario' });
          });
        }

        db.commit((err) => {
          if (err) {
            db.rollback(() => {
              console.error('Error al confirmar la transacción:', err);
              return res.status(500).json({ error: 'Error al eliminar el Vendedor' });
            });
          }

          res.status(200).json({ message: 'Vendedor eliminado con éxito' });
          });
        });
      });
    });

  });

  router.post('/createVendedor', (req, res) => {
    const {
      direccion,
      telefono,
      nombre,
      apellido,
      nombre_Usuario,  // Agregar el campo nombre_Usuario
      contrasena      // Agregar el campo contrasena
    } = req.body;
  
    if (!direccion || !telefono || !nombre || !apellido || !nombre_Usuario || !contrasena) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }
  
    const sqlUsuario = 'INSERT INTO Usuario (nombre_Usuario, contrasena) VALUES (?, ?)';
    const valuesUsuario = [nombre_Usuario, contrasena];
  
    db.query(sqlUsuario, valuesUsuario, (err, result) => {
      if (err) {
        console.error('Error al insertar registro en Usuario:', err);
        res.status(500).json({ error: 'Error al insertar registro en Usuario' });
      } else {
        const id_Usuario = result.insertId;
  
        const sqlVendedor = 'INSERT INTO Vendedor (direccion, telefono, nombre, apellido, id_Usuario) VALUES (?, ?, ?, ?, ?)';
        const valuesVendedor = [direccion, telefono, nombre, apellido, id_Usuario]; // Usar el ID_Usuario obtenido anteriormente
  
        db.query(sqlVendedor, valuesVendedor, (err, result) => {
          if (err) {
            console.error('Error al insertar registro en Vendedor:', err);
            res.status(500).json({ error: 'Error al insertar registro en Vendedor' });
          } else {
            res.status(201).json({ id_Usuario: id_Usuario });
          }
        });
      }
    });
  });
  


  
 // Ruta para leer registros
 router.get('/readvendedor', (req, res) => {
  // Utiliza la instancia de la base de datos pasada como parámetro
  // Realizar una consulta SQL para seleccionar todos los registros
  const sql = 'SELECT * FROM Vendedor';

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

  // Ruta para actualizar un registro existente por ID
router.put('/updateVendedor/:id_Vendedor', (req, res) => {
  // Obtén el ID del registro a actualizar desde los parámetros de la URL
  const id_Vendedor = req.params.id_Vendedor;

  // Recibe los datos actualizados desde el cuerpo de la solicitud (req.body)
  const { direccion, telefono, nombre, apellido, id_Usuario } = req.body;

  // Verifica si se proporcionaron los datos necesarios
  if (!direccion || !telefono || !nombre || !apellido|| !id_Usuario) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  // Realiza la consulta SQL para actualizar el registro por ID
  const sql = `
    UPDATE Vendedor
    SET Direccion = ?, Telefono = ?, Nombre = ?, Apellido = ?,ID_Usuario = ?
    WHERE ID Vendedor = ?
  `;
 
  const values = [direccion, telefono, nombre, apellido,id_Usuario, id_Vendedor];

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
router.delete('/deleteVendedor/:id_Vendedor', (req, res) => {
  // Obtén el ID del registro a eliminar desde los parámetros de la URL
  const id_Vendedor = req.params.id_Vendedor;

  // Realiza la consulta SQL para eliminar el registro por ID
  const sql = 'DELETE FROM Vendedor WHERE ID_Vendedor = ?';

  // Ejecuta la consulta
  db.query(sql, [id_Vendedor], (err, result) => {
    if (err) {
      console.error('Error al eliminar el registro:', err);
      res.status(500).json({ error: 'Error al eliminar el registro' });
    } else {
      // Devuelve un mensaje de éxito
      res.status(200).json({ message: 'Registro eliminado con éxito' });
    }
  });
});







  return router;
};