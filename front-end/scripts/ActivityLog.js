document.getElementById('activity-form').addEventListener('submit', function(e) {
    e.preventDefault();
  
    const date = document.getElementById('activity-date').value;
    const type = document.getElementById('activity-type').value;
    const duration = document.getElementById('duration').value;
    const calories = document.getElementById('calories-burned').value;
  
    const activityItem = document.createElement('li');
    activityItem.textContent = `${date}: ${type} for ${duration} minutes, burned ${calories} calories.`;
  
    document.querySelector('#activity-list ul').appendChild(activityItem);
  
    this.reset();
  });
  