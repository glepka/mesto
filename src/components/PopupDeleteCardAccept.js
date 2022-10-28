import { Popup } from "./Popup.js";

export class PopupDeleteCardAccept extends Popup {
  constructor(popupSelector, callbackAccepting) {
    super(popupSelector);
    this._callbackAccepting = callbackAccepting;
    this._formEl = this._popup.querySelector(".form");
    this._submitBtnEl = this._popup.querySelector(".form__submit-btn");
  }

  setEventListeners(acceptingString) {
    this._formEl.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const btnText = this._submitBtnEl.textContent;
      this._submitBtnEl.disabled = true;
      this._submitBtnEl.textContent = acceptingString;
      this._callbackAccepting(this._data).then(() => {
        this.close();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        this._submitBtnEl.textContent = btnText;
        this._submitBtnEl.disabled = false;
      });
    });
    super.setEventListeners();
  }

  open(data) {
    this._data = data;
    super.open();
  }
}