document.getElementById("navbarToggle").addEventListener("click", function () {
  document.getElementById("mobileNavbarLinks").classList.toggle("show");
});


document.getElementById("weightForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const date = document.getElementById("entryDate").value;
    const weight = document.getElementById("weight").value;
  
    if (date && weight) {
      const entry = document.createElement("li");
      entry.innerHTML = `${date} - ${weight} kg`;
  
      document.getElementById("weightList").appendChild(entry);
  
      document.getElementById("entryDate").value = "";
      document.getElementById("weight").value = "";
    }
  });
  