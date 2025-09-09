const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
const config = require("./config");

const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(cors({ origin: "*" }));

// Funkcija za SQL upit
async function query(sql, params) {
  try {
    const connection = await mysql.createConnection(config.db);
    const [results] = await connection.execute(sql, params);
    await connection.end();
    return results;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// PROFESORI API
app.get("/api/profesori", async (req, res) => {
  try {
    const result = await query("SELECT * FROM profesori");
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/profesori", async (req, res) => {
  try {
    const result = await query(
      "INSERT INTO profesori (ime, prezime, email, telefon) VALUES (:ime, :prezime, :email, :telefon)",
      req.body
    );
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/profesori", async (req, res) => {
  try {
    const result = await query(
      "UPDATE profesori SET ime=:ime, prezime=:prezime, email=:email, telefon=:telefon WHERE id=:id",
      req.body
    );
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/profesori", async (req, res) => {
  try {
    const result = await query("DELETE FROM profesori WHERE id=:id", req.body);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// TEČAJEVI API
app.get("/api/tecajevi", async (req, res) => {
  try {
    const result = await query(`
      SELECT t.*, CONCAT(p.ime, ' ', p.prezime) as profesor_ime
      FROM tecajevi t
      LEFT JOIN profesori p ON t.profesor_id = p.id
    `);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/tecajevi", async (req, res) => {
  try {
    const result = await query(
      "INSERT INTO tecajevi (naziv, jezik, profesor_id, cijena) VALUES (:naziv, :jezik, :profesor_id, :cijena)",
      req.body
    );
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/tecajevi", async (req, res) => {
  try {
    const result = await query(
      "UPDATE tecajevi SET naziv=:naziv, jezik=:jezik, profesor_id=:profesor_id, cijena=:cijena WHERE id=:id",
      req.body
    );
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/tecajevi", async (req, res) => {
  try {
    const result = await query("DELETE FROM tecajevi WHERE id=:id", req.body);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPISI API
app.get("/api/upisi", async (req, res) => {
  try {
    const result = await query(`
      SELECT u.*,
             CONCAT(p.ime, ' ', p.prezime) as profesor_ime,
             t.naziv as tecaj_naziv,
             t.jezik
      FROM upisi u
      LEFT JOIN profesori p ON u.profesor_id = p.id
      LEFT JOIN tecajevi t ON u.tecaj_id = t.id
    `);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/upisi", async (req, res) => {
  try {
    const result = await query(
      "INSERT INTO upisi (profesor_id, tecaj_id, broj_polaznika) VALUES (:profesor_id, :tecaj_id, :broj_polaznika)",
      req.body
    );
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/upisi", async (req, res) => {
  try {
    const result = await query(
      "UPDATE upisi SET profesor_id=:profesor_id, tecaj_id=:tecaj_id, broj_polaznika=:broj_polaznika WHERE id=:id",
      req.body
    );
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/upisi", async (req, res) => {
  try {
    const result = await query("DELETE FROM upisi WHERE id=:id", req.body);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`API server pokrenuti na http://localhost:${port}`);
});
