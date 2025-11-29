const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./restaurante.db', (err) => {
  if (err) {
    console.error('❌ Error al abrir la base de datos:', err.message);
  } else {
    console.log('✅ Base de datos SQLite conectada');
  }
});

// Crear tabla de productos si no existe
db.run(`
  CREATE TABLE IF NOT EXISTS productos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT,
    precio REAL,
    categoria TEXT,
    imagen TEXT
  )
`);

module.exports = db;
