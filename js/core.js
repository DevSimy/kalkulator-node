function formatNumberInput(value) {
  const input = String(value).trim();
  const isNegative = input.startsWith("-");
  const number = value.replace(/\D/g, "");

  if (!number) return isNegative ? "-" : "";

  const formatted = Number(number).toLocaleString("id-ID");
  return isNegative ? `-${formatted}` : formatted;
}

function parseNumberInput(value) {
  const input = String(value).trim();
  const isNegative = input.startsWith("-");
  const number = input.replace(/\./g, "").replace(/\D/g, "");

  if (!number) return 0;

  const parsed = Number(number);
  return isNegative ? -parsed : parsed;
}

function formatRupiah(number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(number);
}

function formatPercent(number) {
  return (
    new Intl.NumberFormat("id-ID", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 1,
    }).format(number) + "%"
  );
}

function showError(input, errorId, message) {
  const errorElement = document.getElementById(errorId);
  const wrapper = input.closest(".input-wrapper");

  input.setAttribute("aria-invalid", "true");

  if (errorElement) {
    errorElement.textContent = message;
  }

  if (wrapper) {
    wrapper.classList.add("has-error");
  }
}
