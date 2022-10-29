import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, callbackSubmitForm, callbackOpenForm) {
    super(popupSelector);
    this._formElement = this._popup.querySelector(".form");
    this._inputList = this._popup.querySelectorAll(".form__text");
    this._callbackSubmitForm = callbackSubmitForm;
    this._callbackOpenForm = callbackOpenForm;
    this._submitButtonElement = this._formElement.querySelector(".form__submit-btn");
    
  }

  _getInputValues() {
    const data = {};
    this._inputList.forEach((item) => {
      data[item.name] = item.value;
    });
    return data;
  }

  setEventListeners() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const buttonText = this._submitButtonElement.textContent;
      this._submitButtonElement.disabled = true;
      this._submitButtonElement.textContent = "Сохранение...";

    this._callbackSubmitForm(this._getInputValues())
    .then(() => {
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

  close() {
    this._formElement.reset();
    super.close();
  }

  open() {
    this._callbackOpenForm();
    super.open();
  }
}
