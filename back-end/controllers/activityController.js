const db = require('../db/db');

exports.addActivity = (req, res) => {
  const { activityType, caloriesBurned, activityDate, duration } = req.body;
  const userId = req.user.id; 

  if (!activityType || !caloriesBurned || !activityDate || !duration) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  db.query(
    `INSERT INTO USER_ACTIVITY_LOG 
      (USER_ID, ACTIVITY_TYPE, CALORIES_BURNED, ACTIVITY_DATE, DURATION_MINUTES) 
     VALUES (?, ?, ?, ?, ?)`,
    [userId, activityType, caloriesBurned, activityDate, duration],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ success: 'Activity logged!' });
    }
  );
};
