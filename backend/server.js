// Rahul Kumar - Auficionado Prototype (Back-End Only)

import express from "express";
import cors from "cors";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// PostgreSQL connection (Neon)
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Root route (required for Railway health checks)
app.get("/", (req, res) => {
  res.send("Auficionado Backend is Running");
});

// Audiobooks API endpoint
app.get("/api/audiobooks", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM audiobooks LIMIT 20");
    res.json(result.rows);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Failed to fetch audiobooks" });
  }
});

// Railway port binding
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});