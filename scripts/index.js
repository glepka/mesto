import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

import { PopupWithImage } from "./PopupWithImage.js";
import { Section } from "./Section.js";

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

const popupTypeProfile = document.querySelector(".popup_type_profile");
const popupTypePlace = document.querySelector(".popup_type_place");

// ДЛЯ ОТКРЫТИЯ ПОПАПОВ
const popupProfileOpenButton = document.querySelector(".profile__edit-button");
const popupAddPlaceButton = document.querySelector(".profile__add-button");

//ДАННЫЕ ДЛЯ ПОПАПА КАРТИНКИ

// ДАННЫЕ ПРОФИЛЯ, КОТОРЫЕ ВВОДИТ ПОЛЬЗОВАТЕЛЬ
const nameInput = document.querySelector(".form__text_type_name");
const professionInput = document.querySelector(".form__text_type_profession");

// ДАННЫЕ ПРОФИЛЯ
const profileName = document.querySelector(".profile__name");
const profileProfession = document.querySelector(".profile__subtitle");

// ФОРМЫ
const profileForm = popupTypeProfile.querySelector(".form-profile");
const placeForm = popupTypePlace.querySelector(".form-place");

// ИНПУТЫ ПОПАПА ДОБАВЛЕНИЯ МЕСТА
const placeInputText = document.querySelector(".form__text_type_place");
const placeInputLink = document.querySelector(".form__text_type_link");

// Классы
// формы
const formValidProfile = new FormValidator(validationConfig, profileForm);
formValidProfile.enableValidation();

const formValidPlace = new FormValidator(validationConfig, placeForm);
formValidPlace.enableValidation();

// Попапы
const popupWithImage = new PopupWithImage(".popup_type_image");
popupWithImage.setEventListener();

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

// ----------------------------------------------
// ФУНКЦИИ

// ОТРЫТЬ ПОПАП ПРОФИЛЯ

// ОТКРЫТЬ ПОПАП МЕСТА
popupAddPlaceButton.addEventListener("click", () => openPopup(popupTypePlace));

// Изменить имя и профессию в профиле

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileProfession.textContent = professionInput.value;
  closePopup(popupTypeProfile);
}
profileForm.addEventListener("submit", handleProfileFormSubmit);

// //ДОБАВИТЬ 6 НАЧАЛЬНЫХ КАРТОЧЕК
// function addInitialCards() {
//   initialCards.forEach(function (item) {
//     const src = item.link;
//     const title = item.name;
//     renderCards(title, src, elements, "append");
//   });
// }
// addInitialCards();

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

// // РЕНДЕР КАРТОЧЕК
// function renderCards(title, src, container, position = "prepend") {
//   const cardItem = new Card(
//     {
//       title,
//       src,
//       openPopupImage: (title, src) => {
//         popupWithImage.open(title, src);
//       },
//     },
//     ".card-template_type_default"
//   );
//   const renderCard = cardItem.createCard();

//   switch (position) {
//     case "append":
//       return container.append(renderCard);
//     case "prepend":
//       return container.prepend(renderCard);
//     default:
//       return;
//   }
// }
