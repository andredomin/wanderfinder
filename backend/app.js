const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./db'); 
const alojamientosRoutes = require('./alojamientos');

dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());


db.query('SELECT 1', (err) => {
  if (err) {
    console.error('Error de conexión a MySQL:', err);
    process.exit(1); 
  }
  console.log('Conexión exitosa a la base de datos');
});


app.get('/', (req, res) => {
  res.send('¡WanderFinder corriendo!');
});


app.get('/api/destinos', (req, res) => {
  db.query('SELECT * FROM destinos', (err, results) => {
    if (err) {
      console.error('Error al obtener destinos:', err);
      return res.status(500).json({ message: 'Error al obtener destinos' });
    }
    res.json(results);
  });
});



app.use('/api', alojamientosRoutes);


const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
