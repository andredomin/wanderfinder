const express = require('express');
const router = express.Router();
const db = require('./db');  


router.get('/alojamientos/:destinoId', (req, res) => {
  const { destinoId } = req.params;

  
  if (!destinoId) {
    return res.status(400).json({ message: '¡Falta el parámetro destinoId!' });
  }

 
  db.query('SELECT * FROM alojamientos WHERE destinoId = ?', [destinoId], (err, results) => {
    if (err) {
      console.error('Error al obtener alojamientos:', err.message);
      return res.status(500).json({ message: 'Error al obtener alojamientos' });
    }

    
    res.json(results);
  });
});

module.exports = router;
