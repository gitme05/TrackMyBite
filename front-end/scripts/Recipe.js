const suggestions = [
  { name: "White Rice (Cooked)", cal: "205 cal, 1.0 cup" },
  { name: "Chicken breast, cooked, skinless", cal: "211 cal, 1.0 medium breast" },
  { name: "White rice, cooked", cal: "121 cal, 1.0 cup" },
  { name: "Boiled eggs", cal: "72 cal, 1.0 egg" },
];

window.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('suggestions');

  suggestions.forEach(item => {
    const div = document.createElement('div');
    div.className = 'food-item';
    div.innerHTML = `
      <div class="food-info">
        ${item.name}<br><small>${item.cal}</small>
      </div>
      <button>+</button>
    `;
    container.appendChild(div);
  });
});
