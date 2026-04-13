import express from "express";
import cors from "cors";
import pkg from "pg";

const { Pool } = pkg;

const app = express();
app.use(cors());
app.use(express.json());

// 🔗 conexão com banco (Supabase)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// 🚀 rota principal
app.get("/", (req, res) => {
  res.send("Mimo Doces ERP rodando 🚀");
});

// 🧪 teste de banco
app.get("/teste-banco", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM usuarios");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

// 🔐 login real
app.post("/login", async (req, res) => {
  try {
    const { email, senha, codigo } = req.body;

    const result = await pool.query(
      "SELECT * FROM usuarios WHERE email=$1 AND senha=$2 AND codigo_empresa=$3",
      [email, senha, codigo]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ erro: "Acesso negado" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

// 🚀 iniciar servidor
app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000 🚀");
});
