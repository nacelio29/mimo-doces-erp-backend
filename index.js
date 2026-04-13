import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Mimo Doces ERP rodando 🚀");
});

app.get("/teste-banco", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM usuarios");
    res.json(result.rows);
  } catch (error) {
    res.json({ erro: error.message });
  }
});
