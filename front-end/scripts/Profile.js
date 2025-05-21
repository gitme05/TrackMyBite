document.addEventListener('DOMContentLoaded', function () {
  const sidebar = document.getElementById('sidebar');
  const sidebarToggle = document.getElementById('sidebarToggle');
  const editInfoBtn = document.getElementById('editInfoBtn');
  const editInfoSubmenu = document.getElementById('editInfoSubmenu');

  if (sidebarToggle) {
    sidebarToggle.addEventListener('click', () => {
      sidebar.classList.toggle('collapsed');
    });
  }

  if (editInfoBtn && editInfoSubmenu) {
    editInfoBtn.addEventListener('click', () => {
      editInfoSubmenu.classList.toggle('show');
    });
  }

  // Optional: Logout function
  window.logout = function () {
    fetch("/logout", {
      method: "POST"
    }).then(() => {
      window.location.href = "/login";
    });
  };
});
