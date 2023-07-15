const express = require("express");
const authRoutes = require("./routes/auth");
const app = express();

app.use(express.json()); // pour intercepter les requittes d'utilisateurs
app.use("/auth", authRoutes);

module.exports = app;
