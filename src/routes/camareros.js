const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/login", async (req, res) => {
  const { usuario, password } = req.body;

  try {
    const result = await db.query(
      "SELECT * FROM camareros WHERE usuario = $1 AND password = $2",
      [usuario, password]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }

    const row = result.rows[0];

    res.json({
      ok: true,
      usuario: row.usuario,
      nombre: row.nombre,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
