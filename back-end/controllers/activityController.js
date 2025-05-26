const db = require('../db/db');

exports.addActivity = (req, res) => {
  const userId = req.user.id;
  const { activityType, caloriesBurned, activityDate, durationMinutes } = req.body;

  if (!activityType || !caloriesBurned || !activityDate || !durationMinutes) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const query = `
    INSERT INTO USER_ACTIVITY_LOG (USER_ID, ACTIVITY_TYPE, CALORIES_BURNED, ACTIVITY_DATE, DURATION_MINUTES)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [userId, activityType, caloriesBurned, activityDate, durationMinutes],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: 'Activity logged successfully.' });
    }
  );
};

exports.getActivities = (req, res) => {
  const userId = req.user.id;

  const query = `
    SELECT ACTIVITY_TYPE, CALORIES_BURNED, ACTIVITY_DATE, DURATION_MINUTES
    FROM USER_ACTIVITY_LOG
    WHERE USER_ID = ?
    ORDER BY ACTIVITY_DATE DESC
    LIMIT 10
  `;

  db.query(query, [userId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};
