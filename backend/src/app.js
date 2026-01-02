const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const authRoutes = require("./routes/auth.routes");
const promptRoutes = require("./routes/prompt.routes");

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/prompts", promptRoutes);

module.exports = app;
