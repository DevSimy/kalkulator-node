const modalProfitInput = document.getElementById("modal-untung");
const sellingProfitInput = document.getElementById("jual-untung");
const quantityProfitInput = document.getElementById("jumlah-untung");
const calculateProfitButton = document.getElementById("calculate-profit");
const profitResultCard = document.querySelector(".result-card");
const profitResult = document.getElementById("profit-result");
const resultProfitPerUnit = document.getElementById("result-profit-per-unit");
const resultProfitCount = document.getElementById("result-profit-count");
const resultProfitModal = document.getElementById("result-profit-modal");
const resultProfitSelling = document.getElementById("result-profit-selling");
const profitMarkup = document.getElementById("profit-markup");
const profitMargin = document.getElementById("profit-margin");

function clearProfitErrors() {
  ["modal-untung-error", "jual-untung-error", "jumlah-untung-error"].forEach(
    (id) => {
      const error = document.getElementById(id);
      if (error) error.textContent = "";
    },
  );

  [modalProfitInput, sellingProfitInput, quantityProfitInput].forEach(
    (input) => {
      input.closest(".input-wrapper")?.classList.remove("has-error");
      input.setAttribute("aria-invalid", "false");
    },
  );
}

function calculateProfit() {
  const modal = parseNumberInput(modalProfitInput.value);
  const sellingPrice = parseNumberInput(sellingProfitInput.value);
  const quantity = Number(quantityProfitInput.value);

  clearProfitErrors();
  profitResultCard.hidden = true;

  if (!Number.isFinite(modal) || !modal || modal <= 0) {
    showError(
      modalProfitInput,
      "modal-untung-error",
      "Masukkan harga modal yang valid.",
    );
    modalProfitInput.focus();
    return;
  }

  if (!Number.isFinite(sellingPrice) || !sellingPrice || sellingPrice <= 0) {
    showError(
      sellingProfitInput,
      "jual-untung-error",
      "Masukkan harga jual yang valid.",
    );
    sellingProfitInput.focus();
    return;
  }

  if (!Number.isFinite(quantity) || !quantity || quantity <= 0) {
    showError(
      quantityProfitInput,
      "jumlah-untung-error",
      "Jumlah terjual harus lebih dari 0.",
    );
    quantityProfitInput.focus();
    return;
  }

  const profitPerUnit = sellingPrice - modal;
  const totalProfit = profitPerUnit * quantity;
  const markup = (profitPerUnit / modal) * 100;
  const margin = sellingPrice > 0 ? (profitPerUnit / sellingPrice) * 100 : 0;

  profitResultCard.hidden = false;
  profitResult.textContent = formatRupiah(totalProfit);
  resultProfitPerUnit.textContent = formatRupiah(profitPerUnit);
  resultProfitCount.textContent = `${quantity.toLocaleString("id-ID")} pcs`;
  resultProfitModal.textContent = formatRupiah(modal);
  resultProfitSelling.textContent = formatRupiah(sellingPrice);
  profitMarkup.textContent = `Markup ${formatPercent(markup)}`;
  profitMargin.textContent = `Margin ${formatPercent(margin)}`;

  profitResultCard.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

[modalProfitInput, sellingProfitInput].forEach((input) => {
  input.addEventListener("input", () => {
    input.value = formatNumberInput(input.value);
  });
});

calculateProfitButton.addEventListener("click", calculateProfit);
