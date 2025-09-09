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
async function query(sql, params = {}) {
  try {
    const connection = await mysql.createConnection(config.db);
    const [results] = await connection.execute(sql, params);
    await connection.end();
    return results;
  } catch (error) {
    console.error("Database error:", error.message);
    throw error;
  }
}

// PROFESORI API

app.get("/api/profesori", async (req, res) => {
  try {
    const result = await query("SELECT * FROM profesori ORDER BY prezime, ime");
    res.json(result);
  } catch (err) {
    console.error("Greška u čitanju profesora:", err.message);
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/profesori", async (req, res) => {
  try {
    const { ime, prezime, email, telefon } = req.body;
    const result = await query(
      "INSERT INTO profesori (ime, prezime, email, telefon) VALUES (?, ?, ?, ?)",
      [ime, prezime, email, telefon]
    );
    res.json({ success: true, id: result.insertId });
  } catch (err) {
    console.error("Greška u dodavanju profesora:", err.message);
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/profesori", async (req, res) => {
  try {
    const { id, ime, prezime, email, telefon } = req.body;
    const result = await query(
      "UPDATE profesori SET ime=?, prezime=?, email=?, telefon=? WHERE id=?",
      [ime, prezime, email, telefon, id]
    );
    res.json({ success: true, affectedRows: result.affectedRows });
  } catch (err) {
    console.error("Greška u ažuriranju profesora:", err.message);
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/profesori", async (req, res) => {
  try {
    const { id } = req.body;
    const result = await query("DELETE FROM profesori WHERE id=?", [id]);
    res.json({ success: true, affectedRows: result.affectedRows });
  } catch (err) {
    console.error("Greška u brisanju profesora:", err.message);
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
      ORDER BY t.naziv
    `);
    res.json(result);
  } catch (err) {
    console.error("Greška u čitanju tečajeva:", err.message);
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/tecajevi", async (req, res) => {
  try {
    const { naziv, jezik, profesor_id, cijena } = req.body;
    const result = await query(
      "INSERT INTO tecajevi (naziv, jezik, profesor_id, cijena) VALUES (?, ?, ?, ?)",
      [naziv, jezik, profesor_id, cijena]
    );
    res.json({ success: true, id: result.insertId });
  } catch (err) {
    console.error("Greška u dodavanju tečaja:", err.message);
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/tecajevi", async (req, res) => {
  try {
    const { id, naziv, jezik, profesor_id, cijena } = req.body;
    const result = await query(
      "UPDATE tecajevi SET naziv=?, jezik=?, profesor_id=?, cijena=? WHERE id=?",
      [naziv, jezik, profesor_id, cijena, id]
    );
    res.json({ success: true, affectedRows: result.affectedRows });
  } catch (err) {
    console.error("Greška u ažuriranju tečaja:", err.message);
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/tecajevi", async (req, res) => {
  try {
    const { id } = req.body;
    const result = await query("DELETE FROM tecajevi WHERE id=?", [id]);
    res.json({ success: true, affectedRows: result.affectedRows });
  } catch (err) {
    console.error("Greška u brisanju tečaja:", err.message);
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
      ORDER BY u.id DESC
    `);
    res.json(result);
  } catch (err) {
    console.error("Greška u čitanju upisa:", err.message);
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/upisi", async (req, res) => {
  try {
    const { profesor_id, tecaj_id, broj_polaznika } = req.body;
    const result = await query(
      "INSERT INTO upisi (profesor_id, tecaj_id, broj_polaznika) VALUES (?, ?, ?)",
      [profesor_id, tecaj_id, broj_polaznika]
    );
    res.json({ success: true, id: result.insertId });
  } catch (err) {
    console.error("Greška u dodavanju upisa:", err.message);
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/upisi", async (req, res) => {
  try {
    const { id, profesor_id, tecaj_id, broj_polaznika } = req.body;
    const result = await query(
      "UPDATE upisi SET profesor_id=?, tecaj_id=?, broj_polaznika=? WHERE id=?",
      [profesor_id, tecaj_id, broj_polaznika, id]
    );
    res.json({ success: true, affectedRows: result.affectedRows });
  } catch (err) {
    console.error("Greška u ažuriranju upisa:", err.message);
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/upisi", async (req, res) => {
  try {
    const { id } = req.body;
    const result = await query("DELETE FROM upisi WHERE id=?", [id]);
    res.json({ success: true, affectedRows: result.affectedRows });
  } catch (err) {
    console.error("Greška u brisanju upisa:", err.message);
    res.status(500).json({ error: err.message });
  }
});


// STATISTIKA API


// 1: Broj tečajeva po profesoru
app.get("/api/statistike/profesori", async (req, res) => {
  try {
    const result = await query(`
      SELECT
        p.ime,
        p.prezime,
        COUNT(t.id) as broj_tecajeva
      FROM profesori p
      LEFT JOIN tecajevi t ON p.id = t.profesor_id
      GROUP BY p.id, p.ime, p.prezime
      ORDER BY broj_tecajeva DESC
    `);
    res.json(result);
  } catch (err) {
    console.error("Greška u statistikama profesora:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// 2: Ukupno polaznika po jeziku
app.get("/api/statistike/jezici", async (req, res) => {
  try {
    const result = await query(`
      SELECT
        t.jezik,
        COUNT(t.id) as broj_tecajeva,
        IFNULL(SUM(u.broj_polaznika), 0) as ukupno_polaznika
      FROM tecajevi t
      LEFT JOIN upisi u ON t.id = u.tecaj_id
      GROUP BY t.jezik
      ORDER BY ukupno_polaznika DESC
    `);
    res.json(result);
  } catch (err) {
    console.error("Greška u statistikama jezika:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Detalji tečajeva s više od 5 polaznika
app.get("/api/statistike/zarade", async (req, res) => {
  try {
    const result = await query(`
      SELECT
        p.ime,
        p.prezime,
        t.naziv as tecaj,
        t.jezik,
        u.broj_polaznika,
        t.cijena
      FROM profesori p
      JOIN tecajevi t ON p.id = t.profesor_id
      JOIN upisi u ON t.id = u.tecaj_id
      WHERE u.broj_polaznika >= 5
      ORDER BY u.broj_polaznika DESC
    `);
    res.json(result);
  } catch (err) {
    console.error("Greška u detaljima tečajeva:", err.message);
    res.status(500).json({ error: err.message });
  }
});


// FAKE LOGIN API

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  // FAKE LOGIN - uvijek uspije ako su polja ispunjena
  if (email && password) {
    res.json({
      success: true,
      message: "Uspješna prijava!",
      user: {
        id: 1,
        email: email,
        name: "Administrator"
      },
      token: "fake-jwt-token-" + Date.now()
    });
  } else {
    res.status(400).json({
      success: false,
      message: "Email i lozinka su obavezni!"
    });
  }
});

app.listen(port, ()=>{
  console.log(`API server je pokrenut na http:localhost:${port}`)
})