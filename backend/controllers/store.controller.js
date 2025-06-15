const pool = require("../models/db");

exports.getStores = async (req, res) => {
  try {
    const { search } = req.query;
    const query = search
      ? `SELECT s.*, AVG(r.rating) as avg_rating
         FROM stores s
         LEFT JOIN ratings r ON s.id = r.store_id
         WHERE s.name ILIKE $1 OR s.address ILIKE $1
         GROUP BY s.id`
      : `SELECT s.*, AVG(r.rating) as avg_rating
         FROM stores s
         LEFT JOIN ratings r ON s.id = r.store_id
         GROUP BY s.id`;

    const values = search ? [`%${search}%`] : [];
    const result = await pool.query(query, values);

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addStore = async (req, res) => {
  const { name, email, address, owner_id } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO stores (name, email, address, owner_id) VALUES ($1, $2, $3, $4) RETURNING *`,
      [name, email, address, owner_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getStoreById = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await pool.query(
      `SELECT s.*, AVG(r.rating) as avg_rating
       FROM stores s
       LEFT JOIN ratings r ON s.id = r.store_id
       WHERE s.id = $1
       GROUP BY s.id`,
      [id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
