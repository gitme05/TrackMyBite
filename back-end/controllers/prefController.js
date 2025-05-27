const db = require('../db/db');

exports.saveUserPreferences = (req, res) => {
  const userId = req.user.id;
  const { dietary, calorieGoal, weightGoal, goalType, targetDate } = req.body;

  if (!calorieGoal) return res.status(400).json({ error: 'Calorie goal is required.' });

  const dietaryStr = Array.isArray(dietary) ? dietary.join(',') : '';

  const sql = `
    INSERT INTO USER_PREFERENCES
      (USER_ID, DAILY_CALORIE_GOAL, DIETARY_RESTRICTIONS, WEIGHT_GOAL, GOAL_TYPE, TARGET_DATE)
    VALUES (?, ?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
      DAILY_CALORIE_GOAL = VALUES(DAILY_CALORIE_GOAL),
      DIETARY_RESTRICTIONS = VALUES(DIETARY_RESTRICTIONS),
      WEIGHT_GOAL = VALUES(WEIGHT_GOAL),
      GOAL_TYPE = VALUES(GOAL_TYPE),
      TARGET_DATE = VALUES(TARGET_DATE)
  `;

  db.query(sql, [userId, calorieGoal, dietaryStr, weightGoal, goalType, targetDate], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Preferences saved successfully' });
  });
};

exports.getUserPreferences = (req, res) => {
  const userId = req.user.id;
  db.query('SELECT * FROM USER_PREFERENCES WHERE USER_ID = ?', [userId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: 'Preferences not found' });

    const row = results[0];
    const preferences = {
      dietary: row.DIETARY_RESTRICTIONS ? row.DIETARY_RESTRICTIONS.split(',') : [],
      calorieGoal: row.DAILY_CALORIE_GOAL,
      weightGoal: row.WEIGHT_GOAL,
      goalType: row.GOAL_TYPE,
      targetDate: row.TARGET_DATE,
    };
    res.json(preferences);
  });
};
