document.addEventListener('DOMContentLoaded', () => {
  fetch('/api/user-preferences')
    .then(res => {
      if (!res.ok) throw new Error('Failed to load');
      return res.json();
    })
    .then(data => {
      if (data.dietary) {
        data.dietary.forEach(pref => {
          const checkbox = document.querySelector(`input[name="preference"][value="${pref}"]`);
          if (checkbox) checkbox.checked = true;
        });
      }
      if (data.calorieGoal) document.querySelector('input[name="calorieGoal"]').value = data.calorieGoal;
      if (data.weightGoal) document.querySelector('input[name="weightGoal"]').value = data.weightGoal;
      if (data.goalType) document.querySelector('select[name="goalType"]').value = data.goalType;
      if (data.targetDate) document.querySelector('input[name="targetDate"]').value = data.targetDate;

      updateDisplay(data); 
    })
    .catch(err => console.error('Could not load preferences:', err));
});

document.getElementById('preferencesForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const form = new FormData(e.target);
  const preferences = {
    dietary: form.getAll('preference'),
    calorieGoal: form.get('calorieGoal'),
    weightGoal: form.get('weightGoal'),
    goalType: form.get('goalType'),
    targetDate: form.get('targetDate')
  };

  try {
    const response = await fetch('/api/user-preferences', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(preferences),
    });

    if (!response.ok) throw new Error('Failed to save');
    const savedData = await response.json();
    alert(savedData.message);

    window.location.href = '/main';

  } catch (err) {
    alert('Error saving preferences');
    console.error(err);
  }
});

function updateDisplay(data) {
  const ul = document.getElementById('savedPreferences');
  ul.innerHTML = `
    <li><strong>Dietary:</strong> ${data.dietary.join(', ') || 'None'}</li>
    <li><strong>Calorie Goal:</strong> ${data.calorieGoal}</li>
    <li><strong>Weight Goal:</strong> ${data.weightGoal}</li>
    <li><strong>Goal Type:</strong> ${data.goalType}</li>
    <li><strong>Target Date:</strong> ${data.targetDate || 'Not set'}</li>
  `;
}
