import { Popup } from "./Popup.js";

export class PopupDeleteCardAccept extends Popup {
  constructor(popupSelector, callbackAccepting) {
    super(popupSelector);
    this._callbackAccepting = callbackAccepting;
    this._formElement = this._popup.querySelector(".form");
    this._submitButtonElement = this._popup.querySelector(".form__submit-btn");
  }

  setEventListeners(acceptingString) {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const buttonText = this._submitButtonElement.textContent;
      this._submitButtonElement.disabled = true;
      this._submitButtonElement.textContent = acceptingString;
      this._callbackAccepting(this._data).then(() => {
        this.close();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        this._submitButtonElement.textContent = buttonText;
        this._submitButtonElement.disabled = false;
      });
    });
    super.setEventListeners();
  }

  open(data) {
    this._data = data;
    super.open();
  }
}