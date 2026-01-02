const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/auth.routes");
const promptRoutes = require("./routes/prompt.routes");

const app = express();
const _dirname = path.resolve();

/* -------------------- Middlewares -------------------- */
app.use(express.json());
app.use(cookieParser());

/* -------------------- CORS -------------------- */
app.use(
  cors({
    origin: "http://localhost:4000",
    credentials: true,
  })
);

/* -------------------- API Routes -------------------- */
app.use("/api/auth", authRoutes);
app.use("/api/prompts", promptRoutes);

/* -------------------- Frontend (React build) -------------------- */
app.use(express.static(path.join(_dirname, "frontend", "dist")));

app.get(/^(?!\/api).*/, (_, res) => {
  res.sendFile(
    path.resolve(_dirname, "frontend", "dist", "index.html")
  );
});

module.exports = app;
