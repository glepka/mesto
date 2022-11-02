import { Popup } from "./Popup.js";

export class PopupDeleteCardAccept extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._formElement = this._popup.querySelector(".form");
    this._submitButtonElement = this._popup.querySelector(".form__submit-btn");
  }

  setEventListeners(acceptingString) {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitButtonElement.disabled = true;
      this._submitButtonElement.textContent = acceptingString;
      this._callbackAccepting()
    });
    super.setEventListeners();
  }


  setAcceptingCallback(callbackAccepting){
    this._callbackAccepting = callbackAccepting;
}


  
  }
