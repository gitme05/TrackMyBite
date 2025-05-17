document.getElementById("recipeSearch").addEventListener("input", function () {
  const filter = this.value.toLowerCase();
  const recipes = document.querySelectorAll("#recipeList li");

  recipes.forEach(recipe => {
    const text = recipe.textContent.toLowerCase();
    recipe.style.display = text.includes(filter) ? "" : "none";
  });
});
