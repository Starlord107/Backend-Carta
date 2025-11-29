const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,  // Requerido por Railway
  },
});

// Probar conexión
pool.connect()
  .then(() => console.log("✅ Conectado a PostgreSQL en Railway"))
  .catch(err => console.error("❌ Error conectando a PostgreSQL:", err));

module.exports = pool;
