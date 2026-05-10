import { showToastEl, hideToastEl } from "./ui-utils.js";

export const ERROR_TOAST_CLOSE_BTN_ID = "error-toast-close";
export const ERROR_TOAST_ID = "toast-error";
export const ERROR_TOAST_TEXT_ID = "toast-error-text";
const ACTIVE = "active";

export function initErrorToast() {
  const errorToastEl = document.createElement('aside');
  errorToastEl.className = 'toast-wrapper';
  errorToastEl.id = ERROR_TOAST_ID;
  // Text
  const errorToastText = document.createElement('p');
  errorToastText.id = ERROR_TOAST_TEXT_ID;
  // Close
  const errorToastClose = document.createElement('button');
  errorToastClose.id = ERROR_TOAST_CLOSE_BTN_ID;
  errorToastClose.className = "dialog__close";
  errorToastClose.innerText = "Close";
  errorToastClose.addEventListener("click", function (e) {
    hideToastEl(e);
  });
  errorToastEl.insertAdjacentElement("afterbegin", errorToastText);
  errorToastEl.insertAdjacentElement("afterbegin", errorToastClose);
  document.body.insertAdjacentElement("beforeend", errorToastEl);
}