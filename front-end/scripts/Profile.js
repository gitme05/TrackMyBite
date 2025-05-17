document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.getElementById('sidebar');
  const sidebarToggle = document.getElementById('sidebarToggle');
  const editInfoBtn = document.getElementById('editInfoBtn');
  const submenu = document.getElementById('editInfoSubmenu');

  sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
  });

  editInfoBtn.addEventListener('click', () => {
    submenu.classList.toggle('active');
    editInfoBtn.querySelector('.arrow').textContent = submenu.classList.contains('active') ? '▼' : '▶';
  });
});

function logout() {
  alert("Logging out...");
  window.location.href = "/front-end/views/Login.html";
}
