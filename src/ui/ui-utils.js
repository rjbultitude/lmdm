const ACTIVE = "active";

export function hideToastEl(e) {
  const closeBtn = e?.target ?? document.getElementById("toast-close");
  console.debug("closeBtn", closeBtn);
  if (!closeBtn) {
    console.debug("mo closeBtn");
    return;
  }
  const toastEl = closeBtn.parentElement;
  toastEl.classList.remove(ACTIVE);
}

export function showToastEl({ elID, txtID, msg }) {
  const toastEl = document.getElementById(elID);
  if (msg) {
    const toastText = document.getElementById(txtID);
    toastText.innerText = msg;
  }
  toastEl.classList.add(ACTIVE);
}