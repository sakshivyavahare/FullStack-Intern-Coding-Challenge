const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/auth.routes");

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("API is running");
});

module.exports = app;
