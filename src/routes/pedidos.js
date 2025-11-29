const express = require("express");
const router = express.Router();
const db = require("../db");
const {imprimirTicket}=require("../utils/printer")

// Crear un pedido
router.post("/", (req, res) => {
  const { mesa_id, items, total, fecha } = req.body;

  db.run(
    "INSERT INTO pedidos (mesa_id, items, total, fecha) VALUES (?, ?, ?, ?)",
    [mesa_id, JSON.stringify(items), total, fecha],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
        imprimirTicket({mesa_id,items,total})
      res.json({ success: true, pedido_id: this.lastID });
    }
  );
});

// Obtener pedidos por mesa
router.get("/mesa/:id", (req, res) => {
  db.all(
  "SELECT * FROM pedidos WHERE mesa_id = ? ORDER BY id ASC",
  [req.params.id],
  (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!rows.length) return res.json([]);

    const resultado = rows.map(r => ({
      pedido_id: r.id,
      mesa_id: r.mesa_id,
      items: JSON.parse(r.items),
      total: r.total,
      fecha: r.fecha
    }));

    res.json(resultado);
  }
);
});

// Borrar todos los pedidos de una mesa
router.delete("/mesa/:id", (req, res) => {
  db.run("DELETE FROM pedidos WHERE mesa_id = ?", [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, message: "Pedidos eliminados", changes: this.changes });
  });
});


module.exports = router;
