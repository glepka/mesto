export class FormValidator {
  constructor(validationConfig, formElement) {
    this._validationConfig = validationConfig;
    this._formElement = formElement;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._validationConfig.inputSelector)
    );
    this._submitButtonSelector = this._formElement.querySelector(
      this._validationConfig.submitButtonSelector
    );
  }

  // Добавление обработчиков всем полям формы
  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._isValid(inputElement);
        this.toggleButtonState();
      });
    });
  }

  // ПРОВЕРКА НА ВАЛИДНОСТЬ
  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }
  // УБРАТЬ СООБЩЕНИЕ ОБ ОШИБКЕ
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );

    inputElement.classList.remove(this._validationConfig.errorClass);
    errorElement.classList.remove(this._validationConfig.inputErrorClass);
    errorElement.textContent = "";
  }

  // ПОКАЗАТЬ СООБЩЕНИЕ ОБ ОШИБКЕ
  _showInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );

    const errorMessage = inputElement.validationMessage;

    inputElement.classList.add(this._validationConfig.errorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._validationConfig.inputErrorClass);
  }
  // СОСТОЯНИЕ КНОПКИ ОТПРАВКИ ФОРМЫ
  toggleButtonState() {
    if (this._inputList.some((inputEl) => !inputEl.validity.valid)) {
      this._submitButtonSelector.classList.add(
        this._validationConfig.inactiveButtonClass
      );
      this._submitButtonSelector.disabled = true;
    } else {
      this._submitButtonSelector.classList.remove(
        this._validationConfig.inactiveButtonClass
      );
      this._submitButtonSelector.disabled = false;
    }
  }

  clearValidationErrors() {
    this._inputList.forEach(this._hideInputError, this);
    this.toggleButtonState();
  }


  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}
