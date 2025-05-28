document.getElementById("navbarToggle").addEventListener("click", function () {
  const nav = document.getElementById("mobileNavbarLinks");
  nav.classList.toggle("show");
});


document.addEventListener('DOMContentLoaded', () => {
  const weightForm = document.getElementById('weightForm');
  const weightInput = document.getElementById('weight');
  const entryDate = document.getElementById('entryDate');
  const weightList = document.getElementById('weightList');

  weightForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const weightValue = parseFloat(weightInput.value);
    const date = entryDate.value;

    if (!weightValue || !date) {
      alert('Please provide both date and weight.');
      return;
    }

    try {
      const res = await fetch('/api/weight-log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ weightValue })
      });

      const data = await res.json();
      if (res.ok) {
        alert(data.success);
        weightInput.value = '';
        entryDate.value = '';
        await loadWeightEntries(); 
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error('Error submitting weight:', err);
      alert('Failed to submit weight.');
    }
  });

  async function loadWeightEntries() {
    try {
      const res = await fetch('/api/weight-log');
      const data = await res.json();

      weightList.innerHTML = '';
      data.forEach(entry => {
        const li = document.createElement('li');
        const date = new Date(entry.DATE_RECORDED).toLocaleDateString();
        li.textContent = `${date}: ${entry.WEIGHT_VALUE} kg`;
        weightList.appendChild(li);
      });

    } catch (err) {
      console.error('Error loading entries:', err);
    }
  }

  loadWeightEntries();
});
