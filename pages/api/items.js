const pool = require("./db");

function validateSortOrder(sort) {
  const allowedColumns = [
    "item_name",
    "location",
    "store_owner",
    "buy_transactions",
    "sell_transactions",
    "total_transactions",
    "buy_items_quantity",
    "sell_items_quantity",
    "total_items_quantity",
    "buy_price_per_unit",
    "sell_price_per_unit",
    "created_at",
  ];
  return allowedColumns.includes(sort);
}

// Validate sort direction
function validateSortDirection(order) {
  return order === "ASC" || order === "DESC";
}

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { sort, order, item_name, limit } = req.query;

      let query = 
        "SELECT " +
          "item_name, " +
          "location, " +
          "store_owner, " +
          "buy_transactions, " +
          "sell_transactions, " +
          "(buy_transactions + sell_transactions) AS total_transactions, " +
          "buy_item_quantity, " +
          "sell_item_quantity, " +
          "(buy_item_quantity + sell_item_quantity) AS total_item_quantity, " +
          "buy_price_per_unit, " +
          "sell_price_per_unit, " +
          "created_at " +
        "FROM historical_prices ";

        const values = [];

      // Filter by item name
      if (item_name) {
        query += "WHERE item_name LIKE ? ";
        values.push(`%${item_name}%`);
      }

      // Add sorting and ordering
      if (sort && order && validateSortOrder(sort) && validateSortDirection(order)) {
        const orderClause = `${sort} ${order}`;
        query += `ORDER BY ${orderClause} `;
      }

      // Limit the number of results
      if (limit) {
        query += "LIMIT ? ";
        values.push(parseInt(limit));
      }

      const rows = await pool.query(query, values);

      // Convert all BigInts to Ints
      rows.forEach((row) => {
        row.total_transactions = parseInt(row.total_transactions);
        row.total_item_quantity = parseInt(row.total_item_quantity);
      });

      res.status(200).json(rows);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}

export const runtime = 'edge';