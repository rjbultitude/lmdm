const TOAST_ERROR_ID = "toast-error";
const TOAST_TEXT_ERROR_ID = "toast-error-text";
const ACTIVE = "active";

export function initToast() {
  const toastEl = document.createElement('aside');
  toastEl.className = 'toast-wrapper';
  toastEl.id = TOAST_ERROR_ID;
  // Text
  const toastText = document.createElement('p');
  toastText.id = TOAST_TEXT_ERROR_ID;
  // Close
  const toastClose = document.createElement('button');
  toastClose.id = "toast-close";
  toastClose.className = "dialog__close";
  toastClose.innerText = "Close";
  toastClose.addEventListener("click", function(e) {
    const toastWrapper = e.target.parentElement;
    toastWrapper.classList.remove(ACTIVE);
  });
  toastEl.insertAdjacentElement("afterbegin", toastText);
  toastEl.insertAdjacentElement("afterbegin", toastClose);
  document.body.insertAdjacentElement("beforeend", toastEl);
}

export function showToast(msg) {
  const toastEl = document.getElementById(TOAST_ERROR_ID);
  const toastText = document.getElementById(TOAST_TEXT_ERROR_ID);
  toastText.innerText = msg;
  toastEl.classList.add(ACTIVE);
}