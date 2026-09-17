const totalPriceInput = document.getElementById("harga-total");
const unitCountInput = document.getElementById("jumlah-satuan");
const unitInput = document.getElementById("satuan");
const calculateUnitPriceButton = document.getElementById(
  "calculate-unit-price",
);
const unitPriceResult = document.getElementById("unit-price-result");
const resultTotalPrice = document.getElementById("result-total-price");
const resultUnitCount = document.getElementById("result-unit-count");
const unitResultCard = document.querySelector(".result-card");

function clearUnitPriceErrors() {
  ["harga-total-error", "jumlah-satuan-error"].forEach((id) => {
    const error = document.getElementById(id);
    if (error) error.textContent = "";
  });

  [totalPriceInput, unitCountInput].forEach((input) => {
    input.closest(".input-wrapper")?.classList.remove("has-error");
    input.setAttribute("aria-invalid", "false");
  });
}

function calculateUnitPrice() {
  const totalPrice = parseNumberInput(totalPriceInput.value);
  const unitCount = Number(unitCountInput.value);
  const unit = unitInput.value;

  clearUnitPriceErrors();
  unitResultCard.hidden = true;

  if (!Number.isFinite(totalPrice) || !totalPrice || totalPrice <= 0) {
    showError(
      totalPriceInput,
      "harga-total-error",
      "Masukkan harga total yang valid.",
    );
    totalPriceInput.focus();
    return;
  }

  if (!Number.isFinite(unitCount) || !unitCount || unitCount <= 0) {
    showError(
      unitCountInput,
      "jumlah-satuan-error",
      "Jumlah barang harus lebih dari 0.",
    );
    unitCountInput.focus();
    return;
  }

  const unitPrice = totalPrice / unitCount;

  unitResultCard.hidden = false;
  unitPriceResult.textContent = formatRupiah(unitPrice);
  resultTotalPrice.textContent = formatRupiah(totalPrice);
  resultUnitCount.textContent = `${unitCount.toLocaleString("id-ID")} ${unit}`;

  unitResultCard.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

totalPriceInput.addEventListener("input", () => {
  totalPriceInput.value = formatNumberInput(totalPriceInput.value);
});

calculateUnitPriceButton.addEventListener("click", calculateUnitPrice);
