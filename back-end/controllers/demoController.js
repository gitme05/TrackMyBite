const db = require('../db/db');

exports.saveUserDemographics = (req, res) => {
  const { first_name, last_name, sex, age, current_weight, current_height } = req.body;
  const userId = req.user.id; 

  if (!first_name || !last_name || !sex || !age || !current_weight || !current_height) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const sql = `
    INSERT INTO USER_DEMOGRAPHICS
      (FIRST_NAME, LAST_NAME, SEX, AGE, CURRENT_WEIGHT, CURRENT_HEIGHT, USER_ID)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
      FIRST_NAME = VALUES(FIRST_NAME),
      LAST_NAME = VALUES(LAST_NAME),
      SEX = VALUES(SEX),
      AGE = VALUES(AGE),
      CURRENT_WEIGHT = VALUES(CURRENT_WEIGHT),
      CURRENT_HEIGHT = VALUES(CURRENT_HEIGHT)
  `;

  db.query(
    sql,
    [first_name, last_name, sex, age, current_weight, current_height, userId],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Demographics saved successfully' });
    }
  );
};

exports.getUserDemographics = (req, res) => {
  const userId = req.user.id;
  db.query('SELECT * FROM USER_DEMOGRAPHICS WHERE USER_ID = ?', [userId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: 'Demographics not found' });

    const row = results[0];
    const demographics = {
      first_name: row.FIRST_NAME,
      last_name: row.LAST_NAME,
      sex: row.SEX,
      age: row.AGE,
      current_weight: row.CURRENT_WEIGHT,
      current_height: row.CURRENT_HEIGHT,
    };
    res.json(demographics);
  });
};
