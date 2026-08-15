import express from "express";
import cors from "cors";
import pg from "pg";

const app = express();
app.use(cors());

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

app.get("/api/audiobooks", async (req, res) => {
  const result = await pool.query("SELECT * FROM audiobooks LIMIT 10");
  res.json(result.rows);
});

app.listen(process.env.PORT || 3000, () => {
  console.log("API running");
});