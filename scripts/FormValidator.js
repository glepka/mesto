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

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._isValid(inputElement);
        this._toggleButtonState();
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
