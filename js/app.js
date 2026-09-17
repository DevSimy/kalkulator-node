const calculatorPages = {
  "harga-jual": "harga-jual.html",
  "harga-satuan": "harga-satuan.html",
  "hitung-untung": "harga-untung.html",
  diskon: "diskon.html",
};

document.querySelectorAll("[data-calculator]").forEach((card) => {
  const page = calculatorPages[card.dataset.calculator];

  if (page) {
    card.addEventListener("click", () => {
      window.location.href = page;
    });
  }
});
