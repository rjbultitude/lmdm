const TOAST_ERROR_ID = "toast-error";
const ACTIVE = "active";

export function initToast() {
  const toastEl = document.createElement('aside');
  toastEl.className = 'toast-wrapper';
  toastEl.id = TOAST_ERROR_ID;
  const toastClose = document.createElement('button');
  toastClose.id = "toast-close";
  toastClose.innerText = "Close";
  toastClose.addEventListener("click", function(e) {
    const toastWrapper = e.target.parentElement;
    toastWrapper.classList.remove(ACTIVE);
  });
  toastEl.insertAdjacentElement("beforeend", toastClose);
  document.body.insertAdjacentElement("beforeend", toastEl);
}

export function showToast(msg) {
  const toast = document.getElementById('error-toast');
  toast.innerText(msg);
}