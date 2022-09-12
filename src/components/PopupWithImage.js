import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupElement = this._popup.querySelector(".popup__image");
  }

  open(title, src) {
    this._popup.querySelector(".popup__image").src = src;
    this._popup.querySelector(".popup__image").alt = title;
    this._popup.querySelector(".popup__image-text").textContent = title;

    super.open();
  }
}
