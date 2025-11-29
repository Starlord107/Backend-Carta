const express = require("express");
const router = express.Router();
const db = require("../db");

// Obtener lista de mesas
router.get("/", (req, res) => {
  db.all("SELECT * FROM mesas", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

router.put("/:id/estado", (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;

  db.run("UPDATE mesas SET estado = ? WHERE id = ?", [estado, id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Mesa actualizada", changes: this.changes });
  });
});

// Cambiar estado de una mesa
router.put("/:id/estado", (req, res) => {
  const { estado } = req.body;

  db.run("UPDATE mesas SET estado = ? WHERE id = ?", [estado, req.params.id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, message: "Mesa actualizada", changes: this.changes });
    }
  );
});



module.exports = router;
