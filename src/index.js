require("dotenv").config


const express = require("express");
const cors = require("cors");
const db = require("./db"); // 🔥 Conexión a PostgreSQL

const app = express();

// Railway te pasa el puerto en process.env.PORT
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("Backend funcionando correctamente 🚀");
});

// ======================
//     RUTAS
// ======================

// Productos
const productosRouter = require("./routes/productos");
app.use("/api/productos", productosRouter);

// Mesas
const mesasRouter = require("./routes/mesas");
app.use("/api/mesas", mesasRouter);

// Pedidos
const pedidosRouter = require("./routes/pedidos");
app.use("/api/pedidos", pedidosRouter);

// Camareros
const camarerosRouter = require("./routes/camareros");
app.use("/api/camareros", camarerosRouter);

// ======================
//   INICIAR SERVIDOR
// ======================
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
