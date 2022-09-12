import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, callbackSubmitForm, callbackOpenForm) {
    super(popupSelector);
    this._formElement = this._popup.querySelector(".form");
    this._inputList = this._popup.querySelectorAll(".form__text");
    this._callbackSubmitForm = callbackSubmitForm;
    this._callbackOpenForm = callbackOpenForm;
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
      this._callbackSubmitForm(this._getInputValues());
      this.close();
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
