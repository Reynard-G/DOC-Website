const mariadb = require("mariadb");

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  pingInterval: 30000,
  connectionLimit: 5
});

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const rows = await pool.query(`
        SELECT
          month,
          year,
          total_basket_cost
        FROM inflation
        ORDER BY YEAR(year), MONTH(month)
      `);

      res.status(200).json(rows);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}