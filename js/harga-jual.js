const modalInput = document.getElementById("modal");
const jumlahInput = document.getElementById("jumlah");
const keuntunganInput = document.getElementById("keuntungan");
const pembulatanInput = document.getElementById("pembulatan");
const calculateButton = document.getElementById("calculate-selling-price");
const resultCard = document.querySelector(".result-card");
const sellingPriceResult = document.getElementById("selling-price-result");

function clearErrors() {
  document.querySelectorAll(".input-error").forEach((error) => {
    error.textContent = "";
  });

  document.querySelectorAll(".input-wrapper.has-error").forEach((wrapper) => {
    wrapper.classList.remove("has-error");
  });

  [modalInput, jumlahInput, keuntunganInput].forEach((input) => {
    input.setAttribute("aria-invalid", "false");
  });
}

function calculateSellingPrice() {
  const modal = parseNumberInput(modalInput.value);
  const jumlah = Number(jumlahInput.value);
  const targetProfitValue = keuntunganInput.value.trim();
  const targetProfit = Number(targetProfitValue);
  const pembulatan = Number(pembulatanInput.value);

  clearErrors();
  resultCard.hidden = true;

  if (!Number.isFinite(modal) || !modal || modal <= 0) {
    showError(modalInput, "modal-error", "Masukkan harga modal yang valid.");
    modalInput.focus();
    return;
  }

  if (!Number.isFinite(jumlah) || !jumlah || jumlah <= 0) {
    showError(jumlahInput, "jumlah-error", "Jumlah barang harus lebih dari 0.");
    jumlahInput.focus();
    return;
  }

  if (!targetProfitValue) {
    showError(
      keuntunganInput,
      "keuntungan-error",
      "Masukkan target keuntungan yang valid.",
    );
    keuntunganInput.focus();
    return;
  }

  if (!Number.isFinite(targetProfit) || targetProfit < 0) {
    showError(
      keuntunganInput,
      "keuntungan-error",
      "Target keuntungan tidak boleh negatif.",
    );
    keuntunganInput.focus();
    return;
  }

  const modalPerPcs = modal / jumlah;
  const profitPerPcs = modalPerPcs * (targetProfit / 100);
  let sellingPrice = modalPerPcs + profitPerPcs;

  if (pembulatan > 0) {
    sellingPrice = Math.ceil(sellingPrice / pembulatan) * pembulatan;
  }

  const actualProfitPerPcs = sellingPrice - modalPerPcs;
  const totalProfit = actualProfitPerPcs * jumlah;
  const markup = modalPerPcs > 0 ? (actualProfitPerPcs / modalPerPcs) * 100 : 0;
  const margin =
    sellingPrice > 0 ? (actualProfitPerPcs / sellingPrice) * 100 : 0;

  resultCard.hidden = false;
  sellingPriceResult.textContent = formatRupiah(sellingPrice);

  const resultModal = document.getElementById("result-modal");
  const resultProfit = document.getElementById("result-profit");
  const resultTotalProfit = document.getElementById("result-total-profit");
  const resultMarkup = document.getElementById("result-markup");
  const resultMargin = document.getElementById("result-margin");

  if (resultModal) resultModal.textContent = formatRupiah(modalPerPcs);
  if (resultProfit) resultProfit.textContent = formatRupiah(actualProfitPerPcs);
  if (resultTotalProfit)
    resultTotalProfit.textContent = formatRupiah(totalProfit);
  if (resultMarkup)
    resultMarkup.textContent = `Markup ${formatPercent(markup)}`;
  if (resultMargin)
    resultMargin.textContent = `Margin ${formatPercent(margin)}`;

  resultCard.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

modalInput.addEventListener("input", () => {
  modalInput.value = formatNumberInput(modalInput.value);
});

calculateButton.addEventListener("click", calculateSellingPrice);
