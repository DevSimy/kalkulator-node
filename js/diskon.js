// ========================================
// KALKULATOR DISKON — Step 12C
// ========================================

const originalPriceInput = document.getElementById("harga-awal");
const discountInput = document.getElementById("diskon");

const calculateDiscountButton = document.getElementById("calculate-discount");

const discountResultCard = document.querySelector(".result-card");

const discountResult = document.getElementById("discount-result");

const resultOriginalPrice = document.getElementById("result-original-price");

const resultDiscountAmount = document.getElementById("result-discount-amount");

const resultDiscountPercent = document.getElementById(
  "result-discount-percent",
);

function calculateDiscount() {
  const originalPrice = parseNumberInput(originalPriceInput.value);

  const discountValue = discountInput.value.trim();
  const discount = Number(discountValue);

  clearDiscountErrors();
  discountResultCard.hidden = true;

  if (!Number.isFinite(originalPrice) || !originalPrice || originalPrice <= 0) {
    showError(
      originalPriceInput,
      "harga-awal-error",
      "Masukkan harga awal yang valid.",
    );
    originalPriceInput.focus();
    return;
  }

  if (discountValue === "" || !Number.isFinite(discount)) {
    showError(discountInput, "diskon-error", "Masukkan persentase diskon.");
    discountInput.focus();
    return;
  }

  if (discount < 0) {
    showError(
      discountInput,
      "diskon-error",
      "Diskon tidak boleh kurang dari 0%.",
    );
    discountInput.focus();
    return;
  }

  if (discount > 100) {
    showError(
      discountInput,
      "diskon-error",
      "Diskon tidak boleh lebih dari 100%.",
    );
    discountInput.focus();
    return;
  }

  const discountAmount = originalPrice * (discount / 100);

  const finalPrice = originalPrice - discountAmount;

  discountResultCard.hidden = false;

  discountResult.textContent = formatRupiah(finalPrice);

  resultOriginalPrice.textContent = formatRupiah(originalPrice);

  resultDiscountAmount.textContent = formatRupiah(discountAmount);

  resultDiscountPercent.textContent = `${discount}%`;

  discountResultCard.scrollIntoView({
    behavior: "smooth",
    block: "nearest",
  });
}

function clearDiscountErrors() {
  const errorIds = ["harga-awal-error", "diskon-error"];

  errorIds.forEach((id) => {
    const error = document.getElementById(id);

    if (error) {
      error.textContent = "";
    }
  });

  [originalPriceInput, discountInput].forEach((input) => {
    if (input) {
      input.closest(".input-wrapper")?.classList.remove("has-error");
      input.setAttribute("aria-invalid", "false");
    }
  });
}

if (originalPriceInput) {
  originalPriceInput.addEventListener("input", () => {
    originalPriceInput.value = formatNumberInput(originalPriceInput.value);
  });
}

if (calculateDiscountButton) {
  calculateDiscountButton.addEventListener("click", calculateDiscount);
}
