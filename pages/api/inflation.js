const pool = require("./db");

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const rows = await pool.query(`
        SELECT
          month,
          year,
          total_basket_cost
        FROM inflation
        ORDER BY STR_TO_DATE(CONCAT(year, month), '%Y %M') ASC;
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