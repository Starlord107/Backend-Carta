require("dotenv").config
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Ejecutar creación de tablas
async function initDB() {
  try {
    console.log("⏳ Creando tablas en PostgreSQL...");

    // CAMAREROS
    await pool.query(`
      CREATE TABLE IF NOT EXISTS camareros (
        id SERIAL PRIMARY KEY,
        usuario TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        nombre TEXT NOT NULL
      );
    `);

    // MESAS
    await pool.query(`
      CREATE TABLE IF NOT EXISTS mesas (
        id SERIAL PRIMARY KEY,
        numero INTEGER NOT NULL,
        estado TEXT NOT NULL
      );
    `);

    // PRODUCTOS
    await pool.query(`
      CREATE TABLE IF NOT EXISTS productos (
        id SERIAL PRIMARY KEY,
        nombre TEXT NOT NULL,
        precio REAL NOT NULL,
        categoria TEXT,
        imagen TEXT,
        subcategoria TEXT
      );
    `);

    // FORMATOS
    await pool.query(`
      CREATE TABLE IF NOT EXISTS formatos (
        id SERIAL PRIMARY KEY,
        producto_id INTEGER REFERENCES productos(id) ON DELETE CASCADE,
        nombre_formato TEXT NOT NULL,
        precio REAL NOT NULL
      );
    `);

    // PEDIDOS
    await pool.query(`
      CREATE TABLE IF NOT EXISTS pedidos (
        id SERIAL PRIMARY KEY,
        mesa_id INTEGER REFERENCES mesas(id),
        items TEXT NOT NULL,
        total REAL NOT NULL,
        fecha TEXT NOT NULL
      );
    `);

    console.log("✅ Tablas creadas correctamente.");

  } catch (err) {
    console.error("❌ Error creando tablas:", err);
  }
}

initDB();
module.exports = pool;
