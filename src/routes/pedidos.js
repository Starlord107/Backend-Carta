const express = require("express");
const router = express.Router();
const db = require("../db");
const { imprimirTicket } = require("../utils/printer");

// Crear pedido
router.post("/", async (req, res) => {
  const { mesa_id, items, total, fecha } = req.body;

  try {
    const result = await db.query(
      "INSERT INTO pedidos (mesa_id, items, total, fecha) VALUES ($1, $2, $3, $4) RETURNING id",
      [mesa_id, JSON.stringify(items), total, fecha]
    );

    imprimirTicket({ mesa_id, items, total });

    res.json({ success: true, pedido_id: result.rows[0].id });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obtener pedidos por mesa
router.get("/mesa/:id", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM pedidos WHERE mesa_id = $1 ORDER BY id ASC",
      [req.params.id]
    );

    const pedidos = result.rows.map(p => ({
      pedido_id: p.id,
      mesa_id: p.mesa_id,
      items: p.items,
      total: p.total,
      fecha: p.fecha
    }));

    res.json(pedidos);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Borrar pedidos de mesa
router.delete("/mesa/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM pedidos WHERE mesa_id = $1", [req.params.id]);
    res.json({ success: true, message: "Pedidos eliminados" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
