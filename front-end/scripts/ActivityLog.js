document.getElementById("navbarToggle").addEventListener("click", function () {
  const nav = document.getElementById("mobileNavbarLinks");
  nav.classList.toggle("show");
});


document.addEventListener('DOMContentLoaded', () => {
  const activityForm = document.getElementById('activity-form');
  const activityList = document.querySelector('#activity-list ul');

  fetchActivities();

  activityForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const activityDate = document.getElementById('activity-date').value;
    const activityType = document.getElementById('activity-type').value.trim();
    const duration = parseInt(document.getElementById('duration').value, 10);
    const caloriesBurned = parseInt(document.getElementById('calories-burned').value, 10);

    if (!activityDate || !activityType || !duration || !caloriesBurned) {
      alert('Please fill in all fields correctly.');
      return;
    }

    try {
      const res = await fetch('/api/activity-log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          activityDate,
          activityType,
          durationMinutes: duration,
          caloriesBurned,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || 'Failed to add activity');
        return;
      }

      alert(data.message || 'Activity added!');
      activityForm.reset();
      fetchActivities();
    } catch (err) {
      alert('Error adding activity.');
      console.error(err);
    }
  });

  async function fetchActivities() {
    try {
      const res = await fetch('/api/activity-log');
      const activities = await res.json();

      activityList.innerHTML = '';

      if (activities.length === 0) {
        activityList.innerHTML = '<li>No activities logged yet.</li>';
        return;
      }

      activities.forEach(({ ACTIVITY_DATE, ACTIVITY_TYPE, DURATION_MINUTES, CALORIES_BURNED }) => {
        const li = document.createElement('li');
        li.textContent = `${new Date(ACTIVITY_DATE).toLocaleDateString()}: ${ACTIVITY_TYPE} — Duration: ${DURATION_MINUTES} min, Calories: ${CALORIES_BURNED}`;
        activityList.appendChild(li);
      });
    } catch (err) {
      activityList.innerHTML = '<li>Error loading activities.</li>';
      console.error(err);
    }
  }
});
