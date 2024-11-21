const express = require('express');
const cors = require('cors');
const categoriesRouter = require('./routes/categories');
const productsRouter = require('./routes/products');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Rutas
app.use('/categories', categoriesRouter);
app.use('/products', productsRouter);

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});