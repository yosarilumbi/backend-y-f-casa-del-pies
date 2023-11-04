const express = require('express');
const mysql = require('mysql');
const cors = require('cors');


const app = express();
const port = 5000;

app.use(express.json());

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'Administrador',
  password: 'Admin123',
  database: 'casadelpies1'
});

db.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err);
  } else {
    console.log('Conexión exitosa a la base de datos.');
  }
});

// Configurar el uso de CORS
app.use(cors());


// Iniciar el servidor
app.listen(port, () => {
  console.log(`Codigo funcionando en el puerto ${port}`);
});

const crudRoutes = require('./routes/crudRoutes.js')(db);
app.use('/crud', crudRoutes);

