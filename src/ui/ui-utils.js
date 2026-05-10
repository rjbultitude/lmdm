const ACTIVE = "active";

export function hideToastEl(e, id) {
  let closeBtn;
  if (!!id) {
    closeBtn = document.getElementById(id);
  } else {
    closeBtn = e?.target;
  }
  const toastEl = closeBtn.parentElement;
  console.debug("close", closeBtn);
  console.debug("toastEl", toastEl);
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