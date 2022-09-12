import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { Section } from "./Section.js";
import { UserInfo } from "./UserInfo.js";

// КАРТОЧКИ
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

// КОНФИГ ФОРМЫ
const validationConfig = {
  formSelector: ".form",
  inputSelector: ".form__text",
  submitButtonSelector: ".form__submit-btn",
  inactiveButtonClass: "form__submit-btn_type_disabled",
  inputErrorClass: "form__input-error",
  errorClass: "form__text_type_error",
};

// ПЕРЕМЕННЫЕ
// ------------------------

const elements = document.querySelector(".elements");

//ПОПАПЫ

const popupTypeProfile = ".popup_type_profile";
const popupTypePlace = ".popup_type_place";
const popupTypeImage = ".popup_type_image";

// ДЛЯ ОТКРЫТИЯ ПОПАПОВ
const popupProfileOpenButton = document.querySelector(".profile__edit-button");
const popupAddPlaceButton = document.querySelector(".profile__add-button");

// ДАННЫЕ ПРОФИЛЯ, КОТОРЫЕ ВВОДИТ ПОЛЬЗОВАТЕЛЬ
const nameInput = document.querySelector(".form__text_type_name");
const professionInput = document.querySelector(".form__text_type_profession");

// ДАННЫЕ ПРОФИЛЯ
const profileName = ".profile__name";
const profileAbout = ".profile__subtitle";
const inputProfileName = "name";
const inputProfileAboit = "profession";

// ФОРМЫ
const profileForm = document.querySelector(".form-profile");
const placeForm = document.querySelector(".form-place");

// ИНПУТЫ ПОПАПА ДОБАВЛЕНИЯ МЕСТА
const placeInputText = document.querySelector(".form__text_type_place");
const placeInputLink = document.querySelector(".form__text_type_link");

// Классы
// формы
const formValidProfile = new FormValidator(validationConfig, profileForm);
formValidProfile.enableValidation();

const formValidPlace = new FormValidator(validationConfig, placeForm);
formValidPlace.enableValidation();

// Инфо профиля
const userInfo = new UserInfo({ profileName, profileAbout });

// Попапы
const popupWithImage = new PopupWithImage(popupTypeImage);
popupWithImage.setEventListeners();

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (card) => {
      const newCard = new Card(card, ".card-template_type_default", () => {
        popupWithImage.open(card.name, card.link);
      });
      return newCard.createCard();
    },
  },
  elements
);
cardSection.renderItems();

// ОТРЫТЬ ПОПАП ПРОФИЛЯ

const popupUserInfo = new PopupWithForm(
  popupTypeProfile,
  (data) => {
    userInfo.setUserInfo({
      userName: data[inputProfileName],
      userAbout: data[inputProfileAboit],
    });
  },
  () => {
    const info = userInfo.getUserInfo();
    nameInput.value = info.userName;
    professionInput.value = info.userAbout;
    formValidProfile.clearValidationErrors();
  }
);
popupUserInfo.setEventListeners();
popupProfileOpenButton.addEventListener("click", () => {
  popupUserInfo.open();
});

// ДОБАВИТЬ СОБСТВЕННУЮ КАРТОЧКУ
function addPlaceCard(evt) {
  evt.preventDefault();
  const title = placeInputText.value;
  const src = placeInputLink.value;

  renderCards(title, src, elements);
  closePopup(popupTypePlace);
  formValidPlace.toggleButtonState();
  evt.target.reset();
}
placeForm.addEventListener("submit", addPlaceCard);
