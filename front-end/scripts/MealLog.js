// ----- Meal Log -----

const foodInput = document.getElementById('foodInput');
const portionInput = document.getElementById('portionInput');
const caloriesOutput = document.getElementById('caloriesOutput');
const mealForm = document.getElementById('mealForm');
const mealList = document.getElementById('mealList');

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

// Auto-fill calories per 1 portion
foodInput.addEventListener('input', () => {
  const food = foodInput.value.toLowerCase().trim();
  caloriesOutput.value = foodCalories[food] || '';
});

// Add meal to log
mealForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const food = foodInput.value.trim().toLowerCase();
  const portion = parseFloat(portionInput.value.trim());
  const baseCalories = foodCalories[food];

  if (!food || !baseCalories || isNaN(portion) || portion <= 0) {
    alert("Please enter a valid food and portion size.");
    return;
  }

  const totalCalories = baseCalories * portion;
  const listItem = document.createElement('li');
  listItem.textContent = `${food} x ${portion} = ${totalCalories} kcal`;
  mealList.appendChild(listItem);

  // Reset inputs
  foodInput.value = '';
  portionInput.value = '';
  caloriesOutput.value = '';
});


// ----- My Recipe Functionality -----

const recipeForm = document.getElementById('recipeForm');
const recipeName = document.getElementById('recipeName');
const ingredientSelect = document.getElementById('ingredientSelect');
const portionSizeInput = document.getElementById('portionSize');
const addIngredientBtn = document.getElementById('addIngredient');
const ingredientList = document.getElementById('ingredientList');
const totalCaloriesSpan = document.getElementById('totalCalories');
const recipeList = document.getElementById('recipeList');

let currentIngredients = [];
let currentTotalCalories = 0;

// Populate dropdown
Object.keys(foodCalories).forEach(food => {
  const option = document.createElement('option');
  option.value = food;
  option.textContent = `${food} - ${foodCalories[food]} kcal`;
  ingredientSelect.appendChild(option);
});

// Add ingredient to current recipe
addIngredientBtn.addEventListener('click', () => {
  const ingredient = ingredientSelect.value;
  const portion = parseFloat(portionSizeInput.value.trim());

  if (!ingredient || isNaN(portion) || portion <= 0) {
    alert("Please select an ingredient and enter a valid portion size.");
    return;
  }

  const calories = foodCalories[ingredient] * portion;
  currentIngredients.push(`${ingredient} x ${portion}`);
  currentTotalCalories += calories;

  const li = document.createElement('li');
  li.textContent = `${ingredient} x ${portion} = ${calories} kcal`;
  ingredientList.appendChild(li);

  totalCaloriesSpan.textContent = currentTotalCalories;
  portionSizeInput.value = '';
});

// Save recipe
recipeForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = recipeName.value.trim();
  if (!name || currentIngredients.length === 0) {
    alert("Please enter a recipe name and at least one ingredient.");
    return;
  }

  const li = document.createElement('li');
  li.textContent = `${name} - ${currentTotalCalories} kcal (Ingredients: ${currentIngredients.join(', ')})`;
  recipeList.appendChild(li);

  // Reset form
  recipeName.value = '';
  ingredientList.innerHTML = '';
  totalCaloriesSpan.textContent = '0';
  currentIngredients = [];
  currentTotalCalories = 0;
});
