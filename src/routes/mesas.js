const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM mesas ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id/estado", async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;

  try {
    const result = await db.query(
      "UPDATE mesas SET estado = $1 WHERE id = $2",
      [estado, id]
    );

    res.json({ success: true, message: "Mesa actualizada" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
