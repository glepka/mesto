export class Card {
  static _template = document.querySelector(".card").content;

  constructor(data, templateSelector) {
    this._title = data.title;
    this._src = data.src;
    this._openPopupImage = data.openPopupImage;
    this._templateSelector = templateSelector;
  }
  createCard() {
    this._cardElement = Card._template
      .querySelector(".elements__element")
      .cloneNode(true);
    this._setEventListeners();

    const cardImage = this._cardElement.querySelector(".elements__image");
    this._cardElement.querySelector(".elements__title").textContent =
      this._title;

    cardImage.src = this._src;
    cardImage.alt = this._title;

    return this._cardElement;
  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardTemplate;
  }

  _setEventListeners() {
    this._cardElement
      .querySelector(".elements__icon")
      .addEventListener("click", () => {
        this._toggleLike();
      });

    this._cardElement
      .querySelector(".elements__trash")
      .addEventListener("click", () => {
        this._deleteCard();
      });

    this._cardElement
      .querySelector(".elements__image")
      .addEventListener("click", () => {
        this._openPopupImage(this._title, this._src);
      });
  }

  // ПОСТАВИТЬ И УБРАТЬ ЛАЙК
  _toggleLike() {
    this._cardElement
      .querySelector(".elements__icon")
      .classList.toggle("elements__icon_type_active");
  }

  // УДАЛИТЬ КАРТОЧКУ

  _deleteCard() {
    this._cardElement.remove();
  }
}
