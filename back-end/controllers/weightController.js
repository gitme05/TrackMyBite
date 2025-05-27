const db = require('../db/db');

exports.addWeightEntry = (req, res) => {
  const { weightValue } = req.body;
  const userId = req.user.id;

  if (!weightValue) {
    return res.status(500).json({ error: 'Weight value is required.' });
  }

  db.query(
    `INSERT INTO WEIGHT_TRACKER (USER_ID, WEIGHT_VALUE) VALUES (?, ?)`,
    [userId, weightValue],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ success: 'Weight entry logged successfully!' });
    }
  );
};

exports.getWeightEntries = (req, res) => {
  const userId = req.user.id;

  db.query(
    `SELECT WEIGHT_VALUE, DATE_RECORDED FROM WEIGHT_TRACKER WHERE USER_ID = ? ORDER BY DATE_RECORDED ASC`,
    [userId],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json(results);
    }
  );
};
