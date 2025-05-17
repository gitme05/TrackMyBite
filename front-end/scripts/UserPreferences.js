document.getElementById('preferencesForm').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const form = new FormData(e.target);
  
    const preferences = {
      dietary: [],
      calorieGoal: form.get('calorieGoal'),
      weightGoal: form.get('weightGoal'),
      goalType: form.get('goalType'),
      targetDate: form.get('targetDate')
    };
  
    form.getAll('preference').forEach(pref => {
      preferences.dietary.push(pref);
    });
  
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
  
    displaySavedPreferences(preferences);
  });
  
  function displaySavedPreferences(preferences) {
    const ul = document.getElementById('savedPreferences');
    ul.innerHTML = `
      <li><strong>Dietary Preferences:</strong> ${preferences.dietary.join(', ')}</li>
      <li><strong>Daily Calorie Goal:</strong> ${preferences.calorieGoal} kcal</li>
      <li><strong>Weight Goal:</strong> ${preferences.weightGoal} kg</li>
      <li><strong>Goal Type:</strong> ${preferences.goalType}</li>
      <li><strong>Target Date:</strong> ${preferences.targetDate}</li>
    `;
  }
  
  const saved = localStorage.getItem('userPreferences');
  if (saved) {
    displaySavedPreferences(JSON.parse(saved));
  }
  