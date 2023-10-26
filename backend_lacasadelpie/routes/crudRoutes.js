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
  const sql = `INSERT INTO categorias (id_categoria, productos,  descripcion) VALUES ( ?, ?, ?)`;
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
  const { id_Marca, nombre_Marca } = req.body;

  // Verifica si se proporcionaron los datos necesarios
  if (!id_Marca || !nombre_Marca) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  // Realiza la consulta SQL para insertar un nuevo registro con ID específico
  const sql = `INSERT INTO Marcas (ID_Marca, Nombre_Marca) VALUES (?, ?)`;
  const values = [id_Marca, nombre_Marca];

  // Ejecuta la consulta
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error al insertar registro:', err);
      res.status(500).json({ error: 'Error al insertar registro' });
    } else {
      // Devuelve el ID del nuevo registro como respuesta
      res.status(201).json({ id_Marca });
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
 router.get('/readpagos', (req, res) => {
  // Utiliza la instancia de la base de datos pasada como parámetro
  // Realizar una consulta SQL para seleccionar todos los registros
  const sql = 'SELECT * FROM Pagos';

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
router.post('/createPagos', (req, res) => {
  // Recibe los datos del nuevo registro desde el cuerpo de la solicitud (req.body)
  const { id_Pago, metododePago, codigoPago,cod_Venta,monto,fecha_pago,id_Cliente } = req.body;

  // Verifica si se proporcionaron los datos necesarios
  if (!id_Pago || !metododePago|| !codigoPago|| !cod_Venta|| !monto || !fecha_pago| !id_Cliente ) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  // Realiza la consulta SQL para insertar un nuevo registro con ID específico
  const sql = `INSERT INTO pagos (Id_Pago, MetododePago, CodigoPago,CodigoVenta,MontoVenta,FechaPago,id_Cliente) VALUES (?, ?,?,?,?, ?,?)`;
  const values = [id_Pago, metododePago, codigoPago,cod_Venta,monto,fecha_pago,id_Cliente ];

  // Ejecuta la consulta
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error al insertar registro:', err);
      res.status(500).json({ error: 'Error al insertar registro' });
    } else {
      // Devuelve el ID del nuevo registro como respuesta
      res.status(201).json({ id_Pago });
    }
  });
});

  // Ruta para actualizar un registro existente por ID
router.put('/updatePagos/:id_Pago', (req, res) => {
  // Obtén el ID del registro a actualizar desde los parámetros de la URL
  const id_Pago = req.params.id_Pago;

  // Recibe los datos actualizados desde el cuerpo de la solicitud (req.body)
  const { metododePago, codigoPago,cod_Venta,monto,fecha_pago,id_Cliente} = req.body;

  // Verifica si se proporcionaron los datos necesarios
  if ( !metododePago|| !codigoPago|| !cod_Venta|| !monto || !fecha_pago| !id_Cliente) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  // Realiza la consulta SQL para actualizar el registro por ID
  const sql = `
    UPDATE Pagos
    SET MetododePago = ?, CodigoPago = ?,cod_Venta =?,monto = ?,fecha_Pago = ?
    WHERE ID_Pagos = ?
  `;

  const values = [ metododePago, codigoPago,cod_Venta,monto,fecha_pago,id_Cliente,id_Pago];

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
router.delete('/deletePagos/:id_Pago', (req, res) => {
  // Obtén el ID del registro a eliminar desde los parámetros de la URL
  const id_Pago = req.params.id_Pago;

  // Realiza la consulta SQL para eliminar el registro por ID
  const sql = 'DELETE FROM Pagos WHERE ID_Pago = ?';

  // Ejecuta la consulta
  db.query(sql, [id_Pago], (err, result) => {
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
router.get('/readclientes', (req, res) => {
  // Utiliza la instancia de la base de datos pasada como parámetro
  // Realizar una consulta SQL para seleccionar todos los registros
  const sql = 'SELECT * FROM Clientes';

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

// Ruta para leer registros
router.get('/readclientes', (req, res) => {
  // Utiliza la instancia de la base de datos pasada como parámetro
  // Realizar una consulta SQL para seleccionar todos los registros
  const sql = 'SELECT * FROM Clientes';

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
router.post('/createClientes', (req, res) => {
  // Recibe los datos del nuevo registro desde el cuerpo de la solicitud (req.body)
  const { cedula, nombre, apellido, historialdecompras, direccionEnvio,id_Usuario } = req.body;

  // Verifica si se proporcionaron los datos necesarios
  if (!cedula|| !nombre || !apellido || !historialdecompras|| !direccionEnvio|| !id_Usuario) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  // Realiza la consulta SQL para insertar un nuevo registro con ID específico
  const sql = `INSERT INTO Clientes (cedula, nombre, apellido, historialdecompras, direccionEnvio) VALUES (?, ?, ?, ?, ?)`;
  const values = [cedula, nombre, apellido, historialdecompras, direccionEnvio];

  // Ejecuta la consulta
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error al insertar registro:', err);
      res.status(500).json({ error: 'Error al insertar registro' });
    } else {
      // Devuelve el ID del nuevo registro como respuesta
      res.status(200).json({ ok: 'Registro ingresado' });
    }
  });
});

  // Ruta para actualizar un registro existente por ID
router.put('/updateClientes/:id_Cliente', (req, res) => {
  // Obtén el ID del registro a actualizar desde los parámetros de la URL
  const id_Cliente = req.params.id_Cliente;

  // Recibe los datos actualizados desde el cuerpo de la solicitud (req.body)
  const { cedula, nombre, apellido, historialdecompras, direccionEnvio,id_Usuario} = req.body;

  // Verifica si se proporcionaron los datos necesarios
  if (!cedula || !nombre || !apellido || !historialdecompras || !direccionEnvio|| !id_Usuario) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  // Realiza la consulta SQL para actualizar el registro por ID
  const sql = `
    UPDATE Clientes
    SET cedula = ?, nombre = ?, apellido = ?, historialdecompras = ?, direccionEnvio = ?,id_Usuario =?,
    WHERE id_Cliente= ?
  `;
 
  const values = [cedula, nombre, apellido, historialdecompras, direccionEnvio.id_Usuario, id_Cliente];

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
router.delete('/deleteClientes/:id_Cliente', (req, res) => {
  // Obtén el ID del registro a eliminar desde los parámetros de la URL
  const id_Cliente = req.params.id_Cliente;

  // Realiza la consulta SQL para eliminar el registro por ID
  const sql = 'DELETE FROM Clientes WHERE id_Cliente = ?';

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
router.get('/readVenta', (req, res) => {
  // Utiliza la instancia de la base de datos pasada como parámetro
  // Realizar una consulta SQL para seleccionar todos los registros
  const sql = 'SELECT * FROM Ventas';

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
  const { cod_Venta, id_Cliente, id_Vendedor,cantidadProducto,total,metododePago, fecha, Estado, Presencial_enLinea } = req.body;

  // Verifica si se proporcionaron los datos necesarios
  if (!cod_Venta|| !id_Cliente|| !id_Vendedor || !fecha|| !cantidadProducto|| !total|| !metododePago || !Estado|| !Presencial_enLinea) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  // Realiza la consulta SQL para insertar un nuevo registro con ID específico
  const sql = `INSERT INTO Ventas (cod_Venta, id_Cliente, id_Vendedor,cantidadProducto,total,metododePago, fecha, Estado, Presencial_enLinea ) VALUES (?, ?, ?, ?, ?, ?,?,?,?)`;
  const values = [cod_Venta, id_Cliente, id_Vendedor,cantidadProducto,total,metododePago, fecha, Estado, Presencial_enLinea ];

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
  const { id_Cliente, id_Vendedor,cantidadProducto,total,metododePago, fecha, Estado, Presencial_enLinea} = req.body;

  // Verifica si se proporcionaron los datos necesarios
  if (!cod_Venta|| !id_Cliente|| !id_Vendedor || !fecha|| !cantidadProducto|| !total|| !metododePago || !Estado|| !Presencial_enLinea) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  // Realiza la consulta SQL para actualizar el registro por ID
  const sql = `
    UPDATE Ventas
    SET id_Cliente = ?, id_Vendedor = ?, fecha = ?,cantidadProducto=?,total =?, metododePago=?, Estado = ?, Presencial_enLinea = ?
    WHERE cod_Venta= ?
  `;
 
  const values = [ id_Cliente, id_Vendedor,cantidadProducto,total,metododePago, fecha, Estado, Presencial_enLinea,cod_Venta];

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
  const {id_Usuario, nombre_Usuario, contrasena} = req.body;

  if (!id_Usuario|| !nombre_Usuario || !contrasena) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  const sql = `INSERT INTO Usuario (id_Usuario, Nombre_Usuario, contraseña) VALUES (?,?, ?)`;
  const values = [id_Usuario, nombre_Usuario, contrasena];

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
  const { nombre_Usuario, contrasena } = req.body;

  if (!nombre_Usuario|| !contrasena) {
    return res.status(400).json({ error: 'El nombre es obligatorio' });
  }

// Consulta Sql Para actualizar el registro por ID
  const sql = `
    UPDATE Usuario
    SET Nombre_Usuario= ?, Contraseña = ?
    WHERE id_Usuario = ?
  `;

  const values = [ nombre_Usuario, contrasena, id_Usuario];

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

  db.query(sql, [id_Categoria], (err, result) => {
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
  





  return router;
};





