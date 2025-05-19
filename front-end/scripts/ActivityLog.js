// Toggle mobile navbar
document.getElementById("navbarToggle").addEventListener("click", function () {
  document.getElementById("mobileNavbarLinks").classList.toggle("show");
});

// Activity form handler
document.getElementById('activity-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const date = document.getElementById('activity-date').value;
  const type = document.getElementById('activity-type').value.trim();
  const duration = document.getElementById('duration').value;
  const calories = document.getElementById('calories-burned').value;

  if (!date || !type || !duration || !calories) return;

  const activityItem = document.createElement('li');
  activityItem.textContent = `${date}: ${type} for ${duration} minutes, burned ${calories} calories.`;
  document.querySelector('#activity-list ul').appendChild(activityItem);
  this.reset();
});
