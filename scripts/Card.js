export class Card {
  constructor(data, templateSelector) {
    this._title = data.title;
    this._src = data.src;
    this._openPopupImage = data.openPopupImage;
    this._templateSelector = templateSelector;
    this._cardElement = this._getTemplate();
    this._cardIcon = this._cardElement.querySelector(".elements__icon");
    this._cardImage = this._cardElement.querySelector(".elements__image");
  }

  createCard() {
    this._setEventListeners();

    this._cardElement.querySelector(".elements__title").textContent =
      this._title;

    this._cardImage.src = this._src;
    this._cardImage.alt = this._title;

    return this._cardElement;
  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._templateSelector)
      .content.querySelector(".elements__element")
      .cloneNode(true);

    return cardTemplate;
  }

  _setEventListeners() {
    this._cardIcon.addEventListener("click", () => {
      this._toggleLike();
    });

    this._cardElement
      .querySelector(".elements__trash")
      .addEventListener("click", () => {
        this._deleteCard();
      });

    this._cardImage.addEventListener("click", () => {
      this._openPopupImage(this._title, this._src);
    });
  }

  // ПОСТАВИТЬ И УБРАТЬ ЛАЙК
  _toggleLike() {
    this._cardIcon.classList.toggle("elements__icon_type_active");
  }

  // УДАЛИТЬ КАРТОЧКУ

  _deleteCard() {
    this._cardElement.remove();
  }
}
