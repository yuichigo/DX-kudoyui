// =============================
// 共通処理
// =============================

document.addEventListener("DOMContentLoaded", () => {
  console.log("アプリが起動しました。");

  highlightCurrentPage();
});

// =============================
// 現在開いているページの
// ナビゲーションを強調表示
// =============================

function highlightCurrentPage() {
  const currentPage = window.location.pathname.split("/").pop();

  const links = document.querySelectorAll("nav a");

  links.forEach((link) => {
    const href = link.getAttribute("href");

    if (href.endsWith(currentPage)) {
      link.classList.add("active");
    }
  });
}
