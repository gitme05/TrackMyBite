const foodInput = document.getElementById('foodInput');
const caloriesOutput = document.getElementById('caloriesOutput');
const mealForm = document.getElementById('mealForm');
const mealList = document.getElementById('mealList');

// Sample food-calorie database
const foodCalories = {
  'oatmeal': 150,
  'banana': 90,
  'apple': 80,
  'chicken salad': 420,
  'fruit smoothie': 200,
  'egg': 70,
  'rice': 200,
  'toast': 100
};

foodInput.addEventListener('input', () => {
  const food = foodInput.value.toLowerCase().trim();
  caloriesOutput.value = foodCalories[food] || '';
});

mealForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const food = foodInput.value.trim();
  const calories = caloriesOutput.value.trim();

  if (!food || !calories) {
    alert("Please enter a valid food from the list.");
    return;
  }

  const listItem = document.createElement('li');
  listItem.textContent = `${food} - ${calories} kcal`;
  mealList.appendChild(listItem);

  foodInput.value = '';
  caloriesOutput.value = '';
});
