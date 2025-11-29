const express = require("express");
const router = express.Router();

// IMPORTA TU DB
const db = require("../db"); // o según tu ruta real

router.post("/login", (req, res) => {
  const { usuario, password } = req.body;

  db.get(
    "SELECT * FROM camareros WHERE usuario = ? AND password = ?",
    [usuario, password],
    (err, row) => {
      if (err) return res.status(500).json({ error: err.message });

      if (!row) {
        return res.status(401).json({ error: "Credenciales incorrectas" });
      }

      res.json({ ok: true, usuario: row.usuario, nombre: row.nombre });
    }
  );
});

module.exports = router;
