const pool = require("./db");

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const rows = await pool.query(`
        SELECT
          item_name,
          rgb
        FROM item_colors
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