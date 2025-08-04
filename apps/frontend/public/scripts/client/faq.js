// faq.js
document.querySelectorAll(".accordion-header").forEach((button) => {
  button.addEventListener("click", () => {
    const parentItem = button.closest(".accordion-item");
    const content = parentItem.querySelector(".accordion-content");
    const isActive = parentItem.classList.contains("active");

    // Cerrar todos los items
    document.querySelectorAll(".accordion-item").forEach((item) => {
      item.classList.remove("active");
      item.querySelector(".accordion-content").style.maxHeight = "0";
    });

    // Abrir solo si no estaba activo
    if (!isActive) {
      parentItem.classList.add("active");
      content.style.maxHeight = `${content.scrollHeight}px`;
    }
  });
});