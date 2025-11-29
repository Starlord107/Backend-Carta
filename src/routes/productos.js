const express = require("express");
const router = express.Router();
const db = require("../db");

// Obtener todos los productos con sus formatos reales
router.get("/", (req, res) => {
  const sql = `
    SELECT 
      p.id AS producto_id,
      p.nombre,
      p.precio AS precio_base,
      p.categoria,
      p.imagen,
      p.subcategoria,

      f.id AS formato_id,
      f.nombre_formato,
      f.precio AS formato_precio

    FROM productos p
    LEFT JOIN formatos f ON p.id = f.producto_id
    ORDER BY p.id;
  `;

  db.all(sql, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });

    const productosMap = {};

    rows.forEach(row => {
      if (!productosMap[row.producto_id]) {
        productosMap[row.producto_id] = {
          id: row.producto_id,
          nombre: row.nombre,
          precio: row.precio_base,
          categoria: row.categoria,
          imagen: row.imagen,
          subcategoria: row.subcategoria,
          formatos: []
        };
      }

      // Si tiene formato, añadirlo
      if (row.formato_id) {
        productosMap[row.producto_id].formatos.push({
          id: row.formato_id,
          nombre: row.nombre_formato,
          precio: row.formato_precio
        });
      }
    });

    res.json(Object.values(productosMap));
  });
});

module.exports = router;
