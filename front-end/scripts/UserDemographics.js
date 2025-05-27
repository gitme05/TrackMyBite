document.getElementById('demoForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = {
    first_name: document.getElementById('firstName').value.trim(),
    last_name: document.getElementById('lastName').value.trim(),
    sex: document.getElementById('sex').value,
    age: Number(document.getElementById('age').value),
    current_weight: Number(document.getElementById('weight').value),
    current_height: Number(document.getElementById('height').value),
  };

  try {
    const response = await fetch('/api/user-demographics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errData = await response.json();
      alert(errData.error || 'Failed to save demographics');
      return;
    }

    alert('Demographics saved successfully!');
    window.location.href = '/user-preferences'; 
  } catch (error) {
    alert('Error: ' + error.message);
  }
});