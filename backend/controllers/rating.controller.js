const pool = require("../models/db");

exports.submitOrUpdateRating = async (req, res) => {
  const { store_id, rating } = req.body;
  const user_id = req.user.userId;

  if (rating < 1 || rating > 5) {
    return res.status(400).json({ message: "Rating must be between 1 and 5" });
  }

  try {
    const existing = await pool.query(
      `SELECT * FROM ratings WHERE user_id = $1 AND store_id = $2`,
      [user_id, store_id]
    );

    if (existing.rows.length > 0) {
      await pool.query(
        `UPDATE ratings SET rating = $1 WHERE user_id = $2 AND store_id = $3`,
        [rating, user_id, store_id]
      );
      res.json({ message: "Rating updated" });
    } else {
      await pool.query(
        `INSERT INTO ratings (user_id, store_id, rating) VALUES ($1, $2, $3)`,
        [user_id, store_id, rating]
      );
      res.status(201).json({ message: "Rating submitted" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getRatingsForStore = async (req, res) => {
  const { storeId } = req.params;
  try {
    const result = await pool.query(
      `SELECT r.*, u.name AS user_name FROM ratings r
       JOIN users u ON u.id = r.user_id
       WHERE r.store_id = $1`,
      [storeId]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
