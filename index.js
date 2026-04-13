import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Mimo Doces ERP rodando 🚀");
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000 🚀");
});