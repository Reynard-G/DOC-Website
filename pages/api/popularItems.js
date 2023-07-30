const pool = require("./db");

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { monthly = false, limit = 10 } = req.query;

      if (monthly === "true") {
        const rows = await pool.query(
          "SELECT item_name, total_sell_quantity, month " +
          "FROM ( " +
            "SELECT item_name, " +
              "SUM(sell_item_quantity) AS total_sell_quantity, " +
              "DATE_FORMAT(created_at, '%Y-%m') AS month, " +
              "ROW_NUMBER() OVER (PARTITION BY DATE_FORMAT(created_at, '%Y-%m') ORDER BY SUM(sell_item_quantity) DESC) AS row_num " +
            "FROM historical_prices " +
            "WHERE DATE_FORMAT(created_at, '%Y-%m') <= DATE_FORMAT(NOW(), '%Y-%m') " +
            "GROUP BY item_name, month " +
          ") AS subquery " +
          "WHERE row_num <= ? " +
          "ORDER BY month DESC, total_sell_quantity DESC;",
          [parseInt(limit)]
        );

        res.status(200).json(rows);
      } else {
        const rows = await pool.query(
          "SELECT " +
            "item_name, " +
            "SUM(sell_item_quantity) AS total_sell_quantity, " +
            "DATE_FORMAT(created_at, '%Y-%m') AS month " +
          "FROM historical_prices " +
          "WHERE DATE_FORMAT(created_at, '%Y-%m') = DATE_FORMAT(NOW(), '%Y-%m') " +
          "GROUP BY item_name, month " +
          "ORDER BY month DESC, total_sell_quantity DESC " +
          "LIMIT ?;",
          [parseInt(limit)]
        );

        res.status(200).json(rows);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
