document.getElementById("navbarToggle").addEventListener("click", function () {
  const nav = document.getElementById("mobileNavbarLinks");
  nav.classList.toggle("show");
});


document.getElementById("recipeSearch").addEventListener("input", function () {
  const filter = this.value.toLowerCase();
  const recipes = document.querySelectorAll("#recipeList li");

  recipes.forEach(recipe => {
    const text = recipe.textContent.toLowerCase();
    recipe.style.display = text.includes(filter) ? "" : "none";
  });
});
