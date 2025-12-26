document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("darkModeToggle");

  // 初始化：系統偏好 + LocalStorage 儲存
  const savedMode = localStorage.getItem("darkMode");
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedMode === "dark" || (!savedMode && systemPrefersDark)) {
    document.body.classList.add("dark-mode");
    toggleBtn.textContent = "☀️";
  } else {
    toggleBtn.textContent = "🌙";
  }

  // 點擊切換
  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    toggleBtn.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("darkMode", isDark ? "dark" : "light");
  });

  // 回到頂部
  const topBtn = document.getElementById("top");
  topBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});
