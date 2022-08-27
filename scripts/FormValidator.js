export class FormValidator {
  constructor(validationConfig, formElement) {
    this._validationConfig = validationConfig;
    this._formElement = formElement;
  }

  // Добавление обработчиков всем полям формы
  _setEventListeners() {
    const inputList = Array.from(
      this._formElement.querySelectorAll(this._validationConfig.inputSelector)
    );
    console.log(inputList);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._isValid();
        this._toggleButtonState();
      });
    });
  }

  // ПРОВЕРКА НА ВАЛИДНОСТЬ
  _isValid() {
    if (
      !this._formElement.querySelector(this._validationConfig.inputSelector)
        .validity.valid
    ) {
      this._showInputError();
    } else {
      this._hideInputError();
    }
  }
  // УБРАТЬ СООБЩЕНИЕ ОБ ОШИБКЕ
  _hideInputError() {
    const errorElement = this._formElement.querySelector(
      `.${
        this._formElement.querySelector(this._validationConfig.inputSelector).id
      }-error`
    );

    this._formElement
      .querySelector(this._validationConfig.inputSelector)
      .classList.remove(this._validationConfig.errorClass);
    errorElement.classList.remove(this._validationConfig.inputErrorClass);
    errorElement.textContent = "";
  }

  // ПОКАЗАТЬ СООБЩЕНИЕ ОБ ОШИБКЕ
  _showInputError() {
    const errorElement = this._formElement.querySelector(
      `.${
        this._formElement.querySelector(this._validationConfig.inputSelector).id
      }-error`
    );

    const errorMessage = this._formElement.querySelector(
      this._validationConfig.inputSelector
    ).validationMessage;

    this._formElement
      .querySelector(this._validationConfig.inputSelector)
      .classList.add(this._validationConfig.errorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._validationConfig.inputErrorClass);
  }
  // СОСТОЯНИЕ КНОПКИ ОТПРАВКИ ФОРМЫ
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._formElement
        .querySelector(this._validationConfig.submitButtonSelector)
        .classList.add(this._validationConfig.inactiveButtonClass);
      this._formElement.querySelector(
        this._validationConfig.submitButtonSelector
      ).disabled = true;
    } else {
      this._formElement
        .querySelector(this._validationConfig.submitButtonSelector)
        .classList.remove(this._validationConfig.inactiveButtonClass);
      this._formElement.querySelector(
        this._validationConfig.submitButtonSelector
      ).disabled = false;
    }
  }

  _hasInvalidInput() {
    const inputList = Array.from(
      this._formElement.querySelectorAll(this._validationConfig.inputSelector)
    );
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}

// КОНФИГ ФОРМЫ
const validationConfig = {
  formSelector: ".form",
  inputSelector: ".form__text",
  submitButtonSelector: ".form__submit-btn",
  inactiveButtonClass: "form__submit-btn_type_disabled",
  inputErrorClass: ".form__input-error",
  errorClass: ".form__text_type_error",
};
